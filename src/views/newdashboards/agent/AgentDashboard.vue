<template>
  <div>
    <IndexFilters @update="(f) => (filters = f)" @filter="handleFilter" />
    <IndexStatistics :statistics="statistics" :fetching="fetching" />
  </div>
</template>

<script>
import IndexStatistics from "@/views/newdashboards/agent/partials/statistics/IndexStatistics";
import IndexFilters from "@/views/newdashboards/agent/partials/filters/IndexFilters";
import Agent from "@/api/Agent";

export default {
  components: { IndexStatistics, IndexFilters },

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
