<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            location="left"
            :absolute="false"
            class="!tw-top-0 !tw-fixed"
            
        >
            <!-- NavBar Logo  -->
            <v-list-item class="tw-py-3">
                <div>
                    <v-img width="140" :src="localUrl + 'assets/img/logo.png'"></v-img>
                </div>
            </v-list-item>
            <!-- /NavBar Logo -->


            <v-list class="mt-2" nav>
                <SidebarItem v-for="link in links" :key="link.id" :link="link" />
            </v-list>
      </v-navigation-drawer>
    </div>
</template>

<script>
import { localUrl } from '@/config/config'
import { links } from '@/config/links'

// Components
import SidebarItem from '@/layouts/default/partials/sidebar/SidebarItem'

export default {
    components: { SidebarItem },

    props: [ 'active' ],

    data() {
        return {
            localUrl,
            drawer: true,
            links: links
        }
    },

    computed: {
    },

    watch: {
        active() {
            this.drawer = !this.drawer
        }
    },

    methods: {
    },

    mounted() {
        if (this.$vuetify.display.mdAndDown) {
            this.drawer = false
        }
    }
}
</script>

<style>

</style>