<template>
  <div :key="confirmation" v-click-outside="close" class="tw-relative tw-min-w-[100px]">
    <button @click="toggle" :class="[selected.text, selected.bg, selected.ring]"
      class="focus:tw-ring-4 tw-min-w-[100px] focus:tw-outline-none tw-font-medium tw-rounded-lg tw-text-sm tw-px-2 tw-py-1 tw-text-center tw-inline-flex tw-items-center tw-justify-between"
      type="button">
      {{ selected.name }}

      <v-icon v-if="!isLoading" class="tw-ml-1">{{
        isOpen ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      <v-icon v-if="isLoading" class="tw-animate-spin tw-ml-1">mdi-loading</v-icon>
    </button>
    <!-- Dropdown menu -->
    <div :class="{ 'tw-hidden': !isOpen }"
      class="tw-z-[20] tw-bg-white tw-absolute tw-top-full tw-left-0 tw-divide-y tw-divide-gray-100 tw-rounded-lg tw-shadow tw-w-44">
      <ul class="tw-py-2 tw-space-y-1 tw-text-sm tw-text-gray-700 tw-max-h-[250px] tw-overflow-y-auto">
        <li @click="handleChange(option)" v-for="option in options" :key="option.id">
          <a class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100" :class="[option.text, option.bg]">{{ option.name
            }}</a>
        </li>
      </ul>
    </div>
    <popup-full type="info" title="Add Note" btn-color="blue" @cancel="showPopup = false" :visible="showPopup">
      <div class="md:tw-max-w-[400px] tw-bg-white tw-shadow-lg tw-rounded-lg tw-py-3 tw-px-5 !tw-w-[95%] tw-mx-auto">
        <p class="tw-text-neutral-600 mb-2">Enter note</p>
        <textarea v-model="note" cols="30" rows="3"
          class="tw-rounded-lg tw-px-3 tw-py-1 tw-outline-none tw-w-full tw-border tw-border-solid tw-border-neutral-600 focus:tw-border-orange-500">
        </textarea>

        <div class="tw-flex tw-justify-end tw-mt-2">
          <v-btn class="tw-capitalize" :loading="isLoading" variant="flat" color="green"
            @click="handleClick">Confirm</v-btn>
        </div>
      </div>
    </popup-full>

      <SaleConfirmationReporting :order="sale" :visible="showPopupReporter" @cancel="showPopupReporter = false" />

  </div>
</template>

<script>
  import Sale from "@/api/Sale";
  import { confirmations } from "@/config/orders";
  import SaleConfirmationReporting from '@/views/sale/partials/SaleConfirmationReporting'
  
  export default {
    props: ["confirmation", "id", "sale"],

    components: { SaleConfirmationReporting },

    data() {
      return {
        isLoading: false,
        isOpen: false,
        showPopup: false,
        nextOption: null,
        note: "",
        noteReporter: '',
        selectedId: 0,
        allOptions: confirmations,

        //new line
        showPopupReporter: false,
      };
    },
    computed: {
      options() {
        return this.allOptions.filter((i) => i.id !== this.selectedId);
      },
      selected() {
        return this.allOptions.filter((item) => item.id == this.selectedId)[0];
      },
      availableOptions() {
        return this.allOptions.map((i) => i.value);
      },
    },

    watc: {
      date(value) {
        console.log(value);
      }
    },

    methods: {
      close() {
        this.isOpen = false;
      },
      toggle() {
        this.isOpen = !this.isOpen;
      },
      handleResolved(response) {
        if (response) {
          this.selectedId = this.nextOption;
          this.showPopup = false;
          this.updateOrderWithNote()
            .catch(this.$handleApiError)
            .finally(() => (this.showPopup = false));
        } else {
          this.showPopup = false;
        }
      },
      handleClick() {
        this.selectedId = this.nextOption;
        this.showPopup = false;
        this.updateOrderWithNote()
          .catch(this.$handleApiError)
          .finally(() => (this.showPopup = false));
      },
      handleClickReporter() {
        console.log('repoting...');
        this.showPopupReporter = false
      },
      async handleChange(option) {
        if (option.id === this.selectedId) return false;
        //new line
        if (option.value !== "confirmer" && option.value !== "reporter") {
          this.selectedId = option.id;
          this.updateOrder();
        } else {
          //new line
          if (option.value === "reporter") {
            this.showPopupReporter = true;
          } else {
            this.nextOption = option.id;
            this.showPopup = true;
          }
        }

        this.close();
      },
      async updateOrder() {
        this.isLoading = true;
        return Sale.agenteUpdateConfirmation(this.id, this.selected.value)
          .then(
            (res) => {
              if (res.data.code === "SUCCESS") {
                this.$alert({
                  type: "success",
                  title: res.data.data,
                });
                this.updateConfirmation(this.id, this.selected.value);
                this.isLoading = false;
              }
            },
            (err) => this.$handleApiError(err)
          )
          .then(() => this.$emit("update", this.selected.value));
      },
      async updateOrderWithNote() {
        this.isLoading = true;
        return Sale.agenteUpdateConfirmationWithNote(
          this.id,
          this.selected.value,
          this.note
        )
          .then(
            (res) => {
              if (res.data.code === "SUCCESS") {
                this.$alert({
                  type: "success",
                  title: res.data.data,
                });
                this.updateConfirmationNote(
                  this.id,
                  this.selected.value,
                  this.note
                );
                this.isLoading = false;
              }
            },
            (err) => this.$handleApiError(err)
          )
          .then(() => this.$emit("update", this.selected.value));
      },
      updateConfirmation(id, confirmation) {
        this.$store.dispatch("sale/updateConfirmation", { id, confirmation });
      },
      updateConfirmationNote(id, confirmation, note) {
        this.$store.dispatch("sale/updateConfirmationWithNote", {
          id,
          confirmation,
          note,
        });
      },
    },
    mounted() {
      if (this.availableOptions.includes(this.confirmation)) {
        this.selectedId = this.allOptions.find(
          (option) => option.value == this.confirmation
        ).id;
      } else {
        this.selectedId = 0;
      }
    },
  };
</script>

<style></style>