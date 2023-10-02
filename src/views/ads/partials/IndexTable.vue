<template>
  <div>

    <div class="tw-flex tw-flex-col">
        <div class="tw-overflow-x-auto">
            <div class="tw-inline-block tw-min-w-full tw-align-middle">
                <div class="tw-overflow-hidden tw-border tw-border-gray-200 darkx:tw-border-gray-700 md:tw-rounded-lg">
                    <table class="tw-min-w-full tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700">
                        <thead class="tw-bg-gray-50 darkx:tw-bg-gray-800">
                            <tr>
                                <th scope="col" class="tw-py-3.5 tw-px-4 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                        <span>ID</span>
                                </th>
                                <th scope="col" class="tw-py-3.5 tw-px-4 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    <button @click="$emit('sortOrder', {name: 'created_at'})" class="tw-flex tw-items-center tw-gap-x-3 focus:tw-outline-none">
                                        <span>Created</span>

                                        <svg class="tw-h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                        </svg>
                                    </button>
                                </th>
                                <th scope="col" class="tw-py-3.5 tw-px-4 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                  <button @click="$emit('sortOrder', {name: 'ads_at'})" class="tw-flex tw-items-center tw-gap-x-3 focus:tw-outline-none">
                                      <span>Ads For</span>

                                      <svg class="tw-h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                      </svg>
                                  </button>
                              </th>
                                <th scope="col" class="tw-px-12 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                   Marketer
                               </th>
                                <th scope="col" class="tw-px-12 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Source
                                </th>
                                <th scope="col" class="tw-px-12 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Amount
                                </th>
                                <th scope="col" class="tw-w-10 tw-px-12 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Product
                                </th>

                                <th scope="col" class="tw-relative tw-py-3.5 tw-px-4">
                                    <span class="tw-sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody v-if="!loading && items.length > 0" class="tw-bg-white tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700 darkx:tw-bg-gray-900">
                          <TableRow @update="newItem => $emit('update', newItem)" v-for="item in items" :key="item.id" :item="item" />
                        </tbody>

                        <tbody v-if="!loading && items.length == 0" class="tw-bg-white tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700 darkx:tw-bg-gray-900">
                          <tr>
                            <td colspan="8">
                              <div class="tw-p-5 tw-text-center tw-text-gray-600 tw-font-medium">
                                No Order was found !
                              </div>
                            </td>
                          </tr>
                        </tbody>

                        <tbody v-if="loading" class="tw-bg-white tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700 darkx:tw-bg-gray-900">
                          <tr>
                            <td
                              v-if="false"
                              colspan="8"
                              class="tw-px-4 tw-py-4 tw-text-sm tw-font-medium tw-whitespace-nowrap"
                            >
                              <loading />
                            </td>
                            <td
                              colspan="8"
                            >
                            
                              <div role="status" class="tw-w-full tw-p-4 tw-space-y-4  tw-border-gray-200 tw-divide-y tw-divide-gray-200 tw-rounded tw-shadow tw-animate-pulse dark:tw-divide-gray-700 md:tw-p-6 dark:tw-border-gray-700">
                                  <div class="tw-flex tw-items-center tw-justify-between">
                                      <div>
                                          <div class="tw-h-2.5 tw-bg-gray-300 tw-rounded-full dark:tw-bg-gray-600 tw-w-24 tw-mb-2.5"></div>
                                          <div class="tw-w-32 tw-h-2 tw-bg-gray-200 tw-rounded-full dark:tw-bg-gray-700"></div>
                                      </div>
                                      <div class="tw-h-2.5 tw-bg-gray-300 tw-rounded-full dark:tw-bg-gray-700 tw-w-12"></div>
                                  </div>
                                  <div v-for="i in (perPage - 1)" :key="i" class="tw-flex tw-items-center tw-justify-between tw-pt-4">
                                      <div>
                                          <div class="tw-h-2.5 tw-bg-gray-300 tw-rounded-full dark:tw-bg-gray-600 tw-w-24 tw-mb-2.5"></div>
                                          <div class="tw-w-32 tw-h-2 tw-bg-gray-200 tw-rounded-full dark:tw-bg-gray-700"></div>
                                      </div>
                                      <div class="tw-h-2.5 tw-bg-gray-300 tw-rounded-full dark:tw-bg-gray-700 tw-w-12"></div>
                                  </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="tw-mt-6">
      <TablePaginationNoNums :from="from" :to="to" :last-page="lastPage" :per-page="perPage" :total="total" :current-page="currentPage" @page-change="(n) => $emit('pageChange', n)" />
    </div>
  </div>
</template>

<script>
import TablePaginationNoNums from '@/views/ads/partials/table/TablePaginationNoNums';
import TableRow from '@/views/ads/partials/table/TableRow';

export default {
  components: { TablePaginationNoNums, TableRow },

  props: {
    items: {
      default: [],
    },
    loading: {
      type: Boolean,
      default: true
    },
    from: {
        type: Number,
        default: 1
    },
    to: {
        type: Number,
        default: 1
    },
    perPage: {
        type: Number,
        default: 10
    },
    total: {
        type: Number,
        default: 0
    },
    currentPage: {
        type: Number,
        default: 1
    },
    lastPage: {
      type: Number,
      default: 1
    }
  },

  // mounted(){
  //   console.log(this.props.items)
  // }
}
</script>

<style>

</style>