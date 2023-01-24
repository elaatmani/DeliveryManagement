<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Product List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Manage your products</h2>
      </div>
      <div>
        <v-btn color="primary-color" link :to="{name: 'product/add'}" variant="flat" class="text-capitalize">
          <v-icon icon="mdi-plus" class="mr-2 text-white "></v-icon>
          <span class="text-white">
            Add Product
          </span>
        </v-btn>
      </div>
    </div>
    <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div class="mb-5 tw-flex">
        <v-btn icon rounded="lg" variant="flat" size="small" color="primary-color" class="text-white">
          <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
        </v-btn>
        <div class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
          <v-img width="18" height="18" max-width="18" class="ma-0 pa-0" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          <input type="text" class="ml-2 tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search">
        </div>
      </div>

      <div class="">
        <DataTable :rows="rows" :columns="columns" />
      </div>
    </div>
  </div>
</template>

<script>
import { rows } from './config'
import { VGridVueTemplate } from '@revolist/vue3-datagrid';
import MyVue from '@/components/MyVue.vue';
import ProductStatus from './ProductStatus.vue';
import {localUrl} from '@/config/config'
import DataTable from '@/components/DataTable'


export default {
  components: { DataTable },
  data() {
    return {
      localUrl,
      columns: 
      [
        {
            prop: 'id',
            name: '#',
            size: 50,
            sortable: true,
            filter: false
        },
        {
            prop: "name",
            name: "Name",
            size: 200,
            filter: 'name'
        },
        {
          prop: 'sku',
          name: 'SKU',
          filter: 'name',
        },
        {
          prop: 'category',
          name: 'Category',
          size: 150,
          filter: 'name'
        },
        {
            prop: 'status',
            name: 'Status',
            filter: 'status',
            size: 150,
            cellTemplate: VGridVueTemplate(ProductStatus)
        },
        {
            prop: "price",
            name: "Price",
            filter: 'number',
            columnType: 'numeric',
        },
        {
            prop: "qty",
            name: "Qty",
            columnType: 'numeric',
            sortable: true,
            filter: 'number',
            size: 90
        },
        {
            name: 'Acions',
            prop: 'vue',
            cellTemplate: VGridVueTemplate(MyVue),
            size: 130,
            filter: false
        }
    ], 
      rows
    }
  },
  methods: {
    beforeFocus(e) {
      e.preventDefault();
    }
  }
}
</script>

<style>
</style>