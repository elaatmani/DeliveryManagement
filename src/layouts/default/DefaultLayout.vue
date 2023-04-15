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

export default {
    components: { AppHeader, AppSidebar, Alert },

    data() {
        return {
            drawer: false
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
        }
    },

    mounted() {
        this.getCities()
    }
}
</script>

<style>

</style>