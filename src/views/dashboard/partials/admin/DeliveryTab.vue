<template>
  <div>
    <div class="tw-grid tw-mb-5 tw-grid-cols-4 md:tw-grid-cols-4 lg:tw-grid-cols-4 tw-gap-2 py-5 px-5">

      <div class="lg:tw-col-span-2 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="totalSales" />
      </div>

      <div class="lg:tw-col-span-2 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="deliveredSales" />
      </div>

      <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-5">
        <DashItemTwo :dash="shippedSales" />
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
</template>

<script>

  import DashItemTwo from "@/views/dashboard/partials/DashItemTwo";


  import Sale from "@/api/Sale";

  export default {
    components: { DashItemTwo },

    data() {
      return {
        isLoaded: false,
        dashItems: [
          {
            id: 1,
            title: "Orders",
            value: 1200,
            icon: "mdi-package-variant-closed",
            color: "orange",
          },
          {
            id: 2,
            title: "Total Sales",
            value: "35000 DH",
            icon: "mdi-currency-usd",
            color: "green",
          },
          {
            id: 3,
            title: "Orders Confirmed",
            value: 600,
            icon: "mdi-phone-check-outline",
            color: "blue",
          },
          {
            id: 4,
            title: "Orders Delivered",
            value: 543,
            icon: "mdi-truck-check-outline",
            color: "pink",
          },
        ],

        filledDashItems: [
          {
            id: 1,
            title: "Customers",
            value: 2300,
            color: "primary-orange",
            icon: "mdi-account-outline",
          },

          {
            id: 2,
            title: "Suppliers",
            value: 300,
            color: "primary-blue",
            icon: "mdi-account-check-outline",
          },

          {
            id: 3,
            title: "Purchase Invoice",
            value: 1100,
            color: "primary-indigo",
            icon: "mdi-file-document-outline",
          },

          {
            id: 4,
            title: "Agents",
            value: 10,
            color: "primary-green",
            icon: "mdi-moped-outline",
          },
        ],
      };
    },
    computed: {
      user() {
        return this.$store.getters["user/user"];
      },
      isAdmin() {
        return this.user.role == "admin";
      },
      sales() {
        return this.$store.getters["sale/sales"];
      },
      totalSales() {
        return {
          id: 1,
          title: "Total",
          value: this.sales.filter((i) => i).length,
          // value: 35,
          color: "primary-blue",
          icon: "mdi mdi-all-inclusive",
        };
      },

      deliveredSales() {
        return {
          id: 2,
          title: "Delivered",
          value: this.sales.filter((i) => i.confirmation == "livre").length,
          // value: 412,
          color: "primary-green",
          icon: "mdi-account-check-outline",
        };
      },

      toProcess() {
        return {
          id: 3,
          title: 'Process',
          value: this.sales.filter(
            i => (!!i.confirmation)
              && !(['confirmer', 'livre', 'expidier'].includes(i.confirmation))
          ).length,
          // value: 231,
          color: 'primary-orange',
          icon: 'mdi-reload'
        }
      },

      shippedSales() {
        return {
          id: 4,
          title: "Shipped",
          value: this.sales.filter((i) => i.confirmation == "expidier").length,
          // value: 112,
          color: "lime-darken-3",
          icon: "mdi-truck",
        };
      },


      reportedSales() {
        return {
          id: 5,
          title: 'Reported',
          value: this.sales.filter(i => i.confirmation == 'reporter').length,
          // value: 112,
          color: 'deep-purple-accent-2',
          icon: 'mdi mdi-clock-outline'
        }
      },

      canceledSales() {
        return {
          id: 6,
          title: 'Canceled',
          value: this.sales.filter(i => i.confirmation == 'annuler').length,
          // value: 112,
          color: 'red-accent-3',
          icon: 'mdi mdi-cancel'
        }
      },
    },
    mounted() {
      Sale.all()
        .then((res) => {
          if (res?.data.code == "SUCCESS") {
            const sales = res.data.data.orders;
            console.log(res.data);
            this.$store.dispatch("sale/setSales", sales);
            this.$store.dispatch("sale/setFetched", true);
            this.isLoaded = true;
          }
        })
        .catch(this.$handleApiError);
    },
  };
</script>

<style></style>