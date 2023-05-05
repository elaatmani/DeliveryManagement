<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Notifications</h1>
      </div>

    </div>

    <div v-if="!true">
          <LoadingAnimation />
    </div>

    <div v-if="true" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
          <v-card flat>
            <v-tabs
            v-model="tab"
            color="primary-color"
            align-tabs="start"
            density="compact"
            
            >
            <v-tab v-for="t in tabs" class="!tw-capitalize !tw-text-neutral-600" :key="t.id" :value="t.id"><span class="!tw-capitalize">{{t.name}}</span></v-tab>
            </v-tabs>

            <v-window class="tw-mt-5" v-model="tab">
            <v-window-item
                v-for="t in tabs"
                :key="t.id"
                :value="t.id"
            >
                <component :is="t.component"></component>
            </v-window-item>
            </v-window>
        </v-card>
    </div>
  </div>
</template>

<script>
import ReportedConfirmation from '@/views/notification/partials/ReportedConfirmation'
import ReportedDelivery from '@/views/notification/partials/ReportedDelivery.vue'
import StockAlertView from '@/views/notification/partials/StockAlertView'

export default {
    components: {StockAlertView, ReportedDelivery, ReportedConfirmation},
    data() {
        return {
            tab: 1,
            tabs: [
                {
                    id: 1,
                    name: 'Stock Alert',
                    component: 'StockAlertView'
                },
                {
                    id: 2,
                    name: 'Deliveries',
                    component: 'ReportedDelivery'
                },
                {
                    id: 3,
                    name: 'Confirmations',
                    component: 'ReportedConfirmation'
                }
            ]
        }
    },

    mounted() {
        const tab = this.$route.params.tab

            switch (tab) {
                case 'stock':
                    this.tab = 1
                break;
                case 'delivery':
                    this.tab = 2
                break;
                case 'confirmation':
                    this.tab = 3
                break;
            
                default:
                    this.tab = 1
                break;
            }
    }
}
</script>

<style>

</style>