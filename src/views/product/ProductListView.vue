<template>
  <div :key="products.length">
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Product List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Manage your products</h2>
      </div>
      <div v-if="$can('product_create')">
        <v-btn color="primary-color" link :to="{name: 'product/add'}" variant="flat" class="text-capitalize">
          <v-icon icon="mdi-plus" class="mr-2 text-white "></v-icon>
          <span class="text-white">
            Add Product
          </span>
        </v-btn>
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

      <div class="">
        <DataTable :rows="products" :columns="columns" />
      </div>
    </div>
  </div>
</template>

<script>
import { VGridVueTemplate } from '@revolist/vue3-datagrid';
import {localUrl} from '@/config/config'

import MyVue from '@/views/product/ProductActions.vue';
import ProductStatus from './ProductStatus.vue';
import DataTable from '@/components/DataTable'
import Product from '@/api/Product';


export default {
  components: { DataTable },
  data() {
    return {
      localUrl,
      isLoaded: false,
      columns: 
      [
        {
            prop: 'id',
            name: '#',
            size: 50,
            // sortable: true,
            filter: false,
        },
        {
            prop: "name",
            name: "Name",
            size: 200,
            filter: 'name'
        },
        {
          prop: 'buying_price',
          name: 'Price',
          filter: 'number',
        },
        {
          prop: 'size',
          name: 'Size',
          size: 150,
          filter: 'number'
        },
        {
            prop: 'color',
            name: 'Color',
            filter: 'name',
            size: 150,
            cellTemplatep: VGridVueTemplate(ProductStatus)
        },
        {
            prop: "quantity",
            name: "Qty",
            columnType: 'numeric',
            sortable: false,
            filter: 'number',
            size: 90
        },
        {
            name: 'Acions',
            prop: 'product',
            cellTemplate: VGridVueTemplate(MyVue),
            size: 130,
            filter: false
        }
    ]
    }
  },
  computed: {
    products() {
      return this.$store.getters['product/products'];
    }
  },
  mounted() {
    Product.all()
    .then(
      res => {
        if (res.data.code == 'SUCCESS') {
          this.$store.dispatch('product/setProducts', res.data.data.products)
        }
        
      },
      err => {
        this.$handleApiError(err)
      }
    ).finally(() => this.isLoaded = true);
  }
}
</script>

<style>
</style>