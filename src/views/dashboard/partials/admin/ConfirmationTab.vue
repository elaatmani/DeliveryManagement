<template>
  <div>
    <div class="tw-grid tw-mb-5 tw-grid-cols-4 md:tw-grid-cols-4 lg:tw-grid-cols-4 tw-gap-2 py-5">
      <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="totalSales" />
      </div>

      <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="confirmedSales" />
      </div>

      <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="newSales" />
      </div>

      <!-- <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="toProcess" />
      </div> -->

      <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="reportedSales" />
      </div>

      <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="noanswerSales" />
      </div>

      <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="canceledSales" />
      </div>
      <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="doubledSales" />
      </div>
      <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
        <DashItemTwo :dash="wrongNumberSales" />
      </div>

    </div>
  </div>
</template>


<script>
  import DashItemTwo from "@/views/dashboard/partials/DashItemTwo";
  import Sale from "@/api/Sale";

  export default {
    components: { DashItemTwo },
    props: ["filteredSales"],

    data() {
      return {
        isLoaded: false,

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
        return this.filteredSales;
      },
      totalSales() {
        return {
          id: 1,
          title: "Total",
          pourcentage: 100,
          value: this.sales.length  ,
          // value: 35,
          color: "deep-purple-accent-2",
          icon: "mdi mdi-all-inclusive",
        };
      },
      newSales() {
        return {
          id: 2,
          title: "New",
          value: this.sales.filter((i) => !i.confirmation && !i.delivery).length,
          pourcentage: ((this.sales.filter((i) => !i.confirmation && !i.delivery).length * 100) / this.sales.length).toFixed(2),
          // value: 35,
          color: "grey",
          icon: "mdi mdi-new-box",
        };
      },
      toProcess() {
        return {
          id: 3,
          title: "Process",
          value: this.sales.filter(
            (i) =>
              !!i.confirmation &&
              !["confirmer", "livrer", "expidier"].includes(i.confirmation)
          ).length,
          pourcentage: ((this.sales.filter(
            (i) =>
              !!i.confirmation &&
              !["confirmer", "livrer", "expidier"].includes(i.confirmation)
          ).length * 100) / this.sales.length).toFixed(2),
          // value: 231,
          color: "primary-orange",
          icon: "mdi-reload",
        };
      },
      confirmedSales() {
        return {
          id: 4,
          title: "Confirmed",
          value: this.sales.filter((i) => i.confirmation == "confirmer").length,
          pourcentage: ((this.sales.filter((i) => i.confirmation == "confirmer").length * 100) / this.sales.filter((i)=> i.confirmation && i.confirmation != "double").length).toFixed(2),
          // value: 112,
          color: "primary-green",
          icon: "mdi-phone-check",
        };
      },
      reportedSales() {
        return {
          id: 5,
          title: "Reported",
          value: this.sales.filter((i) => i.confirmation == "reporter").length,
          pourcentage: ((this.sales.filter((i) => i.confirmation == "reporter").length * 100) / this.sales.length).toFixed(2),        // value: 112,
          color: "primary-blue",
          icon: "mdi mdi-clock-outline",
        };
      },
      canceledSales() {
        return {
          id: 6,
          title: "Canceled",
          value: this.sales.filter((i) => i.confirmation == "annuler").length,
          pourcentage: ((this.sales.filter((i) => i.confirmation == "annuler").length * 100) / this.sales.length).toFixed(2),
          // value: 112,
          color: "red-accent-3",
          icon: "mdi mdi-cancel",
        };
      },
      noanswerSales() {
        return {
          id: 6,
          title: "No Answer",
          value: this.sales.filter((i) => ['day-one-call-one',
            'day-one-call-two',
            'day-one-call-three',
            'day-two-call-one',
            'day-two-call-two',
            'day-two-call-three',
            'day-three-call-one',
            'day-three-call-two',
            'day-three-call-three'].includes(i.confirmation)).length,
          pourcentage: ((this.sales.filter((i) => ['day-one-call-one',
            'day-one-call-two',
            'day-one-call-three',
            'day-two-call-one',
            'day-two-call-two',
            'day-two-call-three',
            'day-three-call-one',
            'day-three-call-two',
            'day-three-call-three'].includes(i.confirmation)).length * 100) / this.sales.length).toFixed(2),
          // value: 112,
          color: "yellow-darken-3",
          icon: "mdi mdi-headphones-off",
        };
      },
      doubledSales() {
        return {
          id: 8,
          title: "Doubled",
          pourcentage: ((this.sales.filter(s => s.confirmation == 'double').length * 100) / this.sales.length).toFixed(2),
          value: this.sales.filter(s => s.confirmation == 'double').length,
          // value: 35,
          color: "purple-accent-4",
          icon: "mdi mdi-selection-multiple",
        };
      },
      wrongNumberSales() {
        return {
          id: 9,
          title: "Wrong Number",
          pourcentage: ((this.sales.filter(s => s.confirmation == 'wrong-number').length * 100) / this.sales.length).toFixed(2),
          value: this.sales.filter(s => s.confirmation == 'wrong-number').length,
          // value: 35,
          color: "purple-lighten-1",
          icon: "mdi mdi-phone-remove",
        };
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

<style>
</style>