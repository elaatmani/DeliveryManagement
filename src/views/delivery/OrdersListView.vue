<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Orders List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Orders need to be delivered</h2>
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

      <div v-if="orders.length > 0" class="">
        <OrdersTable :columns="columns" :orders="orders" />
      </div>
      <div v-else>
        <div class="tw-min-h-[400px] tw-flex tw-flex-col tw-justify-center tw-items-center">
          <p class="tw-font-medium tw-text-neutral-400 tw-text-lg tw-mb-n3">No Confirmed orders for now.</p>
          <img :src="localUrl + 'images/delivery.jpg'" class="tw-mt-0 tw-mx-auto tw-max-w-[600px] tw-w-full" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sale from '@/api/Sale'
import { localUrl } from '@/config/config'
import OrdersTable from './partials/OrdersTable.vue'

export default {
  components: { OrdersTable },
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
          prop: 'address',
          name: 'Address',
        },
        {
          prop: 'phone',
          name: 'Phone',
        },
        {
          prop: 'product',
          name: 'Product',
        },
        {
          prop: 'delivery',
          name: 'Delivery'
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
            prop: 'note',
            name: 'Note',
        },
        {
            prop: 'date',
            name: 'Date',
        },
        
    ],
    }
  },
  methods: {
    getOrders() {
      Sale.deliveryOrders()
      .then(
        res => {
          console.log(res.data);
          this.orders = res.data.data.orders
          this.isLoaded = true
        },
        this.$handleApiError
      )
    }
  },
  mounted() {
    this.getOrders()
  }
}
</script>

<style>

</style>