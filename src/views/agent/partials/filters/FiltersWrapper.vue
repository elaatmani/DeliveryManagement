<template>
  <div class="tw-mb-4">
    <div class="tw-grid tw-grid-cols-12 tw-gap-4 tw-p-1">

      <div class="md:tw-col-span-4 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Created</label
        >
        <input
          :value="filters.created_at"
          type="date"
          @change="e => $emit('update', {...filters, created_at: e.target.value})"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        />
      </div>

      <div class="md:tw-col-span-4 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Confirmation</label
        >
        <select
          :value="filters.confirmation"
          @change="e=> $emit('update', {...filters, confirmation: e.target.value})"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
          <option value="all" selected>All</option>
          <option :value="c.value" class="tw-capitalize" v-for="c in confirmations" :key="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>

      <div v-if="false" class="md:tw-col-span-4 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Delivery Status</label
        >
        <select
          @change="e=> $emit('update', {...filters, delivery: e.target.value})"
          :value="filters.delivery"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
          <option value="all"  selected>All</option>
          <option :value="d.value" class="tw-capitalize" v-for="d in deliveries" :key="d.id">
            {{ d.name }}
          </option>
        </select>
      </div>

      <div v-if="false" class="md:tw-col-span-4 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Delivery</label
        >
        <select
          id="countries"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
          <option selected>All</option>
          <option class="tw-capitalize" v-for="d in deliveryStatus" :key="d.id">
            {{ d.name }}
          </option>
        </select>
      </div>

      <div @click="$emit('filter')" class="tw-col-span-12 tw-flex tw-justify-end">
        <button
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
import { confirmations, deliveryStatus } from "@/config/orders";

export default {
  props: {
    filters: {
      required: true,
      default: {}
    }
  },
    data() {
        return {
            confirmations,
            deliveryStatus,
            deliveries: [
              {
                id: 1,
                value: 'annuler',
                name: 'Cancelled'
              },
              {
                id: 2,
                value: 'pas-de-reponse',
                name: 'No Answer'
              }
            ]
        }
    }
};
</script>

<style>
</style>