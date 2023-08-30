<template>
  <div v-if="$can(link.gate) || link.gate == 'all'">
  
    <v-list-item
      class="mx-3 mb-2"
      :class="{ 'bg-secondary-color': $route.path == l.to }"
      @click="handleClick()"
      density="comfortable"
      :active="false"
      :ripple="false"
      :to="l.to"
      link
      v-for="l in link.children"
      :key="l.id"
    >
      <div class="d-flex align-center">
        <!-- Prepend Icon -->
        <v-icon
          :icon="l.icon"
          :color="$route.path == l.to ? 'white' : 'grey-darken-2'"
          class="mr-2"
          size="small"
        ></v-icon>
        <!-- /Prepend Icon -->
  
        <!-- Item Title -->
        <v-list-item-title
          class="text-body-2 font-weight-regular"
          :class="{'text-white': $route.path == l.to}"
          v-text="l.title"
        ></v-list-item-title>
        <!-- /Item Title -->
  
        <v-spacer></v-spacer>
  
        <div v-if="l.id != 1" class="tw-w-fit tw-h-[24px] tw-flex tw-items-center tw-justify-center tw-px-1 tw-bg-orange-500 tw-text-sm tw-text-white tw-rounded tw-ml-2">
          <v-icon v-if="!state.fetched" color="white" class="tw-animate-spin" size="x-small">mdi-loading</v-icon>
          <p v-if="state.fetched" class="tw-text-xs">{{ l.id == 4 ? (state.totalNotConfirmed) : state.totalConfirmed }}</p>
        </div>
        <div v-if="l.id == 1" class="tw-w-fit tw-h-[24px] tw-flex tw-items-center tw-justify-center tw-px-1 tw-bg-orange-500 tw-text-sm tw-text-white tw-rounded tw-ml-2">
          <v-icon v-if="!state.fetched" color="white" class="tw-animate-spin" size="x-small">mdi-loading</v-icon>
          <p v-if="state.fetched" class="tw-text-xs">{{ state.totalAvailable }}</p>
        </div>
      </div>
    </v-list-item>
  </div>
  </template>
  
  <script>
  import { localUrl } from '@/config/config'
  
  export default {
    props: [],
  
    data() {
      return {
          localUrl,
          isActive: false,
          isLoaded: false,
          link: {
          id: 6,
          module: 'order',
          title: 'Orders',
          hasChildren: true,
          gate: 'access_to_orders', 
          icon: {
              type: 'icon',
              value: 'mdi-barcode-scan'
          },
          children: [
              // {
              //     id: 1,
              //     title: 'Order',
              //     subModule: 'order/show',
              //     gate: 'show_all_orders',
              //     to: '/order',
              //     icon: 'mdi-plus-box'
              // },
              // {
              //     id: 2,
              //     title: 'My Orders',
              //     subModule: 'order/list',
              //     gate: 'show_all_orders',
              //     to: '/orders',
              //     icon: 'mdi-package-variant-closed'
              // },
              // {
              //     id: 3,
              //     title: 'Confirmed Orders',
              //     subModule: 'order/confirmed',
              //     gate: 'show_all_orders',
              //     to: '/orders/confirmed',
              //     icon: 'mdi-checkbox-marked'
              // },
              {
                  id: 1,
                  title: 'Add Order',
                  subModule: 'agent/orders/add',
                  gate: 'show_all_orders',
                  to: '/agent/orders/add',
                  icon: 'mdi-plus-box'
              },
              {
                  id: 4,
                  title: 'Orders',
                  subModule: 'agent/orders',
                  gate: 'show_all_orders',
                  to: '/agent/orders',
                  icon: 'mdi-package-variant-closed'
              },
              {
                  id: 5,
                  title: 'Confirmed Orders',
                  subModule: 'agent/orders/confirmed',
                  gate: 'show_all_orders',
                  to: '/agent/orders/confirmed',
                  icon: 'mdi-checkbox-marked'
              },
          ]
      },
      }
    },
  
    methods: {
      handleClick() {
        if(this.$route.path === this.link.to) {
          this.isActive = true
          return;
        }
  
        this.isActive = !this.isActive
      },
      isSublinkActive(sublink) {
        return this.$route.path == sublink.to
      },
      isLinkActive() {
        if(this.link.hasChildren) {
          return this.link.module == this.$route.meta.module
        } 
      
        return this.link.to === this.$route.path 
      },
    },
  
    computed: {
      allowedChildren() {
        // return this.link?.children
        return this.link?.children.filter((item) => this.$can(item.gate) || item.gate === 'all')
      },
      state() {
        return this.$store.getters['agent/state']
      },
      orders() {
          return this.$store.getters['order/allOrders']
        },
  
        myOrders() {
          return this.orders.filter(o => o.confirmation != 'confirmer')
        },
        confirmedOrders() {
          return this.orders.filter(o => o.confirmation == 'confirmer')
        },
        fetched() {
          return this.$store.getters['order/fetched']
        }
    },
  
    watch: {
      $route() {
        this.isActive = this.isLinkActive()
      },
    },
  
    mounted() {
      this.isActive = this.isLinkActive();
  
    }
  };
  </script>
  
  <style scoped>
  .active {
    filter: brightness(0) invert(1);
  }
  
  .item-icon {
    transform: rotate(0deg);
    transition: all 0.3s ease;
  }
  
  .activeRotate {
    transform: rotate(90deg);
  }
  
  </style>