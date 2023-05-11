<template>
  <v-card flat>
    <v-tabs
      v-model="tab"
      color="primary-color"
      align-tabs="start"
      density="compact"
    >
      <v-tab v-for="t in tabs" :key="t.id" :value="t.id">{{t.name}}</v-tab>
    </v-tabs>

    <v-window class="tw-mt-0" v-model="tab">
      <v-window-item
        v-for="t in tabs"
        :key="t.id"
        :value="t.id"
        transition="fade-transition"
        reverse-transition="fade-transition"
      >
        <ProductTrackingTable :product="product" :source="t.source" />
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import ProductTrackingTable from '@/views/product/ProductTrackingTable'
export default {
    components: {ProductTrackingTable},
    props: ['product'],
    data() {
        return {
            tab: 1,
            tabs: [
                {
                    id: 1,
                    name: 'Deliveries',
                    source: 'deliveries'
                },
                {
                    id: 2,
                    name: 'Warehouses',
                    source: 'warehouses'
                }
            ]
        }
    }
}
</script>

<style>

</style>