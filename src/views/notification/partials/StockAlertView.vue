<template>
  <div>
    <ProductsTable :columns="columns" :products="products" />
  </div>
</template>

<script>
import ProductsTable from "@/views/product/ProductsTable";

export default {
  components: { ProductsTable },

  data() {
    return {
      columns: [
        {
          prop: "id",
          name: "#",
        },
        {
          prop: "ref",
          name: "Ref",
        },
        {
          prop: "name",
          name: "Name",
        },
        {
          prop: "buying_price",
          name: "Buying Price",
        },
        {
          prop: "selling_price",
          name: "Selling Price",
        },
        {
          prop: "quantity",
          name: "Qty",
        },
        {
          prop: "created_at",
          name: "Created at",
        },
        {
          prop: "actions",
          name: "Actions",
        },
      ],
    };
  },
  computed: {
    products() {
      return (
        this.$store.getters["notification/notifications"][
          "productStockAlert"
        ] || []
      );
    },
    fetched() {
      return this.$store.getters["notification/fetched"];
    },
  },
};
</script>

<style>
</style>