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
            fullTabs: [
                {
                    id: 1,
                    name: 'Stock Alert',
                    component: 'StockAlertView',
                    permissions: ['admin']
                },
                {
                    id: 2,
                    name: 'Deliveries',
                    component: 'ReportedDelivery',
                    permissions: ['admin..', 'delivery']
                },
                {
                    id: 3,
                    name: 'Confirmations',
                    component: 'ReportedConfirmation',
                    permissions: ['admin..', 'agente']
                }
            ]
        }
    },

    computed: {
        tabs() {
            return this.fullTabs.filter(i => i.permissions.includes(this.user.role))
        },
        tabName() {
            return this.$route.params.tab
        },
        user() {
            return this.$store.getters['user/user']
        }
    },

    watch: {
        tabName() {
            this.handleChange()
        }
    },

    methods: {
        handleChange() {
            switch (this.tabName) {
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
                    this.tab = this.tabs[0].id || 1
                break;
            }
        }
    },

    mounted() {
        this.handleChange()

            
    }
}
</script>

<style>

</style>