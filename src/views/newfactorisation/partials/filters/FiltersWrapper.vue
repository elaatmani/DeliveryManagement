<template>
  <div class="tw-mb-4">
    <div class="tw-grid tw-grid-cols-12 tw-gap-4 tw-p-1">
      <SellerFilter  v-if="false" :filters="filters" @update="f => $emit('update', f)" />
      <CloseFilter :filters="filters" @update="f => $emit('update', f)" />
      <PaidFilter :filters="filters" @update="f => $emit('update', f)" />


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
import SellerFilter from './SellerFilter'
import CloseFilter from './CloseFilter'
import PaidFilter from './PaidFilter'

export default {
  components: { SellerFilter, CloseFilter, PaidFilter },
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