<template>
  <div class="tw-bg-white tw-p-5">
    <div>
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium">Filters</h1>
    </div>
    <div class="tw-grid tw-grid-cols-12 tw-gap-4 tw-p-1">

      <DateFilter v-model:from="filters.created_from" v-model:to="filters.created_to" label="Created" />

      <DateFilter v-model:from="filters.dropped_from" v-model:to="filters.dropped_to" label="Dropped" />

      <SellerFilter :filters="filters" @update="f => filters = f" />

      <ProductFilter :filters="filters" @update="f => filters = f" />


      <div  class="tw-col-span-12 tw-flex tw-justify-end tw-gap-2">
        <button
        @click="clear"
          class="tw-flex tw-items-center tw-text-gray-500 tw-justify-center tw-px-5 tw-py-2 tw-text-sm tw-tracking-wide tw-transition-colors tw-duration-200 tw-bg-gray-200 tw-rounded-lg shrink-0 sm:tw-w-auto tw-gap-x-2 hover:tw-bg-gray-300 darkx:hover:tw-bg-gray-500 darkx:tw-bg-gray-600"
        >
          <svg class="tw-stroke-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>

          <span>Clear</span>
        </button>

        <button
        @click="filter"
          class="tw-flex tw-items-center tw-justify-center tw-px-5 tw-py-2 tw-text-sm tw-tracking-wide tw-text-white tw-transition-colors tw-duration-200 tw-bg-orange-500 tw-rounded-lg shrink-0 sm:tw-w-auto tw-gap-x-2 hover:tw-bg-orange-600 darkx:hover:tw-bg-orange-500 darkx:tw-bg-orange-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="#fff"
              d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
            />
          </svg>

          <span>Filter</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SellerFilter from '@/views/dashboardanalytics/partials/filters/components/SellerFilter'
import ProductFilter from '@/views/dashboardanalytics/partials/filters/components/ProductFilter'
import DateFilter from '@/views/dashboardanalytics/partials/filters/components/DateFilter'

export default {
  components: { SellerFilter, ProductFilter, DateFilter },

  props: {},

    data() {
        return {
            dateFilter: ['', ''],

            filters: {}
        }
    },

    watch: {
        filters: {
            deep: true,
            handler(value) {
                console.log(value)
            }
        }
    },

    methods: {
        clear() {
            this.filters = {
                created_from: null,
                created_to: null,
                user_id: 'all',
                product_id: 'all',
            }
        },
        filter() {
            this.$emit('update', this.filters)
            this.$emit('filter');
        }
    },

    mounted() {
        this.clear();
        this.filter();
    }

};
</script>

<style>
</style>