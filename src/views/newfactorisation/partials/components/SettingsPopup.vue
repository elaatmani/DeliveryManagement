<template>
  <div>
    <popup-new :visible="visible" :closeable="false" @cancel="cancel">
      <div
        class="tw-mx-auto tw-w-[95%] md:tw-max-w-[800px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg">
        <div
          class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50">
          Factorisation Settings
        </div>

        <div class="tw-bg-white tw-p-4">
          <div class="tw-grid tw-gap-6 tw-gap-y-5 tw-grid-cols-1 md:tw-grid-cols-2">
            <div class="md:tw-col-span-1 tw-col-span-2">
              <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Interval Time</label>
              <div class="tw-relative">
                <select v-model="intervalTime"
                 
                  class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 tw-pr-7">
                  <option :value="null" disabled>Choose an Interval</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <div
                  class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                  <svg class="tw-fill-current tw-h-4 tw-w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="md:tw-col-span-1 tw-col-span-2">
              <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"> Auto Close
                Date Starts</label>
              <input v-model="closeDateStart" type="datetime-local"
                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500" />
            </div>

          </div>
        </div>

        <div
          class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid">
          <button @click="cancel"
            class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
            Cancel
          </button>
          <!-- <button
              @click="handleCreate"
              :disabled="isLoading"
              class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white"
            >
              <v-icon
                size="small"
                class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']"
                >mdi-loading</v-icon
              >
              <span>Create</span>
            </button> -->
        </div>
      </div>
    </popup-new>
  </div>
</template>

<script>
  // import { validate } from "../lib/validate";
  // import { create } from "../lib/create";

  export default {
    props: {
      visible: {
        required: true,
      },
    },

    data() {
      return {
        isLoading: false,
        closeDateStart: null,
        intervalTime: null,
      };
    },

    computed: {},

    methods: {
      cancel() {
        if (this.isLoading) return false;
        this.$emit("update:visible", false);
      },
    },

    mounted() { },
  };
</script>

<style></style>