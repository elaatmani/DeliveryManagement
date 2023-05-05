<template>
  <div>
    <!-- Header -->
    <v-app-bar
        color="white"
        density="default"
        elevation="0"
        class="tw-border-b-0 !tw-shadow-lg !tw-shadow-gray-400/10 tw-top-0 !tw-fixed tw-overflow-visible"
        :absolute="false"
      >

        <!-- Left Part -->
        <template v-if="false" v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <!-- / Left Part -->

        <!-- App Logo -->
        <v-app-bar-nav-icon variant="text" @click.stop="handleClick()"></v-app-bar-nav-icon>
        <!-- / App Logo -->

        <!-- Right Part -->
        <template v-slot:append>
          <!-- <v-btn :ripple="false" class="mr-2"  icon>
            <v-img width="22" height="22" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          </v-btn> -->

          <div class="tw-flex tw-items-center tw-gap-2">
            <!-- Notifications -->
            <Notification />
            
            <!-- User Menu -->
            <HeaderMenu />
          </div>

        </template>
        <!-- /Right Part -->

      </v-app-bar>
  </div>
</template>

<script>
import { localUrl } from '@/config/config'
import HeaderMenu from '@/layouts/default/partials/header/HeaderMenu'
import Notification from '@/layouts/default/partials/header/NotificationView'

export default {
    emits: [ 'toggleSidebar' ],
    components: { HeaderMenu, Notification },

    data() {
      return {
        localUrl
      }
    },

    computed: {
    },

    methods: {
        handleClick() {
            this.$emit('toggleSidebar');
        }
    }
}
</script>

<style>

</style>