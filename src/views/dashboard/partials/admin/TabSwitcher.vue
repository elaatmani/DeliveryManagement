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
        <component :is="t.component" :filtered-sales="filteredSales"></component>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import DeliveryTab from '@/views/dashboard/partials/admin/DeliveryTab'
import ConfirmationTab from '@/views/dashboard/partials/admin/ConfirmationTab'

export default {
    components: {DeliveryTab, ConfirmationTab},
    props: ['filteredSales'],
    data() {
        return {
            tab: 1,
            tabs: [
                {
                    id: 1,
                    name: 'Confirmation',
                    component: 'ConfirmationTab'
                },
                {
                    id: 2,
                    name: 'Delivery',
                    component: 'DeliveryTab'
                }
            ]
        }
    }
}
</script>

<style>

</style>