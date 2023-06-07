<template>
    <div>
        <div class="mb-5 tw-flex tw-justify-between tw-items-center">
            <div>
                <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Dashboard</h1>
            </div>
        </div>

        <div v-if="!isLoaded">
            <LoadingAnimation />
        </div>

        <div v-if="isLoaded">

            <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

                <div class="tw-grid tw-mb-5 tw-grid-cols-4 md:tw-grid-cols-4 lg:tw-grid-cols-5 tw-gap-2">

                    <div class="lg:tw-col-span-1 md:tw-col-span-1 tw-col-span-4">
                      <DashItemTwo :dash="earningsDash" />
                    </div>

                    <div class="lg:tw-col-span-1 md:tw-col-span-1 tw-col-span-4">
                      <DashItemTwo :dash="totalSales" />
                    </div>
              
                    <div class="lg:tw-col-span-1 md:tw-col-span-1 tw-col-span-4">
                      <DashItemTwo :dash="deliveredSales" />
                    </div>
              
                    <!-- <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-5">
                      <DashItemTwo :dash="shippedSales" />
                    </div> -->
              
                    <!-- <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
                      <DashItemTwo :dash="toProcess" />
                    </div> -->
              
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


import DashItemTwo from '@/views/dashboard/partials/DashItemTwo'
import Dashboard from '@/api/Dashboard';

    export default {
        components: { DashItemTwo },

    data() {
        return {
            isLoaded: true,
            orders: [],
            cities: []
        }
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
          title: "Total Orders",
          value: this.orders.length,
          color: "primary-blue",
          icon: "mdi mdi-all-inclusive",
        };
      },

      deliveredSales() {
        return {
          id: 2,
          title: "Delivered",
        //   value: this.sales.filter((i) => i.confirmation == "livre").length,
          value: this.filterByStatus('livrer').length,
          color: "primary-orange",
          icon: "mdi-account-check-outline",
        };
      },

      toProcess() {
        return {
          id: 3,
          title: 'Process',
        //   value: this.sales.filter(
        //     i => (!!i.confirmation)
        //       && !(['confirmer', 'livre', 'expidier'].includes(i.confirmation))
        //   ).length,
          value: 231,
          color: 'primary-orange',
          icon: 'mdi-reload'
        }
      },

      shippedSales() {
        return {
          id: 4,
          title: "Shipped",
        //   value: this.sales.filter((i) => i.confirmation == "expidier").length,
          value: this.filterByStatus('expidier').length,
          color: "purple",
          icon: "mdi-truck",
        };
      },


      reportedSales() {
        return {
          id: 5,
          title: 'Reported',
        //   value: this.sales.filter(i => i.confirmation == 'reporter').length,
          value: this.filterByStatus('reporter').length,
          color: 'deep-purple-accent-2',
          icon: 'mdi mdi-clock-outline'
        }
      },

      canceledSales() {
        return {
          id: 6,
          title: 'Canceled',
        //   value: this.sales.filter(i => i.confirmation == 'annuler').length,
          value: this.filterByStatus('annuler').length,
          color: 'red-accent-3',
          icon: 'mdi mdi-cancel'
        }
      },
      earningsDash() {
        return {
          id: 2,
          title: "Earnings",
        //   value: this.sales.filter((i) => i.confirmation == "livre").length,
          value: this.earnings,
          color: "primary-green",
          icon: "mdi-currency-usd",
        }
      },
      earnings() {
        return this.orders.reduce(
          (s,o) => {
            if(o.factorisations == null) {
              return s;
            }
            
            if(!o.factorisations.paid && !o.factorisations.close) {
              return s + o.factorisations.price
            }
            return s
          }, 0
        )
      },
    },

    methods: {

      filterByStatus(value) {
        return this.orders.filter(o => o.delivery == value)
      },


      getOrders() {
        this.isLoaded = false;
        Dashboard.delivery()
        .then(
          res => {
            if(res.data.code == 'SUCCESS') {
              this.orders = res.data.data.orders
            }
          }
        )
        .finally(
          () => {
            this.isLoaded = true
          }
        )
      },
    },

    mounted() {
      this.getOrders();
    }
}
</script>

<style>

</style>