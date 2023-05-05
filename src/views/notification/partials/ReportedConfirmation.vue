<template>
  <div v-if="fetched">
    <SalesTable :key="sales.length" :columns="columns" :sales="sales" />
  </div>
</template>

<script>
import SalesTable from "@/views/sale/SalesTable";
export default {
  components: { SalesTable },

  data() {
    return {
      columns: [
        {
          prop: "id",
          name: "#",
        },
        {
          prop: "city",
          name: "City",
        },
        {
          prop: "date",
          name: "Date",
        },
        {
          prop: "client",
          name: "Client",
        },
        {
          prop: "product",
          name: "Product",
        },
        {
          prop: "upsell",
          name: "Upsell",
        },
        {
          prop: "confirmation",
          name: "Confirmation",
        },
        {
          prop: "affectation",
          name: "Affected",
        },
        {
          prop: "delivery",
          name: "Delivery",
        },
        {
          prop: "quantity",
          name: "Qty",
        },
        {
          prop: "price",
          name: "Price",
        },

        {
          prop: "actions",
          name: "Actions",
        },
      ],
    };
  },

  computed: {
    sales() {
      return (
        this.$store.getters["notification/notifications"][
          "reportedOrderAgente"
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