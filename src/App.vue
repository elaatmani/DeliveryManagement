<template>
  <v-app class="my-application">
      <router-view/>
  </v-app>
</template>

<script>
// import defineAbilityFor from '@/config/ability'
// import user from '@/config/user'
// import { AbilityBuilder } from '@casl/vue'
export default {
  name: 'App',

  data: () => ({
    theme: 'light'
  }),

  mounted() {
    // console.log('I Can manage All: ', this.$can('manage', 'all'));
    // console.log('I Can Add User: ', this.$can('add', 'User'));
    // console.log('I Can Delete User: ', this.$can('delete', 'User'));
    // console.log('I Can Delete Post: ', this.$can('delete', 'Post'));
    // setTimeout(() => {
    //   this.$ability.update([
    //     {action: ['product_show']}
    //   ])
    //   console.log('ability updated');
    // }, 3000)

    // setTimeout(() => {
    //   this.$ability.update([
    //     {action: ['product_update', 'product_delete']}
    //   ])
    //   console.log('ability updated');
    // }, 6000)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  // @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap');

  @font-face {
    font-family: "Nunito";
    src: url("@/assets/font/Nunito-VariableFont_wght.ttf");
    font-weight: 100 1000;
  }

  $font-family: 'Nunito', "Segoe UI", "Roboto", sans-serif;
  $body-font-family: 'Nunito';
  $title-font: 'Nunito';

  #application {
    .headline,
    .title,
    [class*='display-'],
    [class*='text-'] {
      font-family: $font-family, sans-serif !important;
    }
    font-family: $font-family, sans-serif !important;
  }

  .my-application * {
    font-family: $font-family, sans-serif !important;
  }
</style>