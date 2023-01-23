<template>
  <v-sheet class="tw-rounded-lg tw-border pa-5" color="white" height="fit">
    <div class="tw-flex tw-items-center">
      <div :class="bgColor" class="pa-3 rounded-circle tw-w-fit tw-mr-3">
        <v-icon :color="dash.color" size="large" :icon="dash.icon"></v-icon>
        <!-- <v-img width="18" height="18" :src="localUrl + 'assets/img/icons/dash2.svg'"></v-img> -->
      </div>
      <div class="tw-flex tw-flex-col tw-h-full tw-text-neutral-600">
        <p class="tw-text-lg tw-font-bold">{{ dash.value }}</p>
        <v-spacer></v-spacer>
        <p class="tw-text-sm">{{ dash.title }}</p>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
    props: [ 'dash' ],

    computed: {
      bgColor() {
        const colors = {
          'orange': 'tw-bg-orange-500/10',
          'green': 'tw-bg-green-500/10',
          'blue': 'tw-bg-blue-500/10',
          'pink': 'tw-bg-pink-500/10'
        }
        return colors[this.dash.color]
      }
    }
};
</script>

<style>
</style>