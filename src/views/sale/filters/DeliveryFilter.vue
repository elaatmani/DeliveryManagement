<template>
  <div>
    <span class="tw-text-sm tw-text-neutral-600">Delivery</span>
    <div class="tw-relative">
      <select
        v-model="deliveryFilter"
        class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200 tw-outline-0 tw-text-sm"
      >
        <option
          :value="!delivery.value ? 'all' : delivery.value"
          :key="delivery.id"
          v-for="delivery in deliveryStatus"
        >
          {{ !delivery.value ? "Select" : delivery.value }}
        </option>
      </select>
      <v-icon
        class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2"
        >mdi-chevron-down</v-icon
      >
    </div>
  </div>
</template>

<script>
import { deliveryStatus } from '@/config/orders';

export default {
    props: ['filter'],

    data() {
        return {
            deliveryFilter: 'all',
            deliveryStatus: deliveryStatus
        }
    },

    watch: {
        deliveryFilter(v) {
            this.$emit('update:filter', v)
        }
    }
};
</script>

<style>
</style>