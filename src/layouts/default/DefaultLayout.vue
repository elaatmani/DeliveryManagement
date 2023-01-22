<template>
  <div>
    <v-layout :full-height="true">

        <!-- Application Sidebar -->
        <AppSidebar :active="drawer" />

        <!-- Application Header -->
        <AppHeader @toggleSidebar="toggleSidebar" />

        <!-- Application container -->
        <v-main class="tw-bg-gray-50 tw-min-h-screen tw-overflow-y-auto">
            
            <v-container fluid class="py-6">
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-layout>
  </div>
</template>

<script>
import AppHeader from '@/layouts/default/partials/AppHeader'
import AppSidebar from '@/layouts/default/partials/AppSidebar'

export default {
    components: { AppHeader, AppSidebar },

    data() {
        return {
            drawer: false
        }
    },

    methods: {
        toggleSidebar() {
            this.drawer = !this.drawer
        }
    }
}
</script>

<style>

</style>