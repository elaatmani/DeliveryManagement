<template>
  <div>
    <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-mb-4">
      <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
        <DateFilter v-model:filter="config.dateFilter" />
      </div>

      <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
        <UpsellFilter v-model:filter="config.upsellFilter" />
      </div>

      <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
        <ConfirmationFilter v-model:filter="config.confirmationFilter" />
      </div>

      <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
        <AffectationFilter v-model:filter="config.affectationFilter" />
      </div>

      <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
        <AgenteFilter v-model:filter="config.agenteFilter" />
      </div>

      <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
        <DeliveryFilter v-model:filter="config.deliveryFilter" />
      </div>

      <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
        <ProductFilter v-model:filter="config.productFilter" />
      </div>
    </div>
  </div>
</template>

<script>
import DateFilter from "@/views/sale/filters/DateFilter";
import UpsellFilter from "@/views/sale/filters/UpsellFilter";
import DeliveryFilter from "@/views/sale/filters/DeliveryFilter";
import ConfirmationFilter from "@/views/sale/filters/ConfirmationFilter";
import AffectationFilter from "@/views/sale/filters/AffectationFilter";
import AgenteFilter from "@/views/sale/filters/AgenteFilter";
import ProductFilter from '@/views/sale/filters/ProductFilter';
import salesFilter from "./../filters/filter";

export default {
  components: {
    DateFilter,
    UpsellFilter,
    DeliveryFilter,
    ConfirmationFilter,
    AffectationFilter,
    AgenteFilter,
    ProductFilter
  },

  props: ["sales", "filtered", "search"],

  data() {
    return {
      config: {
        confirmationFilter: "all",
        affectationFilter: "all",
        upsellFilter: "all",
        deliveryFilter: "all",
        agenteFilter: "all",
        productFilter: "all",
        dateFilter: [null, null],
      },
    };
  },

  computed: {
    results() {
      return salesFilter(this.sales, this.search, this.config);
    },
  },

  watch: {
    results(v) {
      this.$emit("update:filtered", v);
    },
  },

  mounted() {
    this.$emit("update:filtered", this.sales);
  },
};
</script>

<style>
</style>