<template>
  <div class="py-5 px-2 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5 ">

    <section class="tw-px-3">
    <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <div>
            <div class="tw-flex tw-items-center tw-gap-x-3">
                <h2 class="tw-text-lg tw-font-medium tw-text-gray-800 darkx:tw-text-white">Orders</h2>

                <span class="tw-px-3 tw-py-1 tw-text-xs tw-text-emerald-600 tw-bg-emerald-100 tw-rounded-full darkx:tw-bg-gray-800 darkx:tw-text-orange-400">{{ totalOrders }} order</span>
            </div>

            <p class="tw-mt-1 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">Show all confirmed orders.</p>
        </div>

        <div v-if="false" class="tw-flex tw-items-center tw-mt-4 tw-gap-x-3">

            <button class="tw-flex tw-items-center tw-justify-center  tw-px-5 tw-py-2 tw-text-sm tw-tracking-wide tw-text-white tw-transition-colors tw-duration-200 tw-bg-orange-500 tw-rounded-lg shrink-0 sm:tw-w-auto tw-gap-x-2 hover:tw-bg-orange-600 darkx:hover:tw-bg-orange-500 darkx:tw-bg-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-w-5 tw-h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Create</span>
            </button>
        </div>
    </div>

    <!-- Filters Section -->
    <IndexFilters 
      v-model:search="search" 
      v-model:filters="filters"
      @filter="handlePerPageChange(per_page)" 
      @per-page-change="handlePerPageChange" 
      @fresh="paginateOrders" 
      :loading="fetching" 
      :statistics="statistics" 
      active-statistics
    />

    <div>
      <IndexTable 
      @update="handleItemUpdate" 
      @page-change="handlePageChange" 
      @sort-order="handleSortOrderChange"  
      :loading="fetching" 
      :from="from" 
      :to="to" 
      :last-page="last_page" 
      :per-page="per_page" 
      :total="total" 
      :current-page="current_page" 
      :items="items" 
      />
    </div>
</section>

      

  </div>
</template>

<script>
import Agent from '@/api/Agent';
import IndexTable from '@/views/agent/partials/IndexTable'
import IndexFilters from '@/views/agent/partials/filters/IndexFilters'
import { getPath } from '@/helpers/methods';

export default {
  components: { IndexTable, IndexFilters },

  data() {
    return {
      fetching: true,

      items: [],

      statistics: null,

      first_page_url: null,
      lase_page_url: null,
      next_page_url: null,
      prev_page_url: null,
      last_page: 1,
      from: 1,
      to: 1,
      total: 0,
      totalOrders: 0,
      links: null,
      search: '',

      sort_by: 'created_at',
      sort_order: 'desc',
      per_page: 10,
      current_page: 1,

      filters: {
        confirmation: 'all',
        created_at: 'all',
      }

    }
  },

  methods: {

    paginateOrders() {
      const url = '?page=' + this.current_page;
      const options = {
        sort_by: this.sort_by,
        sort_order: this.sort_order,
        per_page: this.per_page,
        current_page: this.current_page,
        search: this.search,
        filters: this.filters,
        confirmation: 'confirmer'
      };

      this.fetching = true
      return Agent.paginate(url, options)
      .then(({data}) => {
        const options = data.data.orders;
        this.setOptions(options);
        this.statistics = !this.search ? data.data.statistics : this.statistics;
      })
      .then(() => {
        this.fetching = false
      })
    },

    setOptions(options) {
      this.items = (options.data)
      this.first_page_url = getPath(options.first_page_url)
      this.lase_page_url = getPath(options.last_page_url)
      this.next_page_url = getPath(options.next_page_url)
      this.prev_page_url = getPath(options.prev_page_url)
      this.last_page = parseInt(options.last_page)
      this.from = parseInt(options.from)
      this.to = parseInt(options.to)
      this.per_page = parseInt(options.per_page)
      this.total = parseInt(options.total)
      this.totalOrders = !this.search ? parseInt(options.total) : this.totalOrders;
      this.links = (options.links)
    },

    handleNext() {

    },

    handlePrev() {

    },

    handleItemUpdate(item) {
      this.items = this.items.map(i => i.id == item.id ? item : i);
    },

    handlePageChange(page) {
      this.current_page = page
      this.paginateOrders()
    },

    handlePerPageChange(n) {
      this.per_page = parseInt(n);
      this.handlePageChange(1)
    },

    handleSortOrderChange() {
      this.sort_order = this.sort_order == 'asc' ? 'desc' : 'asc';
      this.paginateOrders()
    }

  },


  mounted() {
    this.paginateOrders()
  }
};
</script>

<style>
</style>