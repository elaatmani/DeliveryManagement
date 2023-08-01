<template>
  <div>
    <span class="tw-text-sm tw-text-neutral-600">Confirmation</span>
    <div class="tw-relative">
      <select
        v-model="confirmationFilter"
        class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200 tw-outline-0 tw-text-sm"
      >
        <option
          value="all"
        >
          Select
        </option>
        <option
          v-for="c in confirmations"
          :key="c.id"
          :value="c.value"
        >
          {{ c.name }}
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
import { confirmations } from "@/config/orders";

export default {
  props: ["filter"],

  data() {
    return {
      confirmationFilter: "all",
      confirmations: confirmations,
    };
  },

  watch: {
    confirmationFilter(v) {
      this.$emit("update:filter", v);
    },
  },
};
</script>

<style>
</style>