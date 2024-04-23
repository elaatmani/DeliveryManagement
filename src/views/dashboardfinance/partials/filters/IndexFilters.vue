<template>
  <div>
    <div 
    class="tw-mt-6 tw-mb-4 md:tw-flex md:tw-items-center md:tw-justify-between">
      <div
        class="tw-inline-flex tw-overflow-hidden tw-bg-white tw-border tw-divide-x tw-rounded-lg darkx:tw-bg-gray-900 rtl:tw-flex-row-reverse darkx:tw-border-gray-700 darkx:tw-divide-gray-700"
      >
        <button
          :class="[showAll && '!tw-bg-gray-100']"
          :disabled="showAll"
          @click="filterToday(false)"
          class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 hover:tw-bg-gray-100 sm:tw-text-sm darkx:tw-bg-gray-800 darkx:tw-text-gray-300"
        >
          View all
        </button>

        <!-- <button title="Orders Created Today" :class="[showToday && '!tw-bg-gray-100']" :disabled="showToday" @click="filterToday(true)" class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
            Today
        </button> -->
        <!-- 
            <button class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
                Yesterday
            </button> -->
        <button
          title="Show Filters Tab"
          @click="showFilters = !showFilters"
          :class="[showFilters && '!tw-bg-gray-100']"
          class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z"
            />
          </svg>
        </button>

        <button
          title="Refresh"
          @click="$emit('fresh')"
          :disabled="loading"
          class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 10.75h-3m12.5-2c0 3-2.798 5.5-6.25 5.5c-3.75 0-6.25-3.5-6.25-3.5v3.5m9.5-9h3m-12.5 2c0-3 2.798-5.5 6.25-5.5c3.75 0 6.25 3.5 6.25 3.5v-3.5"/></svg>
        </button>

        <div class="tw-relative">
          <select
            @change="handlePerPageChange"
            :value="perPage"
            class="tw-h-full tw-px-5 tw-py-2 tw-w-20 focus:tw-outline-none tw-text-xs tw-font-medium tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
            <option :value="250">250</option>
            <option :value="500">500</option>
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

    </div>

    <div
      :class="[showFilters ? 'tw-grid-rows-[1fr]' : 'tw-grid-rows-[0fr]']"
      class="tw-grid tw-duration-300 tw-transition-all"
    >

      <div class="tw-overflow-hidden tw-col-span-1">
        <FiltersWrapper @clear="$emit('clear')" @filter="$emit('filter')" :filters="filters" @update="v => $emit('update:filters', v)" />
      </div>

    </div>

  </div>
</template>

<script>

import FiltersWrapper from '@/views/dashboardfinance/partials/filters/FiltersWrapper'

import moment from 'moment';

export default {
  components: { FiltersWrapper },
  
  props: {
    perPage: {
        type: Number
    },
    statistics: {
      default: null,
    },
    activeStatistics: {
      type: Boolean,
      default: false
    },
    loading: {
      default: true
    },
    search: {
      default: ''
    },
    searchByField: {
      default: 'all'
    },
    filters: {
      required: true,
    }
  },


  data() {
    return {
      showFilters: false,
      showAll: true,
      showToday: false,
    };
  },

  methods: {
    handlePerPageChange(e) {
      this.$emit('perPageChange', e.target.value);
    },

    showReportedFirst() {
      this.$emit('update:filters', {...this.filters, reported_first: !this.filters.reported_first});
      this.$emit('filter');
    },

    filterToday(value) {
      var currentDate = null;
      if(!value) {
        this.showAll = true;
        this.showToday = false;
        
      }
      else {
        this.showAll = false;
        this.showToday = true;
        currentDate = moment();
        // Format the current date
        currentDate = currentDate.format("YYYY-MM-DD");
      }
      this.$emit('update:filters', {...this.filters, created_from: currentDate, created_to: currentDate})
      this.$emit('filter');
    }
  },

  mounted() {
  }


};
</script>

<style>
</style>