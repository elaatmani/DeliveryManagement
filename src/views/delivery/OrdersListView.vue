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
        <v-btn @click="showFilters = !showFilters" icon rounded="lg" variant="flat" size="small" color="primary-color" class="text-white">
          <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
        </v-btn>
        <div class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
          <v-img width="18" height="18" max-width="18" class="ma-0 pa-0" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          <input v-model="search" type="text" class="ml-2 tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by name">
        </div>
      </div>

      <div class="tw-max-h-0 tw-duration-500 tw-overflow-hidden" :class="{'!tw-max-h-[500px]': showFilters}">
        <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-mb-4">
          <!-- <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit"> 
            <span class="tw-text-sm tw-text-neutral-600">Upsell</span>
            <div class="tw-relative">
              <select v-model="upsellFilter" class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                <option value="all">Select</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
              <v-icon class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
          </div> -->
          <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit"> 
            <span class="tw-text-sm tw-text-neutral-600">Delivery</span>
            <div class="tw-relative">
              <select v-model="deliveryFilter" class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                <option v-for="d in deliveryStatus" :key="d.id" :value="!d.value ? 'all' : d.value">{{ d.name }}</option>
              </select>
              <v-icon class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
          </div>
          <!-- <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit"> 
            <span class="tw-text-sm tw-text-neutral-600">Affecté</span>
            <div  class="tw-relative">
              <select v-model="affectationFilter" class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                <option value="all">Select</option>
                <option :value="delivery.id" :key="delivery.id" v-for="delivery in deliveries">
                  {{ delivery.firstname }} {{ delivery.lastname }}
                </option>
              </select>
              <v-icon class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
          </div> -->
        </div>
      </div>

      <div v-if="orders.length > 0" class="">
        <OrdersTable :columns="columns" :orders="filteredOrders" />
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
import { deliveryStatus } from '@/config/orders'

export default {
  components: { OrdersTable },
  data() {
    return {
      localUrl,
      deliveryStatus,
      isLoaded: false,

      showFilters: false,
      deliveryFilter: 'all',
      affectationFilter: 'all',
      upsellFilter: 'all',
      search: '',
      
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
  computed: {
    orders() {
      return  this.$store.getters['order/orders']
    },
    filteredOrders() {
      const deliveryFilter = this.deliveryFilter;

      return this.orders.filter(item => {
        // filter by confirmation
        if (deliveryFilter !== 'all' && item.delivery !== deliveryFilter) {
          return false;
        }

        if(!item.fullname.toLowerCase().includes(this.search.toLowerCase()) && !item.product_name.toLowerCase().includes(this.search.toLowerCase())) {
          return false;
        }
        
        // if item passes all filters, include it in the filtered data
        return true;
      });
    }
  },
  methods: {
    getOrders() {
      Sale.deliveryOrders()
      .then(
        res => {
          console.log(res.data);
          const orders = res.data.data.orders
          this.$store.dispatch('order/setOrders', orders)
          this.isLoaded = true
        },
        this.$handleApiError
      )
    }
  },
  mounted() {
    this.$store.dispatch('order/setOrders', [])
    this.getOrders()
  }
}
</script>

<style>

</style>