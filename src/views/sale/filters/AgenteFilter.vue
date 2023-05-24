<template>
  <div>
    <span class="tw-text-sm tw-text-neutral-600">Agente</span>
    <div class="tw-relative">
      <select
        v-model="agenteFilter"
        class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200 tw-outline-0 tw-text-sm"
      >
        <option value="all">Select</option>
        <option :value="null">Without agente</option>
        <option :value="agente.id" :key="agente.id" v-for="agente in agentes">
          {{ agente.firstname }} {{ agente.lastname }}
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
      agenteFilter: "all",
    };
  },

  computed: {
    users() {
      return this.$store.getters["user/users"];
    },
    agentes() {
      return this.users.filter((i) => i.role.id == 2);
    },
  },

  watch: {
    agenteFilter(v) {
      this.$emit("update:filter", v);
    },
  },
};
</script>

<style>
</style>