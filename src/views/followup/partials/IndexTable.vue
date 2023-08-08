<template>
  <div>
    <!-- component -->
<section class="tw-px-4 tw-mx-auto">
    <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <div>
            <div class="tw-flex tw-items-center tw-gap-x-3">
                <h2 class="tw-text-lg tw-font-medium tw-text-gray-800 darkx:tw-text-white">Orders</h2>

                <span class="tw-px-3 tw-py-1 tw-text-xs tw-text-emerald-600 tw-bg-emerald-100 tw-rounded-full darkx:tw-bg-gray-800 darkx:tw-text-orange-400">{{ total }} order</span>
            </div>

            <p class="tw-mt-1 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">These orders have needs to reconfirmed.</p>
        </div>

        <div class="tw-flex tw-items-center tw-mt-4 tw-gap-x-3">

            <button class="tw-flex tw-items-center tw-justify-center  tw-px-5 tw-py-2 tw-text-sm tw-tracking-wide tw-text-white tw-transition-colors tw-duration-200 tw-bg-orange-500 tw-rounded-lg shrink-0 sm:tw-w-auto tw-gap-x-2 hover:tw-bg-orange-600 darkx:hover:tw-bg-orange-500 darkx:tw-bg-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-w-5 tw-h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Create</span>
            </button>
        </div>
    </div>

    <div class="tw-mt-6 md:tw-flex md:tw-items-center md:tw-justify-between">
        <div class="tw-inline-flex tw-overflow-hidden tw-bg-white tw-border tw-divide-x tw-rounded-lg darkx:tw-bg-gray-900 rtl:tw-flex-row-reverse darkx:tw-border-gray-700 darkx:tw-divide-gray-700">
            <button class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 tw-bg-gray-100 sm:tw-text-sm darkx:tw-bg-gray-800 darkx:tw-text-gray-300">
                View all
            </button>

            <button class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
                Today
            </button>
            <button class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
                Yesterday
            </button>
            <button class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z"/></svg>
            </button>
            <div class="tw-relative">
                        
            <select
                @change="(e) => $emit('perPageChange', e.target.value)"
                class="tw-h-full tw-px-5 tw-py-2 tw-w-20 focus:tw-outline-none tw-text-xs tw-font-medium tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
            </select>
            <div
                class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                <svg class="tw-fill-current tw-h-4 tw-w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
        </div>

        <div class="tw-relative tw-flex tw-items-center tw-mt-4 md:tw-mt-0">
            <span class="tw-absolute">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-w-5 tw-h-5 tw-mx-3 tw-text-gray-400 darkx:tw-text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>

            <input type="text" placeholder="Search" class="tw-block tw-w-full tw-py-1.5 tw-pr-5 tw-text-gray-700 tw-bg-white tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg md:tw-w-80 placeholder-gray-400/70 tw-pl-11 rtl:tw-pr-11 rtl:tw-pl-5 darkx:tw-bg-gray-900 darkx:tw-text-gray-300 darkx:tw-border-gray-600 focus:tw-border-orange-400 darkx:focus:tw-border-orange-300 focus:tw-ring-orange-300 focus:tw-outline-none focus:tw-ring focus:tw-ring-opacity-40">
        </div>
    </div>

    <div class="tw-flex tw-flex-col tw-mt-6">
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
                                    <button class="tw-flex tw-items-center tw-gap-x-3 focus:tw-outline-none">
                                        <span>Created</span>

                                        <svg class="tw-h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                        </svg>
                                    </button>
                                </th>
                                <th scope="col" class="tw-px-12 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Client
                                </th>
                                <th scope="col" class="tw-w-10 tw-px-12 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Confirmation
                                </th>
                                <th scope="col" class="tw-w-10 tw-px-12 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Delivery
                                </th>
                                <th scope="col" class="tw-px-12 tw-py-3.5 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    Product
                                </th>



                                <th scope="col" class="tw-relative tw-py-3.5 tw-px-4">
                                    <span class="tw-sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody v-if="!loading" class="tw-bg-white tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700 darkx:tw-bg-gray-900">
                          <TableRow v-for="item in items" :key="item.id" :item="item" />
                        </tbody>

                        <tbody v-else class="tw-bg-white tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700 darkx:tw-bg-gray-900">
                          <tr>
                            <td
                              colspan="7"
                              class="tw-px-4 tw-py-4 tw-text-sm tw-font-medium tw-whitespace-nowrap"
                            >
                              <loading />
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
</section>
  </div>
</template>

<script>
import TablePaginationNoNums from '@/views/followup/partials/table/TablePaginationNoNums';
import TableRow from '@/views/followup/partials/table/TableRow';

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
        default: 5
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
  }

}
</script>

<style>

</style>