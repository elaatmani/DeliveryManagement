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

      <div class="tw-w-fit tw-h-[24px] tw-flex tw-items-center tw-justify-center tw-px-1 tw-bg-orange-500 tw-text-sm tw-text-white tw-rounded tw-ml-2">
        <v-icon v-if="!fetched" color="white" class="tw-animate-spin" size="x-small">mdi-loading</v-icon>
        <p v-if="fetched" class="tw-text-xs">{{ l.id == 1 ? (orders.length - deliveredOrders.length) : deliveredOrders.length }}</p>
      </div>
    </div>
  </v-list-item>
</div>
</template>

<script>
import { localUrl } from '@/config/config'
import Dashboard from '@/api/Dashboard';

export default {
  props: [],

  data() {
    return {
        localUrl,
        isActive: false,
        isLoaded: false,
        link: {
        id: 7,
        module: 'delivery',
        title: 'Orders',
        hasChildren: false,
        gate: 'access_to_delivery', 
        icon: {
            type: 'icon',
            value: 'mdi-bike'
        },
        children: [
            {
                id: 1,
                title: 'Orders',
                subModule: 'delivery/list',
                gate: 'show_all_deliveries',
                to: '/deliveries',
                icon: 'mdi-truck'
            },
            {
                id: 2,
                title: 'Delivered Orders',
                subModule: 'delivery/delivered',
                gate: 'show_all_deliveries',
                to: '/delivered',
                icon: 'mdi-truck-check'
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
    getOrders() {
        this.isLoaded = false
        return Dashboard.delivery().then(
          res => {
            if (res?.data.code == "SUCCESS") {
              const orders = res.data.data.orders
              this.$store.dispatch('order/setAllOrders', orders)
              this.$store.dispatch('order/setFetched', true)
              this.isLoaded = true
            }
            console.log(res);
          }
        ).catch(this.$handleApiError)
      },
  },

  computed: {
    allowedChildren() {
      // return this.link?.children
      return this.link?.children.filter((item) => this.$can(item.gate) || item.gate === 'all')
    },
    orders() {
        return this.$store.getters['order/allOrders'].filter(o => o.confirmation == 'confirmer')
      },
      deliveredOrders() {
        return this.orders.filter(o => o.delivery == 'livrer');
      },
      fetched() {
        return this.$store.getters['order/fetched']
      }
  },

  watch: {
    $route() {
      this.isActive = this.isLinkActive()
    }
  },

  mounted() {
    this.isActive = this.isLinkActive();
    if(this.$can(this.link.gate)) {
      this.getOrders();
    }
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