<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Orders</h1>
      </div>
    </div>

    <div v-if="!isLoaded">
          <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div v-if="orders.length > 0" class="tw-grid tw-grid-cols-12 tw-gap-5">
        <div v-for="order in filteredOrders" :key="order.id" class="tw-col-span-12 md:tw-col-span-4">
          <OrderCard :order="order" :key="order.id" />
        </div>
        
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
import OrderCard from './partials/OrderCard.vue'
import { deliveryStatus } from '@/config/orders'

export default {
  components: { OrderCard },
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
    }
  },
  computed: {
    orders() {
      return  this.$store.getters['order/orders'].filter(o => o.delivery != 'livrer')
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