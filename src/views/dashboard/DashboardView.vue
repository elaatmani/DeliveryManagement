<template>
  <div>

    <!-- First Section -->
    <v-row >
        <v-col
        cols="12" sm="6" md="3"
        v-for="dash in dashItems"
        :key="dash.id"
        >
            <DashItem :dash="dash" />
        </v-col>
    </v-row>
    <!-- /First Section -->

    <!-- Second Section -->
    <v-row >
        <v-col
        cols="12" sm="6" md="3"
        v-for="dash in filledDashItems"
        :key="dash.id"
        >
            <DashItemFilled :dash="dash" />
        </v-col>
    </v-row>
    <!-- /Second Section -->

    <div class="tw-min-h-[1000px]">

    </div>
  </div>
</template>

<script>
import { localUrl } from '@/config'
import DashItem from '@/views/dashboard/partials/DashItem'
import DashItemFilled from '@/views/dashboard/partials/DashItemFilled'

export default {
    components: { DashItem, DashItemFilled },

    data() {
        return {
            localUrl,
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
    }

}
</script>

<style>

</style>