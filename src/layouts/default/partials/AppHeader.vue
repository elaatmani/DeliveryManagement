<template>
  <div>
    <!-- Header -->
    <v-app-bar
        color="white"
        density="default"
        elevation="0"
        class="tw-border-b-0 !tw-shadow-lg !tw-shadow-gray-400/10 tw-top-0 !tw-fixed"
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
          <v-btn :ripple="false" class="mr-2"  icon>
            <v-img width="22" height="22" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          </v-btn>
          <v-btn :ripple="false" class="mr-2" icon>
            <v-img width="22" height="22" :src="localUrl + 'assets/img/icons/notification-bing.svg'"></v-img>
          </v-btn>
          <v-btn  icon>
            <v-avatar size="35">
              <v-img :src="localUrl + 'assets/img/profiles/avatar.webp'" ></v-img>
            </v-avatar>
              <v-badge floating offset-y="-10" offset-x="5" color="primary-green" :bordered=true location="bottom right" dot></v-badge>
          </v-btn>
        </template>
        <!-- /Right Part -->

      </v-app-bar>
  </div>
</template>

<script>
import { localUrl } from '@/config/config'
export default {
    emits: [ 'toggleSidebar' ],

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