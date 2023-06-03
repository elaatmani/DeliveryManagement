<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1
          class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg"
        >
          Dashboard
        </h1>
      </div>
    </div>

    <div v-if="!isLoaded">
      <LoadingAnimation />
    </div>

    <div v-if="isLoaded">
      <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
        <div
          class="tw-grid tw-mb-5 tw-grid-cols-4 md:tw-grid-cols-4 lg:tw-grid-cols-5 tw-gap-2"
        >
          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
            <DashItemTwo :dash="totalSales" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
            <DashItemTwo :dash="confirmedSales" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
            <DashItemTwo :dash="toProcess" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
            <DashItemTwo :dash="reportedSales" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
            <DashItemTwo :dash="canceledSales" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashItemTwo from "@/views/dashboard/partials/DashItemTwo";
import Dashboard from "@/api/Dashboard";

export default {
  components: { DashItemTwo },

  data() {
    return {
      isLoaded: true,
      orders: []
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    isAdmin() {
      return this.user.role == "admin";
    },
    totalSales() {
      return {
        id: 1,
        title: "Total",
        //   value: this.sales.filter(i => i).length,
        value: this.orders.length,
        color: "primary-blue",
        icon: "mdi mdi-all-inclusive",
      };
    },
    toProcess() {
      return {
        id: 3,
        title: "Process",
        //   value: this.sales.filter(
        //       i => (!!i.confirmation)
        //           && !(['confirmer', 'livre', 'expidier'].includes(i.confirmation))
        //   ).length,
        value: this.orders.filter(i => i.confirmation != 'confirmer').length,
        color: "primary-orange",
        icon: "mdi-reload",
      };
    },
    confirmedSales() {
      return {
        id: 4,
        title: "Confirmed",
        //   value: this.sales.filter(i => i.confirmation == 'confirmer').length,
        value: this.filterByStatus('confirmer').length,
        color: "primary-green",
        icon: "mdi-phone-check",
      };
    },
    reportedSales() {
      return {
        id: 5,
        title: "Reported",
        //   value: this.sales.filter(i => i.confirmation == 'reporter').length,
        value: this.filterByStatus('reporter').length,
        color: "deep-purple-accent-2",
        icon: "mdi mdi-clock-outline",
      };
    },
    canceledSales() {
      return {
        id: 6,
        title: "Canceled",
        //   value: this.sales.filter(i => i.confirmation == 'annuler').length,
        value: this.filterByStatus('annuler').length,
        color: "red-accent-3",
        icon: "mdi mdi-cancel",
      };
    },
  },

  methods: {
    filterByStatus(value) {
      return this.orders.filter((o) => o.confirmation == value);
    },

    getOrders() {
      this.isLoaded = false;
      Dashboard.agente()
        .then((res) => {
          if (res.data.code == "SUCCESS") {
            this.orders = res.data.data.orders;
          }
        })
        .finally(() => {
          this.isLoaded = true;
        });
    },
  },

  mounted() {
    this.getOrders();
  },
};
</script>

<style>
</style>