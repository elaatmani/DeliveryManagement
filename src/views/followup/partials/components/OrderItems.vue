<template>
  <div>
    <p
      v-if="!items.length"
      class="tw-col-span-12 tw-rounded-lg tw-text-center tw-p-5 tw-text-gray-700 tw-bg-gray-50"
    >
      No Order items
    </p>

    <div v-if="items.length" class="md:tw-col-span-12 tw-col-span-12">
      <div class="tw-max-w-full tw-overflow-auto">
        <table
          :key="items.length"
          class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500 "
        >
          <thead class="tw-text-xs tw-text-gray-700 tw-uppercase !tw-rounded-t-lg tw-border tw-border-solid">
            <tr class="tw-bg-gray-50">
              <th
                v-for="column in [
                  'product',
                  '',
                  'variation',
                  'quantity',
                  'price',
                  'actions',
                ]"
                :class="[column == 'actions' && '!tw-w-[40px]']"
                :key="column"
                scope="col"
                class="tw-px-6 tw-py-3 text-truncate"
              >
                <div
                  class="tw-w-fit tw-flex tw-whitespace-nowrap tw-capitalize"
                >
                  {{ column }}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="i in items" :key="i.id">
                <td>
                    
                </td>
                <td>
                    <div class="tw-p-2">

                        <div class="tw-relative">
                            <select class="tw-block tw-border-solid focus:tw-outline-none tw-w-full tw-p-2 tw-pr-6 tw-text-xs tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500">
                                <option :value="0" selected>Choose Product</option>
                            </select>

                            <div
                            class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
                            >
                                <svg
                                    class="tw-fill-current tw-h-4 tw-w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="tw-p-2">

                        <div class="tw-relative">
                            <select class="tw-block tw-border-solid focus:tw-outline-none tw-w-full tw-p-2 tw-pr-6 tw-text-xs tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500">
                                <option :value="0" selected>Choose Variation</option>
                            </select>

                            <div
                            class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
                            >
                                <svg
                                    class="tw-fill-current tw-h-4 tw-w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="tw-p-2">
                        <input v-model="i.quantity" type="number" class="focus:tw-outline-none  tw-border-solid tw-block tw-w-24 tw-p-2 tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 sm:tw-text-xs focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500">
                    </div>
                </td>
                <td>
                    <div class="tw-p-2">
                        <input v-model="i.price" type="number" class="focus:tw-outline-none tw-border-solid tw-block tw-w-24 tw-p-2 tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 sm:tw-text-xs focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500">
                    </div>
                </td>
                <td>
                    <div class="tw-flex tw-justify-center">
                        <button class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-red-500/20 hover:tw-bg-red-500/10 hover:tw-border-red-500/70 tw-duration-300 tw-text-red-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
                            <v-icon size="x-small" >mdi-delete-outline</v-icon>
                        </button>
                    </div>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      required: true,
      default: [],
    },
  },
};
</script>

<style>
</style>