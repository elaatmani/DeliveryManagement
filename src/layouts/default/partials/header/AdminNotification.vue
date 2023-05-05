<template>
  <div v-click-outside="closeMenu" class="tw-relative">
    <v-btn @click="toggleMenu" icon width="35" height="35" class="tw-relative">
            <v-img width="22" height="22" :src="localUrl + 'assets/img/icons/notification-bing.svg'"></v-img>
            
            <div v-if="stockAlert || reportedDeliveries || reportedConfirmations" class="tw-absolute tw-border-2 tw-border-solid tw-border-white tw-top-1 tw-right-1 tw-w-3 tw-h-3 tw-rounded-full tw-bg-red-500">

            </div>
            <!-- <v-badge class="tw-animate-bounce" floating offset-y="-10" offset-x="5" color="red" :bordered=true location="bottom right" dot></v-badge> -->
    </v-btn>
        <!-- <v-btn :ripple="false" class="mr-2" icon>
            <v-img width="22" height="22" :src="localUrl + 'assets/img/icons/notification-bing.svg'"></v-img>
          </v-btn> -->


    <v-fade-transition>
    <div v-if="isActive" class="!tw-duration-100">
        <div  class="tw-absolute tw-text-sm tw-bg-white tw-border tw-border-solid tw-border-neutral-200 tw-rounded-md tw-bordesr !tw-shadow-lg !tw-shadow-gray-400/10 tw-top-14 tw-right-0 tw-w-[230px] tw-min-h-[50px]">
            <p class="tw-p-2 tw-text-sm">Notifications</p>
            <div v-if="!isLoaded">
                <div class="tw-py-10 tw-flex tw-items-center tw-justify-center">
                    <v-icon size="large" class="tw-animate-spin" color="primary-color">mdi-loading</v-icon>
                </div>
            </div>
            <div v-if="isLoaded">
            <router-link to="/notifications/stock" class="hover:tw-bg-black/5 tw-p-2 tw-border-y tw-flex tw-gap-2 tw-items-start tw-border-neutral-100">
                <v-icon class="tw-mt-1 tw-text-neutral-400" size="x-small">mdi-alert-outline</v-icon>
                <div>
                    <p class="">Stock Alert</p>
                    <p :class="[stockAlert.length > 0 ? 'tw-text-red-400 ' : 'tw-text-green-400 ']" class="tw-text-xs">{{ stockAlert.length }} {{stockAlert.length > 1 ? 'products' : 'product'}}</p>
                </div>
            </router-link>
            <router-link to="/notifications/delivery" class="hover:tw-bg-black/5 tw-p-2 tw-border-y tw-flex tw-gap-2 tw-items-start tw-border-neutral-100">
                <v-icon class="tw-mt-1 tw-text-neutral-400" size="x-small">mdi-autorenew</v-icon>
                <div>
                    <p class="">Delivery Reported</p>
                    <p :class="[reportedDeliveries.length > 0 ? 'tw-text-red-400 ' : 'tw-text-green-400 ']" class="tw-text-xs">{{ reportedDeliveries.length }} today</p>
                </div>
            </router-link>
            <router-link to="/notifications/confirmation" class="hover:tw-bg-black/5 tw-p-2 tw-border-y tw-flex tw-gap-2 tw-items-start tw-border-neutral-100">
                <v-icon class="tw-mt-1 tw-text-neutral-400" size="x-small">mdi-autorenew</v-icon>
                <div>
                    <p class="">Confirmation Reported</p>
                    <p :class="[reportedConfirmations.length > 0 ? 'tw-text-red-400 ' : 'tw-text-green-400 ']" class="tw-text-xs">{{ reportedConfirmations.length }} today</p>
                </div>
            </router-link>
            </div>
        </div>
    </div>
    </v-fade-transition>
  </div>
</template>

<script>
import { localUrl } from '@/config/config'
import Notification from '@/api/Notification'

export default {
    data() {
        return {
            localUrl,
            isActive: false,
            isLoaded: false,
        }
    },

    methods: {
        toggleMenu() {
            this.isActive = !this.isActive
        },

        closeMenu() {
            this.isActive = false
        },

        getNotifications() {
            Notification.all()
            .then(
                res => {
                    if(res.data.code == 'SUCCESS') {
                        console.log('success');
                        this.$store.dispatch('notification/setNotifications', res.data.data)
                        this.$store.dispatch('notification/setFetched', true)
                    }
                },
                this.$handleApiError
            )
            .finally(
                () => {
                    this.isLoaded = true;
                }
            )
        }
    },

    computed: {
        user() {
            return this.$store.getters['user/user']
        },
        notifications() {
            return this.$store.getters['notification/notifications']
        },

        stockAlert() {
            return this.notifications['productStockAlert'] || []
        },

        reportedConfirmations() {
            return this.notifications['reportedOrderAgente'] || []
        },

        reportedDeliveries() {
            return this.notifications['reportedOrderDelivery'] || []
        },


    },

    mounted() {
        this.getNotifications()
    }
}
</script>

<style>

</style>