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

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

    <div class="tw-grid tw-mb-5 tw-grid-cols-4 md:tw-grid-cols-4 lg:tw-grid-cols-4 tw-gap-2">

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
                <DashItemTwo :dash="newSales" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
                <DashItemTwo :dash="toProcess" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
                <DashItemTwo :dash="confirmedSales" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-2 tw-col-span-4">
                <DashItemTwo :dash="deliveredSales" />
          </div>


          <!-- <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-5">
                <DashItemTwo :dash="shippedSales" />
          </div> -->

        </div>

        <v-row v-if="isAdmin">
            <v-col cols="12" md="12">
                <UsersTable />
            </v-col>
        </v-row>
  </div>
    </div>
</template>

<script>
// import DashItem from '@/views/dashboard/partials/DashItem'
import DashItemTwo from '@/views/dashboard/partials/DashItemTwo'
// import DashItemFilled from '@/views/dashboard/partials/DashItemFilled'
import UsersTable from '@/views/dashboard/partials/UsersTable'
import Sale from '@/api/Sale'

export default {
    components: {  DashItemTwo, UsersTable },

    data() {
        return {
            isLoaded: false,
            dashItems: [
                {
                    id: 1,
                    title: 'Orders',
                    value: 1200,
                    icon: 'mdi-package-variant-closed',
                    color: 'orange'
                },
                {
                    id: 2,
                    title: 'Total Sales',
                    value: '35000 DH',
                    icon: 'mdi-currency-usd',
                    color: 'green'
                },
                {
                    id: 3,
                    title: 'Orders Confirmed',
                    value: 600,
                    icon: 'mdi-phone-check-outline',
                    color: 'blue'
                },
                {
                    id: 4,
                    title: 'Orders Delivered',
                    value: 543,
                    icon: 'mdi-truck-check-outline',
                    color: 'pink'
                },
                
            ],

            filledDashItems: [

                {
                    id: 1,
                    title: 'Customers',
                    value: 2300,
                    color: 'primary-orange',
                    icon: 'mdi-account-outline'
                },

                {
                    id: 2,
                    title: 'Suppliers',
                    value: 300,
                    color: 'primary-blue',
                    icon: 'mdi-account-check-outline'
                },

                {
                    id: 3,
                    title: 'Purchase Invoice',
                    value: 1100,
                    color: 'primary-indigo',
                    icon: 'mdi-file-document-outline'
                },

                {
                    id: 4,
                    title: 'Agents',
                    value: 10,
                    color: 'primary-green',
                    icon: 'mdi-moped-outline'
                },
            ]
        }
    },
    computed: {
        user() {
            return this.$store.getters['user/user']
        },
        isAdmin() {
            return this.user.role == "admin"
        },
        sales() {
        return this.$store.getters['sale/sales']
        },
        newSales() {
        return {
            id: 1,
            title: 'New',
            value: this.sales.filter(i => !i.confirmation).length,
            // value: 35,
            color: 'primary-green',
            icon: 'mdi mdi-new-box'
        }
        },
        toProcess() {
        return {
            id: 2,
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
        confirmedSales() {
        return {
            id: 3,
            title: 'Confirmed',
            value: this.sales.filter(i => i.confirmation == 'confirmer').length,
            // value: 112,
            color: 'deep-purple-accent-2',
            icon: 'mdi-phone-check'
        }
        },
        deliveredSales() {
        return {
            id: 4,
            title: 'Delivered',
            value: this.sales.filter(i => i.confirmation == 'livre').length,
            // value: 412,
            color: 'primary-blue',
            icon: 'mdi-account-check-outline'
        }
        },
        shippedSales() {
        return {
            id: 5,
            title: 'Shipped',
            value: this.sales.filter(i => i.confirmation == 'expidier').length,
            // value: 112,
            color: 'red',
            icon: 'mdi-truck'
        }
        },
    },
    mounted() {
        Sale.all().then(
        res => {
            if(res?.data.code == "SUCCESS") {
                const sales = res.data.data.orders
                console.log(res.data);
                this.$store.dispatch('sale/setSales', sales)
                this.$store.dispatch('sale/setFetched', true)
                this.isLoaded = true
            }
            }
            ).catch(this.$handleApiError)
    }
}
</script>

<style>

</style>