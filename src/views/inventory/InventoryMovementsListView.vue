<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Inventory State List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">See your inventory state</h2>
      </div>
    </div>

    <div v-if="!isLoaded">
          <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div class="mb-5 tw-flex">
        <v-btn icon rounded="lg" variant="flat" size="small" color="primary-color" class="text-white !tw-w-0 !tw-overflow-hidden">
          <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
        </v-btn>
        <div class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
          <v-img width="18" height="18" max-width="18" class="ma-0 pa-0" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          <input v-model="search" type="text" class="ml-2 tw-border-0 tw-w-full tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by name">
        </div>
      </div>

      <div v-if="inventoryMovements.length > 0" class="">
        <InventoryMovementsTable :columns="columns" :movements="inventoryMovements" />
      </div>
    </div>
  </div>
</template>

<script>
import {localUrl} from '@/config/config'
import Inventory from '@/api/Inventory'
import InventoryMovementsTable from './partials/InventoryMovementsTable.vue'
export default {
    components: { InventoryMovementsTable },
  data() {
    return {
      localUrl,
      isLoaded: false,
      showFilters: false,
      search: '',
      columns: 
      [
        {
            prop: 'id',
            name: '#',
        },
        {
            prop: "delivery",
            name: "Delivery",
        },
        {
          prop: 'product',
          name: 'Product',
        },
        {
          prop: 'quantity',
          name: 'Quantity',
        },
        {
          prop: 'city',
          name: 'City',
        },
        {
          prop: 'created_at',
          name: 'Date',
        },
        {
          prop: 'actions',
          name: 'Actions',
        },
        
    ],
    }
  },
  computed: {
    inventoryMovements() {
      return this.$store.getters['inventory/inventoryMovements']
    },
    filteredInventoryState() {
      return this.inventoryMovements.filter(() => {

        // if(
        //   !item.product.ref.toLowerCase().includes(this.search.toLowerCase()) 
        //   && !item.product.name.toLowerCase().includes(this.search.toLowerCase())
        //   && !item.product.description.toLowerCase().includes(this.search.toLowerCase())
        
        // ) {
        //   return false;
        // }

        return true;
      })
    }
  },
  methods: {
    async getInventoryMovements() {
      
        
        await Inventory.inventoryMovements()
        .then(
            res => {
                console.log(res.data.data);
                if (res.data.code == 'SHOW_ALL_INVENTORY_MOVEMENTS') {
                    const movements = res.data.data
                    this.$store.dispatch('inventory/setInventoryMovements', movements)
                    console.log(movements);
                }
            },
            this.$handleApiError
        ).finally(() => {
            this.isLoaded = true
        })
    }
  },
  async mounted() {
    this.getInventoryMovements()
  }
}
</script>

<style>
</style>