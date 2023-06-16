<template>
  <div>
    <span class="tw-text-sm tw-text-neutral-600">Product</span>
    <div v-if="!fetched">
        <div>
            <v-icon class="tw-text-orange-500 tw-animate-spin tw-text-lg tw-">mdi-loading</v-icon>
        </div>
    </div>
    <div v-if="fetched" class="tw-relative">
      <select
        v-model="productFilter"
        class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200 tw-outline-0 tw-text-sm"
      >
        <option value="all">Select</option>
        <option :value="product.id" :key="product.id" v-for="product in products">
          {{ product.name }}
        </option>
      </select>
      <v-icon
        class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2"
        >mdi-chevron-down</v-icon
      >
    </div>
  </div>
</template>

<script>
import Product from '@/api/Product';
export default {
  props: ["filter"],

  data() {
    return {
      productFilter: "all",
    };
  },

  computed: {
    products() {
      return this.$store.getters["product/products"];
    },
    fetched() {
      return this.$store.getters["product/fetched"];
    },

  },

  watch: {
    productFilter(v) {
      this.$emit("update:filter", v);
    },
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
    console.log(this.products);
  }
};
</script>

<style>
</style>