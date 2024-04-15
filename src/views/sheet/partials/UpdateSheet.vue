<template>
  <div>
    <popup-full @cancel="$emit('cancel')" :visible="visible">
      
      <div
        class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5"
      >
        <h1 class="tw-text-lg">Create Sheet</h1>

        <div class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5">
          <SelectUser v-model:user-id="newSheet.user_id" />

          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Name</div>
            <input
              type="text"
              v-model="newSheet.name"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            />
          </div>

          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Sheet Name</div>
            <input
              type="text"
              v-model="newSheet.sheet_name"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            />
          </div>

          <div class="md:tw-col-span-12 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Sheet ID</div>
            <input
              type="text"
              v-model="newSheet.sheet_id"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            />
          </div>

          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Auto Fetch</div>
            <label class="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer tw-w-fit tw-scale-75">
                <input v-model="newSheet.auto_fetch" type="checkbox" class="tw-sr-only tw-peer" />
                <div
                    class="tw-flex tw-items-center peer-checked:tw-bg-emerald-500 tw-w-11 tw-h-6 tw-bg-gray-200 peer-focus:tw-outline-none tw-rounded-full tw-peer dark:tw-bg-neutral-600 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600">
                </div>
            </label>
          </div>

        </div>

        <div class="tw-flex tw-gap-2 mt-3 mb-2 tw-justify-end">
          <v-btn
            @click="$emit('cancel')"
            color="grey-darken-2"
            variant="flat"
            class="text-capitalize"
          >
            <span class="text-white"> Cancel </span>
          </v-btn>
          <v-btn
            :loading="isLoading"
            @click="update"
            color="primary-color"
            variant="flat"
            class="text-capitalize"
          >
            <span class="text-white"> Save </span>
          </v-btn>
        </div>
      </div>
    </popup-full>
  </div>
</template>

<script>
import Sheet from '@/api/Sheet';
import SelectUser from './SelectUser'

export default {
  props: ["visible", "sheet"],
  components: { SelectUser },

  data() {
    return {
      isLoading: false,

      newSheet: {
        name: "",
        sheet_id: "",
        sheet_name: "",
        auto_fetch: true,
        user_id: null
      },
    };
  },

  watch: {
    visible(v) {
        if(v) {
            this.newSheet = {
                ...this.sheet,
                auto_fetch: this.sheet.auto_fetch == 1 ? true : false
            }
        }
    } 
  },


  computed: {

    isFormValid() {
      return (
        !!this.newSheet.name &&
        !!this.newSheet.sheet_id &&
        !!this.newSheet.sheet_name
      );
    },
  },

  methods: {
    update() {
      if(!this.isFormValid) {
        this.$alert({
              type: "warning",
              title: "Please fill all the form",
            });
        return false
      }
      this.isLoading = true;

      const sheet = this.newSheet;

      Sheet.update(this.sheet.id, sheet)
        .then((res) => {
          if (res.data.code == "SUCCESS") {
            this.$emit("cancel");
            this.$alert({
              type: "success",
              title: "Sheet updated successfully",
            });

            this.$store.dispatch('sheet/update', res.data.data.sheet)
          }
        }, this.$handleApiError)
        .finally(() => (this.isLoading = false));
    },

  },

};
</script>

<style>
</style>