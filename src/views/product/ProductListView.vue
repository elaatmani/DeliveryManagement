<template>
  <div :key="products.length">
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Product List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Manage your products</h2>
      </div>
      <div v-if="$can('create_product')">
        <v-btn color="primary-color" link :to="{name: 'product/add'}" variant="flat" class="text-capitalize">
          <v-icon icon="mdi-plus" class="mr-2 text-white "></v-icon>
          <span class="text-white">
            Add Product
          </span>
        </v-btn>
      </div>
    </div>

    <div v-if="!fetched">
          <LoadingAnimation />
    </div>

    <div v-if="fetched" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

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
          

          <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit"> 
            <span class="tw-text-sm tw-text-neutral-600">Date</span>
            <div class="tw-relative">
              <input type="date" v-model="date" class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm" />
            </div>
          </div>
        </div>
      </div>

      <div class="">
        <ProductsTable :columns="columns" :products="filteredProducts" />
      </div>
    </div>
  </div>
</template>

<script>
import {localUrl} from '@/config/config'

import Product from '@/api/Product';
import ProductsTable from './ProductsTable.vue'
import { confirmations } from '@/config/orders';

export default {
  components: {  ProductsTable },
  data() {
    return {
      localUrl,
      confirmations,
      showFilters: false,
      date: null,
      search: '',
      columns: 
      [
        {
            prop: 'id',
            name: '#',
        },
        {
            prop: 'ref',
            name: 'Ref',
        },
        {
            prop: "name",
            name: "Name",
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
            prop: "quantity",
            name: "Qty",
        },
        {
            prop: 'created_at',
            name: 'Created at',
        },
        {
            prop: 'actions',
            name: 'Actions',
        },
        
    ],
    }
  },
  computed: {

    products() {
      return this.$store.getters['product/products'];
    },

    fetched() {
      return this.$store.getters['product/fetched']
    },

    filteredProducts() {
      const date = this.date;
      
      return this.products.filter(item => {
        // filter by confirmation
        if (!!date  && item?.created_at.split('T')[0] !== date) {
          return false;
        }

        if(
          !item.ref.toLowerCase().includes(this.search.toLowerCase()) 
          && !item.name.toLowerCase().includes(this.search.toLowerCase())
          && !item.description.toLowerCase().includes(this.search.toLowerCase())
        
        ) {
          return false;
        }
        

        // if item passes all filters, include it in the filtered data
        return true;
      });
    }
  },
  methods: {
    getProducts() {
      Product.all()
      .then(
        res => {
          if (res.data.code == 'SUCCESS') {
            this.$store.dispatch('product/setProducts', res.data.data.products)
            this.$store.dispatch('product/setFetched', true)
          }
          
        },
        err => {
          this.$handleApiError(err)
        }
      )
    }
  },
  mounted() {
    if(!this.fetched) {
      this.getProducts();
    }
  }
}
</script>

<style>
</style>