<template>
  <div>
    <!-- Pass the applyFilters method to handle filter application explicitly -->
    <IndexFilters @update="updateFilters" @filter="applyFilters" />
    <div class="tw-flex tw-flex-wrap tw-justify-center md:tw-flex-nowrap tw-items-center tw-gap-2">
      <ConfirmationChart :filters="appliedFilters" />
      <IndexStatistics :statistics="statistics" :fetching="fetching" />
    </div>
  </div>
</template>

<script>
import IndexStatistics from "@/views/newdashboards/agent/partials/statistics/IndexStatistics";
import ConfirmationChart from "@/views/newdashboards/agent/chart/ConfirmationChart";
import IndexFilters from "@/views/newdashboards/agent/partials/filters/IndexFilters";
import Agent from "@/api/Agent";

export default {
  components: { IndexStatistics, IndexFilters, ConfirmationChart },

  data() {
    return {
      currentFilters: {
        dropped_from: null,
        dropped_to: null,
        treated_from: null,
        treated_to: null,
      },
      appliedFilters: {
        dropped_from: null,
        dropped_to: null,
        treated_from: null,
        treated_to: null,
      },
      statistics: null,
      fetching: true,
    };
  },

  methods: {
    updateFilters(newFilters) {
      this.currentFilters = newFilters;
    },

    async applyFilters() {
      this.appliedFilters = { ...this.currentFilters };
      this.fetching = true;

      try {
        const res = await Agent.statistics(this.appliedFilters);
        if (res.data.code === "SUCCESS") {
          this.statistics = res.data.data.statistics;
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
        this.$handleApiError(error);
      } finally {
        this.fetching = false;
      }
    },
  },
};
</script>
