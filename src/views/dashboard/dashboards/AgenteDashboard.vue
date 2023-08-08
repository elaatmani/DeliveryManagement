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
        <div class="lg:tw-col-span-1 md:tw-col-span-1 tw-col-span-4">
          <DashItemTwo :dash="earningsDash" :symbol="currency" :numbers="false"/>
        </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
            <DashItemTwo :dash="totalSales" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
            <DashItemTwo :dash="confirmedSales" />
          </div>

          

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
            <DashItemTwo :dash="upsellSales" />
          </div>
        

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashItemTwo from "@/views/dashboard/partials/DashItemTwo";
import Dashboard from "@/api/Dashboard";
import { currency } from '@/config/config';

export default {
  components: { DashItemTwo },

  data() {
    return {
      currency,
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
          pourcentage:  this.orders.length === 0 ? 0.00 : 100.00,
          value: this.orders.filter((i) => i.confirmation != 'double').length,
          // value: 35,
          color: "deep-purple-accent-2",
          icon: "mdi mdi-all-inclusive",
        };
      },
      newSales() {
        return {
          id: 2,
          title: "New",
          value: this.orders.filter((i) => !i.confirmation).length,
          pourcentage: ((this.orders.filter((i) => !i.confirmation).length * 100) / this.orders.length).toFixed(2),
          // value: 35,
          color: "grey",
          icon: "mdi mdi-new-box",
        };
      },
      confirmedSales() {
        return {
          id: 4,
          title: "Confirmed",
          value: this.orders.filter((i) => i.confirmation == "confirmer").length,
          pourcentage: ((this.orders.filter((i) => i.confirmation == "confirmer").length * 100) / this.orders.filter((i) => i.confirmation != "double").length).toFixed(2),
          // value: 112,
          color: "primary-green",
          icon: "mdi-phone-check",
        };
      },
      reportedSales() {
        return {
          id: 5,
          title: "Reported",
          value: this.orders.filter((i) => i.confirmation == "reporter").length,
          pourcentage: ((this.orders.filter((i) => i.confirmation == "reporter").length * 100) / this.orders.length).toFixed(2),        // value: 112,
          color: "primary-blue",
          icon: "mdi mdi-clock-outline",
        };
      },
      canceledSales() {
        return {
          id: 6,
          title: "Canceled",
          value: this.orders.filter((i) => i.confirmation == "annuler").length,
          pourcentage: ((this.orders.filter((i) => i.confirmation == "annuler").length * 100) / this.orders.length).toFixed(2),
          // value: 112,
          color: "red-accent-3",
          icon: "mdi mdi-cancel",
        };
      },
      upsellSales() {
        return {
          id: 6,
          title: "Upsell",
          value: this.orders.filter((i) => i.upsell == "oui").length,
          pourcentage: ((this.orders.filter((i) => i.upsell == "oui").length * 100) / this.orders.length).toFixed(2),
          // value: 112,
          color: "#2563eb",
          icon: "mdi mdi-transfer-up",
        };
      },
      earningsDash() {
        return {
          id: 2,
          title: "Earnings",
        //   value: this.sales.filter((i) => i.confirmation == "livre").length,
          pourcentage: ((this.orders.filter((i) => i.upsell == "oui" && i.confirmation=="confirmer" && i.delivery == "livrer").length ) * 0.5),
          color: "green-darken-4",
          icon: "mdi-currency-usd",
        }
      },
      // earnings() {
      //   return this.orders.reduce(
      //     (s,o) => {
      //       if(o.factorisations == null) {
      //         return s;
      //       }
            
      //       if(!o.factorisations.paid && !o.factorisations.close) {
      //         return s + o.factorisations.price
      //       }
      //       return s
      //     }, 0
      //   )
      // },

      noanswerSales() {
        return {
          id: 6,
          title: "No Answer",
          value: this.orders.filter((i) => ['day-one-call-one',
            'day-one-call-two',
            'day-one-call-three',
            'day-two-call-one',
            'day-two-call-two',
            'day-two-call-three',
            'day-three-call-one',
            'day-three-call-two',
            'day-three-call-three'].includes(i.confirmation)).length,
          pourcentage: ((this.orders.filter((i) => ['day-one-call-one',
            'day-one-call-two',
            'day-one-call-three',
            'day-two-call-one',
            'day-two-call-two',
            'day-two-call-three',
            'day-three-call-one',
            'day-three-call-two',
            'day-three-call-three'].includes(i.confirmation)).length * 100) / this.orders.length).toFixed(2),
          // value: 112,
          color: "yellow-darken-3",
          icon: "mdi mdi-headphones-off",
        };
      }
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