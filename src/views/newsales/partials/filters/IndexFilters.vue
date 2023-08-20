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

        <button :class="[showToday && '!tw-bg-gray-100']" :disabled="showToday" @click="filterToday(true)" class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
            Today
        </button>
        <!-- 
            <button class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
                Yesterday
            </button> -->
        <button
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
          v-if="activeStatistics && !!statistics"
          @click="showStatistics = !showStatistics"
          :class="[showStatistics && '!tw-bg-gray-100']"
          class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 2c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1s1-.4 1-1V3c0-.6-.4-1-1-1zM5 12c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1s1-.4 1-1v-8c0-.6-.4-1-1-1zm10-4c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1s1-.4 1-1V9c0-.6-.4-1-1-1zm5 8c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1s1-.4 1-1v-4c0-.6-.4-1-1-1z"/></svg>
        </button>

        <button
          @click="$emit('fresh')"
          :disabled="loading"
          class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 10.75h-3m12.5-2c0 3-2.798 5.5-6.25 5.5c-3.75 0-6.25-3.5-6.25-3.5v3.5m9.5-9h3m-12.5 2c0-3 2.798-5.5 6.25-5.5c3.75 0 6.25 3.5 6.25 3.5v-3.5"/></svg>
        </button>
        <button
          @click="showExport = !showExport"
          :class="[showExport && '!tw-bg-gray-100']"
          :disabled="loading"
          class="tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m16.2 20.5l2.8-2.8V20h1v-4h-4v1h2.3l-2.8 2.8l.7.7ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.7q-.475-.225-.975-.388T19 11.075V5H5v14h6.05q.075.55.238 1.05t.387.95H5Zm0-3v1V5v6.075V11v7Zm2-1h4.075q.075-.525.238-1.025t.362-.975H7v2Zm0-4h6.1q.8-.75 1.787-1.25T17 11.075V11H7v2Zm0-4h10V7H7v2Zm11 14q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23Z"/></svg>
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
            <option :value="200">200</option>
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

      <div class="tw-relative tw-flex tw-items-center tw-mt-4 md:tw-mt-0">

        <input
          type="text"
          placeholder="Search"
          :value="search"
          @input="e => $emit('update:search', e.target.value)"
          @keyup.enter="$emit('filter')"
          class="tw-block tw-w-full tw-py-1.5  tw-pl-5 tw-text-gray-700 tw-bg-white tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg md:tw-w-80 placeholder-gray-400/70 tw-pr-11 rtl:tw-pr-11 rtl:tw-pl-5 darkx:tw-bg-gray-900 darkx:tw-text-gray-300 darkx:tw-border-gray-600 focus:tw-border-orange-400 darkx:focus:tw-border-orange-300 focus:tw-ring-orange-300 focus:tw-outline-none focus:tw-ring focus:tw-ring-opacity-40"
        />

        <button @click="$emit('filter')" class="tw-absolute tw-right-0 tw-px-2 tw-py-1 tw-w-[38px] tw-h-[36px] tw-border-solid tw-rounded-r-lg  tw-border-l tw-text-orange-500/80  tw-border-orange-500/20 hover:tw-bg-orange-500/10 hover:tw-border-orange-500/70 tw-duration-300 tw-flex tw-items-center tw-justify-center">
            <v-icon size="small" >mdi-magnify</v-icon>
        </button>
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

    <div
      :class="[showExport ? 'tw-grid-rows-[1fr]' : 'tw-grid-rows-[0fr]']"
      class="tw-grid tw-duration-300 tw-transition-all"
    >
      <div class="tw-overflow-hidden tw-col-span-1">
          <IndexExport :filters="filters" />
      </div>
    </div>

    <div
      v-if="!!statistics"
      :class="[showStatistics ? 'tw-grid-rows-[1fr]' : 'tw-grid-rows-[0fr]']"
      class="tw-grid tw-duration-300 tw-transition-all"
    >
      <div class="tw-overflow-hidden tw-col-span-1">
          <IndexStatistics :statistics="statistics" />
      </div>
    </div>
  </div>
</template>

<script>
import IndexStatistics from '@/views/newsales/partials/filters/IndexStatistics'
import IndexExport from '@/views/newsales/partials/filters/IndexExport'
import FiltersWrapper from '@/views/newsales/partials/filters/FiltersWrapper'

import moment from 'moment';

export default {
  components: { IndexStatistics, FiltersWrapper, IndexExport },
  
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
    filters: {
      required: true,
    }
  },


  data() {
    return {
      showFilters: false,
      showStatistics: false,
      showExport: false,
      showAll: true,
      showToday: false,
    };
  },

  methods: {
    handlePerPageChange(e) {
      this.$emit('perPageChange', e.target.value);
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