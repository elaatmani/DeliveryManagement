<template>
  <div v-click-outside="closeMenu" class="tw-relative">
    <v-btn @click="toggleMenu"  icon max-width="35" max-height="35">
        <v-avatar size="33">
            <v-img :src="localUrl + 'assets/img/profiles/avatar.webp'" ></v-img>
        </v-avatar>
        <v-badge floating offset-y="-10" offset-x="5" color="primary-green" :bordered=true location="bottom right" dot></v-badge>
    </v-btn>


    <v-fade-transition>
    <div v-if="isActive" class="!tw-duration-100">
        <div  class="tw-absolute tw-bg-white tw-rounded-md tw-bordesr !tw-shadow-lg !tw-shadow-gray-400/10 tw-top-14 tw-right-0 tw-w-[200px] tw-min-h-[50px]">
            <div class="pa-2 d-flex tw-items-center tw-gap-2 tw-border-b tw-border-b-neutral-100">
                <v-avatar size="35">
                    <v-img :src="localUrl + 'assets/img/profiles/avatar.webp'" ></v-img>
                </v-avatar>
                <div class="d-flex flex-column justify-center">
                    <div class="tw-text-sm tw-text-neutral-800">
                        Yassine El Aatmani
                    </div>
                    <div class="tw-text-xs tw-rounded-lg tw-text-green-500">
                        Admin
                    </div>
                </div>
            </div>

            <v-divider></v-divider>

            <div @click="closeMenu" class="d-flex tw-items-center tw-gap-2">
                <v-btn block class="justify-start" variant="text" color="gray" :ripple="false">
                    <v-icon class="mr-2 tw-text-neutral-700">
                        mdi-account-outline
                    </v-icon>
                    <span class="text-capitalize tw-text-neutral-700 tw-text-xs">
                        Profile
                    </span>
                </v-btn>
            </div>

            <v-divider></v-divider>

            <div class="d-flex tw-items-center tw-gap-2">
                <v-btn @click="logout" block class="justify-start" variant="text" color="gray" :ripple="false">
                    <v-icon :class="{'tw-animate-pulse': loginOut}" class="mr-2 tw-text-red-700">
                        {{ loginOut ? 'mdi-power-settings' : 'mdi-power' }}
                    </v-icon>
                    <span class="text-capitalize tw-text-red-700 tw-text-xs">
                        Logout
                    </span>
                </v-btn>
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
}
</script>

<style>

</style>