<template>
  <div>
    <span class="tw-text-sm tw-text-neutral-600">Affecté</span>
    <div class="tw-relative">
      <select
        v-model="affectationFilter"
        class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200 tw-outline-0 tw-text-sm"
      >
        <option value="all">Select</option>
        <option :value="null">Without delivery</option>
        <option
          :value="delivery.id"
          :key="delivery.id"
          v-for="delivery in deliveries"
        >
          {{ delivery.firstname }} {{ delivery.lastname }}
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
export default {
  props: ["filter"],

  data() {
    return {
      affectationFilter: "all",
    };
  },

  computed: {
    users() {
      return this.$store.getters["user/users"];
    },
    deliveries() {
      return this.users.filter((i) => i.role.id == 3);
    },
  },

  watch: {
    affectationFilter(v) {
      this.$emit("update:filter", v);
    },
  },
};
</script>

<style>
</style>