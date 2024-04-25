<template>
  <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
    <label
      for="countries"
      class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
      >Product</label
    >
    <vue-select :reduce="(o) => o.id" @option:selected="e=> $emit('update', { ...filters, product_id: e.id })"  :clearable="false" class="tw-bg-gray-50 tw-border-solid tw-outline-none  tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full"
        placeholder="All" :value="filters.product_id" :options="products" label="name">
      </vue-select>

    <select
     v-if="false"
      @change="
        (e) => $emit('update', { ...filters, product_id: e.target.value })
      "
      :value="filters.product_id"
      class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
    >
      <option value="all">All</option>
      <option
        :value="p.id"
        class="tw-capitalize"
        v-for="p in products"
        :key="p.id"
      >
        {{ p.name }}
      </option>
    </select>
  </div>
</template>

<script>
import Product from '@/api/Product';
import vueSelect from 'vue-select';

export default {

  components: {
    'vue-select': vueSelect
  },

    props: {
        filters: {
            required: true,
        }
    },

    data() {
        return {
          products: [{id: 'all', name: "All"}],
          fetched: false
        }
    },

    computed: {
    },

    methods: {
        getProducts() {
            return Product.allForOrder().then(
            (res) => {
                if (res.data.code == "SUCCESS") {
                    this.products.push(...res.data.data.products);
                    this.fetched = true;
                  }
                },
                (err) => {
                this.$handleApiError(err);
                }
            );
        }
    },

    mounted() {
        this.getProducts();
    }
}
</script>

<style>
</style>