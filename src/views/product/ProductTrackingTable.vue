<template>
  <div class="tw-mt-5">
      <div class="tw-max-w-full tw-overflow-auto">
        <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
          <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
            <tr>
              <th
                v-for="column in [
                  'id',
                  'name',
                  'quantity',
                  'actions',
                ]"
                :class="[column == 'actions' && '!tw-w-[40px]']"
                :key="column"
                scope="col"
                class="tw-px-6 tw-py-3 text-truncate"
              >
                <div
                  class="tw-w-fit tw-flex tw-whitespace-nowrap tw-capitalize"
                >
                  {{ column }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <ProductTrackingRow 
            v-for="item in items"
            :item="item" 
            :key="item.id" 
            :source="source"
            />
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import ProductTrackingRow from '@/views/product/ProductTrackingRow'
export default {
    // source: ['warehouses', 'deliveries'];
    props: ['product', 'source'],

    components: {ProductTrackingRow},

    computed: {
        items() {
            return this.product.tracking[this.source]
            // console.log(this.source);
            // console.log(this.product.tracking['warehouses']);
            // return []
        }
    },

    methods: {
        
    },

    mounted() {
    }
};
</script>

<style>
</style>