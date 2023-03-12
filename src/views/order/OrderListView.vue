<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">My Orders</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">See orders affected to you</h2>
      </div>
    </div>

    <div v-if="!isLoaded">
          <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div class="mb-5 tw-flex">
        <v-btn icon rounded="lg" variant="flat" size="small" color="primary-color" class="text-white">
          <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
        </v-btn>
        <div class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
          <v-img width="18" height="18" max-width="18" class="ma-0 pa-0" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          <input type="text" class="ml-2 tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by name">
        </div>
      </div>

      <div v-if="orders.length > 0">
        <OrdersTable :columns="columns" :orders="orders" />
      </div>

      <div v-else class="">
        <p class="tw-text-neutral-400 tw-py-5">Your order liste is empty !</p>
      </div>
    </div>
  </div>
</template>

<script>
import {localUrl} from '@/config/config'

import OrdersTable from './partials/OrdersTable.vue'
import Sale from '@/api/Sale'


export default {
  components: {  OrdersTable },
  data() {
    return {
      localUrl,
      isLoaded: false,
      orders: [],
      columns: 
      [
        {
            prop: 'id',
            name: '#',
        },
        {
            prop: "client",
            name: "Client",
        },
        {
          prop: 'product',
          name: 'Product',
        },
        {
          prop: 'upsell',
          name: 'Upsell',
        },
        {
          prop: 'confirmation',
          name: 'Confirmation',
        },
        {
          prop: 'affectation',
          name: 'Affecté',
        },
        {
            prop: "quantity",
            name: "Qty",
        },
        {
            prop: 'price',
            name: 'Price',
        },
        {
            prop: 'city',
            name: 'City',
        },
        {
            prop: 'date',
            name: 'Date',
        },
        
    ],
    }
  },
  computed: {},
  mounted() {
    
    
    Sale.agenteOrders().then(
      res => {
        if(res?.data.code == "SUCCESS") {
            this.orders = res.data.data.orders
            console.log(res.data);
            this.isLoaded = true
          }
        }
        ).catch(this.$handleApiError)
  }
}
</script>

<style>
</style>