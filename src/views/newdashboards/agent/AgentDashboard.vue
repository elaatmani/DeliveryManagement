<template>
  <div>
    <div class="tw-grid tw-grid-cols-12 tw-gap-3 tw-mb-4">
      <div class="tw-col-span-12 md:tw-col-span-4">
        <AssignedPerDayChart  />
      </div>

      <div class="tw-col-span-12 md:tw-col-span-4">
        <ConfirmedPerDayChart />
      </div>

      <div class="tw-col-span-12 md:tw-col-span-4">
        <AgentsRankingChart />
      </div>

    </div>

    <IndexFilters @update="(f) => (filters = f)" @filter="handleFilter" />
    <IndexStatistics :statistics="statistics" :fetching="fetching" />
  </div>
</template>

<script>
import IndexStatistics from "@/views/newdashboards/agent/partials/statistics/IndexStatistics";
import IndexFilters from "@/views/newdashboards/agent/partials/filters/IndexFilters";
import AssignedPerDayChart from "./partials/charts/AssignedPerDayChart.vue";
import ConfirmedPerDayChart from "./partials/charts/ConfirmedPerDayChart.vue";
import AgentsRankingChart from "./partials/charts/AgentsRankingChart.vue";
import Agent from "@/api/Agent";

export default {
  components: { IndexStatistics, IndexFilters, AssignedPerDayChart, ConfirmedPerDayChart, AgentsRankingChart },

  data() {
    return {
      filters: null,
      statistics: null,
      fetching: true,
    };
  },

  methods: {
    handleFilter() {
      this.fetching = true;
      Agent.statistics(this.filters)
        .then((res) => {
          if (res.data.code == "SUCCESS") {
            this.statistics = res.data.data.statistics;
            this.fetching = false;
          }
        })
        .catch(this.$handleApiError);
    },
  },
};
</script>
