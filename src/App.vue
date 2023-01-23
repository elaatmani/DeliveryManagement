<template>
  <v-app class="my-application">
      <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    theme: 'light'
  }),
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