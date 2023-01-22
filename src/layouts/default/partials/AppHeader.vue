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
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
        <!-- /Right Part -->

      </v-app-bar>
  </div>
</template>

<script>
import { localUrl } from '@/config'
export default {
    emits: [ 'toggleSidebar' ],

    computed: {
        localUrl() {
            return localUrl
        }
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