<template>
  <div>

    <div class="tw-flex tw-flex-col">
        <div class="tw-overflow-x-auto">
            <div class="tw-inline-block tw-min-w-full tw-align-middle">
                <div class="tw-border tw-overflow-auto tw-border-gray-200 darkx:tw-border-gray-700 md:tw-rounded-lg">
                    <table class="tw-min-w-full tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700">
                        <thead class="tw-bg-gray-50 darkx:tw-bg-gray-800">
                            <tr>
                                <th scope="col" class="tw-py-3.5 tw-px-4 tw-w-5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                        <span>ID</span>
                                </th>
                                <th scope="col" class="tw-px-3 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Name
                                </th>
                                <th scope="col" class="tw-px-3 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Total Ordered
                                </th>
                                <th scope="col" class="tw-px-3 tw-whitespace-nowrap !tw-w-5 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Total Unit
                                </th>
                            </tr>
                        </thead>

                        <tbody v-if="!loading && items.length > 0" class="tw-bg-white tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700 darkx:tw-bg-gray-900">
                          <TableRow  @update="newItem => $emit('update', newItem)" :all="all" :index="index" v-for="(item, index, all) in items" :key="index" :item="item" />
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
                              colspan="11"
                              class="tw-px-4 tw-py-4 tw-text-sm tw-font-medium tw-whitespace-nowrap"
                            >
                              <loading />
                            </td>
                            <td
                              colspan="11"
                            >
                            
                              <div role="status" class="tw-w-full tw-p-4 tw-space-y-4  tw-border-gray-200 tw-divide-y tw-divide-gray-200 tw-rounded tw-shadow tw-animate-pulse dark:tw-divide-gray-300 md:tw-p-6 dark:tw-border-gray-300">
                                  <div class="tw-flex tw-items-center tw-justify-between">
                                      <div>
                                          <!-- <div class="tw-h-2.5 tw-bg-gray-300 tw-rounded-full dark:tw-bg-gray-600 tw-w-24 tw-mb-2.5"></div> -->
                                          <div class="tw-w-32 tw-h-2 tw-bg-gray-200 tw-rounded-full dark:tw-bg-gray-200"></div>
                                      </div>
                                      <div class="tw-h-2.5 tw-bg-gray-300 tw-rounded-full dark:tw-bg-gray-200 tw-w-12"></div>
                                  </div>
                                  <div v-for="i in (perPage - 1)" :key="i" class="tw-flex tw-items-center tw-justify-between tw-pt-4">
                                      <div>
                                          <!-- <div class="tw-h-2.5 tw-bg-gray-300 tw-rounded-full dark:tw-bg-gray-600 tw-w-24 tw-mb-2.5"></div> -->
                                          <div class="tw-w-32 tw-h-2 tw-bg-gray-200 tw-rounded-full dark:tw-bg-gray-200"></div>
                                      </div>
                                      <div class="tw-h-2.5 tw-bg-gray-200 tw-rounded-full dark:tw-bg-gray-200 tw-w-12"></div>
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
import TablePaginationNoNums from '@/views/dashboardfinance/partials/table/TablePaginationNoNums';
import TableRow from '@/views/dashboardfinance/partials/table/TableRow';

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
    },

  },

  computed: {
  },



  methods: {
   
  },


}
</script>

<style>

</style>