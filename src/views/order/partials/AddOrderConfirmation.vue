<template>
  <div
    :key="confirmation"
    v-click-outside="close"
    class="tw-relative tw-min-w-[100px] tw-w-full"
  >
    <div>
      <div class="tw-relative">
        <select
        v-model="confirmationValue"
          class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200 tw-outline-0 tw-text-sm"
        >
          <option :class="[o.text, !o.value && '!tw-text-gray-700']" v-for="o in allOptions" :key="o.id" :value="o.value">
            {{ o.name }}
          </option>
        </select>
        <v-icon
          class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2"
          >mdi-chevron-down</v-icon
        >
      </div>
    </div>

    <popup-full
        type="info"
        title="Add Note"
        btn-color="blue"
        @cancel="showPopup = false"
        :visible="showPopup"
    >
      <div
        class="md:tw-max-w-[400px] tw-bg-white tw-shadow-lg tw-rounded-lg tw-py-3 tw-px-5 !tw-w-[95%] tw-mx-auto"
      >
        <p class="tw-text-neutral-600 mb-2">Enter note</p>
        <textarea
          v-model="note"
          cols="30"
          rows="3"
          class="tw-rounded-lg tw-px-3 tw-py-1 tw-outline-none tw-w-full tw-border tw-border-solid tw-border-neutral-600 focus:tw-border-orange-500"
        >
        </textarea>

        <div class="tw-flex tw-justify-end tw-mt-2">
          <v-btn
            class="tw-capitalize"
            :loading="isLoading"
            variant="flat"
            color="green"
            @click="handleClick"
            >Confirm</v-btn
          >
        </div>
      </div>
    </popup-full>

    <AddOrderReporting
      :order="order"
      @confirm="handleReportedDate"
      :visible="showPopupReporter"
      @cancel="showPopupReporter = false"
    />
  </div>
</template>

<script>
import Sale from "@/api/Sale";
import { confirmations } from "@/config/orders";
import AddOrderReporting from "@/views/order/partials/AddOrderReporting";

export default {
  props: ["confirmation", "id", "order"],

  components: { AddOrderReporting },

  data() {
    return {
      isLoading: false,
      isOpen: false,
      showPopup: false,
      nextOption: null,
      note: "",
      selectedId: 0,
      allOptions: confirmations,

      reported_agente_date: null,
      reported_agente_note: "",

      showPopupReporter: false,
    };
  },
  watch: {

  },
  computed: {
    options() {
      return this.allOptions.filter((i) => i.id !== this.selectedId);
    },
    confirmationValue: {
        get() {
            return this.confirmation
        },
        set(v) {
            switch (v) {
                case 'reporter':
                    this.showPopupReporter = true;
                break;
                case 'confirmer':
                    this.showPopup = true;
                break;
            
                default:
                    this.$emit('update:confirmation', v);
                break;
            }
        }
    },
    selected() {
      return this.allOptions.filter((item) => item.id == this.selectedId)[0];
    },
    availableOptions() {
      return this.allOptions.map((i) => i.value);
    },
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
    handleReportedDate(data) {
      this.reported_agente_date = data.reported_agente_date;
      this.reported_agente_note = data.reported_agente_note;
      this.$emit('update:confirmation', 'reporter')
      this.$emit('reported', data)
      this.showPopupReporter = false;
    },
    handleClick() {
    //   this.selectedId = this.nextOption;
      this.showPopup = false;
      this.$emit('update:confirmation', 'confirmer')
      this.$emit('confirmed', this.note)
    //   this.updateOrderWithNote()
    //     .catch(this.$handleApiError)
    //     .finally(() => (this.showPopup = false));
    },
    async handleChange(option) {
      if (option.id === this.selectedId) return false;

      if (option.value !== "confirmer" && option.value !== "reporter") {
        this.selectedId = option.id;
        this.updateOrder();
      } else {
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
      return Sale.agenteUpdateConfirmation(this.id, this.selected.value).then(
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
      );
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
              this.updateConfirmationWithNote(
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
      this.$store.dispatch("order/updateConfirmation", { id, confirmation });
      this.$emit("update", confirmation);
    },
    updateConfirmationWithNote(id, confirmation, note) {
      this.$store.dispatch("order/updateConfirmationWithNote", {
        id,
        confirmation,
        note,
      });
      this.$emit("update", confirmation);
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

<style>
</style>