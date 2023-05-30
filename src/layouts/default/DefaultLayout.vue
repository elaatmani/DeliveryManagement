<template>
  <div>
    <v-layout v-if="isLoggedIn" :full-height="true">

        <!-- Application Sidebar -->
        <AppSidebar :active="drawer" />

        <!-- Application Header -->
        <AppHeader @toggleSidebar="toggleSidebar" />

        <!-- Alert component -->
        <Alert />

        <!-- Application container -->
        <v-main class="tw-bg-gray-50 tw-min-h-screen tw-overflow-y-auto">
            
            <v-container fluid class="py-6 px-6">
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-layout>
  </div>
</template>

<script>
import AppHeader from '@/layouts/default/partials/AppHeader'
import AppSidebar from '@/layouts/default/partials/AppSidebar'
import Alert from '@/components/AlertVue'
import User from '@/api/User'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import Sheet from '@/api/Sheet'

export default {
    components: { AppHeader, AppSidebar, Alert },

    data() {
        return {
            drawer: false,
            subscribed: false,
        }
    },

    computed: {
        isLoggedIn() {
            return this.$store.getters['user/isLoggedIn']
        },
        cities() {
            return this.$store.getters['city/cities']
        }
    },

    methods: {
        toggleSidebar() {
            this.drawer = !this.drawer
        },
        getCities() {
            if(this.cities.length == 0) {
                return User.cities().then(
                    res => {
                        const cities = res.data.data
                        this.$store.dispatch('city/setCities', cities)
                    }
                )
            }
        },

        subscribe() {
            // const Pusher = window.Pusher
            console.log(Pusher);

            const echo = new Echo({
                broadcaster: 'pusher',
                key: 'ABCDEFG',
                wsHost: '127.0.0.1',
                wsPort: 6001,
                forceTLS: false,
                disableStats: true,
                cluster: 'mt1'
            });

            window.Echo = echo;

            echo.channel('notification')
            .listenToAll(   (e) => {
                console.log(e);
            })

            this.subscribed = true
        },

        sync_sheets() {
            Sheet.sync_all()
            .then(
                res => {
                    if (res.data.code == 'SUCCESS') {
                        console.log(res);
                    }
                }
            )
        }
    },

    mounted() {
        this.getCities();
        // !this.subscribed && this.subscribe();
    }
}
</script>

<style>

</style>