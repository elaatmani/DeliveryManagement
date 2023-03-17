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
        <v-btn @click="showFilters = !showFilters" icon rounded="lg" variant="flat" size="small" color="primary-color" class="text-white">
          <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
        </v-btn>
        <div class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
          <v-img width="18" height="18" max-width="18" class="ma-0 pa-0" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          <input type="text" class="ml-2 tw-border-0 tw-w-full tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by name">
        </div>
      </div>
      <div class="tw-max-h-0 tw-duration-500 tw-overflow-hidden" :class="{'!tw-max-h-[500px]': showFilters}">
        <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-mb-4">
          <div class="tw-col-span-4 tw-h-fit"> 
            <span class="tw-text-sm tw-text-neutral-600">Product</span>
            <div class="focus-within:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-flex tw-items-center">
              <input type="text" class="ml-2 tw-w-fit tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by product">
            </div>
          </div>
          <div class="tw-col-span-4"> 
            <span class="tw-text-sm tw-text-neutral-600">Date</span>
            <div class="focus-within:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-flex tw-items-center">
              <input type="text" class="ml-2 tw-w-fit tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by date">
            </div>
          </div>
          <div class="tw-col-span-4 "> 
            <span class="tw-text-sm tw-text-neutral-600">Date</span>
            <div class="focus-within:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-flex tw-items-center">
              <input type="text" class="ml-2 tw-w-fit tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by name">
            </div>
          </div>
        </div>
      </div>
      <div v-if="states.length > 0" class="">
        <InventoryStateTable :columns="columns" :states="states" />
      </div>
    </div>
  </div>
</template>

<script>
import {localUrl} from '@/config/config'
import Inventory from '@/api/Inventory'
import InventoryStateTable from '@/views/inventory/partials/InventoryStateTable'


export default {
    components: { InventoryStateTable },
  data() {
    return {
      localUrl,
      isLoaded: false,
      showFilters: false,
      states: [],
      columns: 
      [
        {
            prop: 'id',
            name: '#',
        },
        {
            prop: "producy_name",
            name: "Product Name",
        },
        {
          prop: 'buying_price',
          name: 'Buying Price',
        },
        {
          prop: 'selling_price',
          name: 'Selling Price',
        },
        {
          prop: 'quantity',
          name: 'Quantity',
        },
        
    ],
    }
  },
  computed: {
  },
  methods: {
    async getInventoryStates() {
      
        
        await Inventory.inventoryStates()
        .then(
            res => {
                console.log(res.data.data);
                if (res.data.code == 'SHOW_ALL_INVENTORY_STATES') {
                    this.states = res.data.data
                }
            },
            this.$handleApiError
        ).finally(() => {
            this.isLoaded = true
        })
    }
  },
  async mounted() {
    this.getInventoryStates()
  }
}
</script>

<style>
</style>