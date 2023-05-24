<template>
  <div>
    <div class="mb-5 tw-border-b tw-border-solid tw-pb-5 tw-border-neutral-200">
      <div class="tw-grid tw-grid-cols-4 lg:tw-grid-cols-5 tw-gap-2">
        <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-2">
          <DashItem :dash="newSales" />
        </div>

        <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-2">
          <DashItem :dash="toProcess" />
        </div>

        <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-2">
          <DashItem :dash="confirmedSales" />
        </div>

        <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-2">
          <DashItem :dash="deliveredSales" />
        </div>

        <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-4">
          <DashItem :dash="shippedSales" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashItem from "@/views/sale/partials/DashItem";
import {
  confirmedSales,
  deliveredSales,
  newSales,
  shippedSales,
  toProcessSales,
} from "./../filters/filter";

export default {
  components: { DashItem },
  props: ["sales"],

  computed: {
    newSales() {
      return newSales(this.sales);
    },
    toProcess() {
      return toProcessSales(this.sales);
    },
    confirmedSales() {
      return confirmedSales(this.sales);
    },
    deliveredSales() {
      return deliveredSales(this.sales);
    },
    shippedSales() {
      return shippedSales(this.sales);
    },
  },
};
</script>

<style>
</style>