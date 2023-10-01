<template>
  <div class="tw-mb-4">
    <div class="tw-grid tw-grid-cols-12 tw-gap-4 tw-p-1">

      <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Created From</label
        >
        <input
          :value="filters.created_from"
          type="date"
          @change="e => $emit('update', {...filters, created_from: e.target.value})"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        />
      </div>

      <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Created To</label
        >
        <input
          :value="filters.created_to"
          type="date"
          @change="e => $emit('update', {...filters, created_to: e.target.value})"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        />
      </div>

      <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Ads From</label
        >
        <input
          :value="filters.ads_from"
          type="date"
          @change="e => $emit('update', {...filters, ads_from: e.target.value})"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        />
      </div>

      <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Ads To</label
        >
        <input
          :value="filters.ads_to"
          type="date"
          @change="e => $emit('update', {...filters, ads_to: e.target.value})"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        />
      </div>

      <MarketerFilter :filters="filters" @update="f => $emit('update', f)" />
      <ProductFilter :filters="filters" @update="f => $emit('update', f)" />
      <SourceFilter :filters="filters" @update="f => $emit('update', f)" />


      <div class="tw-col-span-12 tw-flex tw-justify-end tw-gap-2">
        <button
        @click="$emit('clear')"
          class="tw-flex tw-items-center tw-text-gray-500 tw-justify-center tw-px-5 tw-py-2 tw-text-sm tw-tracking-wide tw-transition-colors tw-duration-200 tw-bg-gray-200 tw-rounded-lg shrink-0 sm:tw-w-auto tw-gap-x-2 hover:tw-bg-gray-300 darkx:hover:tw-bg-gray-500 darkx:tw-bg-gray-600"
        >
          <svg class="tw-stroke-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>

          <span>Clear</span>
        </button>
        <button @click="$emit('filter')" 
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

import MarketerFilter from '@/views/ads/partials/filters/MarketerFilter'
import ProductFilter from '@/views/ads/partials/filters/ProductFilter'
import SourceFilter from '@/views/ads/partials/filters/SourceFilter'
export default {
  components: { MarketerFilter,ProductFilter ,SourceFilter},
  props: {
    filters: {
      required: true,
      default: {}
    }
  },
    data() {
        return {
      
        }
    }
};
</script>

<style>
</style>