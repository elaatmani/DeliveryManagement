<template>
  <v-card flat class="tw-p-1">
    <div class="tw-flex tw-items-ce tw-gap-1 tw-border-b tw-border-solid tw-border-neutral-200">
      <button
        v-for="t in tabs"
        :key="t.id"
          @click="tab = t.id"
          class="tw-px-4 tw-py-2 tw-rounded-t hover:tw-border-orange-500/50 tw-duration-300 tw-border tw-border-solid tw-border-neutral-200 tw-text-neutral-500 tw-border-b-0"
          :class="{'tw-bg-orange-500 !tw-text-white tw-border-transparent': t.id == tab}"
        >
          {{ t.name }}
        </button>
    </div>

    <v-tabs
      v-if="false"
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