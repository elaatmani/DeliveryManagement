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
            fetching: null,
            // delay: 60000,
            delay: 6000,
        }
    },

    computed: {
        isLoggedIn() {
            return this.$store.getters['user/isLoggedIn']
        },
        cities() {
            return this.$store.getters['city/cities']
        },
        user() {
            return this.$store.getters['user/user']
        },
        sales() {
            return this.$store.getters["sale/sales"];
        },
    },

    methods: {
        toggleSidebar() {
            this.drawer = !this.drawer
        },
        async getCities() {
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
            Sheet.auto()
        }
    },

    mounted() {
        this.getCities();
        // !this.subscribed && this.subscribe();
        this.fetching = setInterval(this.sync_sheets, this.delay)
    }
}
</script>

<style>

</style>