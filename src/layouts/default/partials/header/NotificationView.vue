<template>
  <div v-click-outside="closeMenu" class="tw-relative">
    <v-btn @click="toggleMenu" icon width="35" height="35" class="tw-relative">
            <v-img width="22" height="22" :src="localUrl + 'assets/img/icons/notification-bing.svg'"></v-img>
            
            <div class="tw-absolute tw-border-2 tw-border-solid tw-border-white tw-top-1 tw-right-1 tw-w-3 tw-h-3 tw-rounded-full tw-bg-red-500">

            </div>
            <!-- <v-badge class="tw-animate-bounce" floating offset-y="-10" offset-x="5" color="red" :bordered=true location="bottom right" dot></v-badge> -->
    </v-btn>
        <!-- <v-btn :ripple="false" class="mr-2" icon>
            <v-img width="22" height="22" :src="localUrl + 'assets/img/icons/notification-bing.svg'"></v-img>
          </v-btn> -->


    <v-fade-transition>
    <div v-if="isActive" class="!tw-duration-100">
        <div  class="tw-absolute tw-text-sm tw-bg-white tw-rounded-md tw-bordesr !tw-shadow-lg !tw-shadow-gray-400/10 tw-top-14 tw-right-0 tw-w-[230px] tw-min-h-[50px]">
            <p class="tw-p-2 tw-text-sm">Notifications</p>
            <div class="tw-p-2 tw-border-y tw-flex tw-gap-2 tw-items-start tw-border-neutral-100">
                <v-icon class="tw-mt-1 tw-text-neutral-400" size="x-small">mdi-alert-outline</v-icon>
                <div>
                    <p class="">Iphone 14</p>
                    <p class="tw-text-red-400 tw-text-xs">Stock alert: 5 left</p>
                </div>
            </div>
            <div class="tw-p-2 tw-border-y tw-flex tw-gap-2 tw-items-start tw-border-neutral-100">
                <v-icon class="tw-mt-1 tw-text-neutral-400" size="x-small">mdi-autorenew</v-icon>
                <div>
                    <p class="">Jack Sparow</p>
                    <p class="tw-text-orange-500 tw-text-xs">Order reported: today</p>
                </div>
            </div>
            <div class="tw-p-2 tw-border-y tw-flex tw-gap-2 tw-items-start tw-border-neutral-100">
                <v-icon class="tw-mt-1 tw-text-neutral-400" size="x-small">mdi-autorenew</v-icon>
                <div>
                    <p class="">Jack Sparow</p>
                    <p class="tw-text-orange-500 tw-text-xs">Order reported: today</p>
                </div>
            </div>
        </div>
    </div>
    </v-fade-transition>
  </div>
</template>

<script>
import { localUrl } from '@/config/config'
import User from '@/api/User'

export default {
    data() {
        return {
            localUrl,
            isActive: false,
            loginOut: false
        }
    },

    methods: {
        toggleMenu() {
            this.isActive = !this.isActive
        },

        closeMenu() {
            this.isActive = false
        },

        logout() {
            this.loginOut = true
            User.logout()
            .then(
                () => {
                    this.$store.dispatch('user/logout')
                    this.$router.push('/login')
            }).finally(() => {
                this.loginOut = false
            })
        }
    },

    computed: {
        user() {
            return this.$store.getters['user/user']
        }
    }
}
</script>

<style>

</style>