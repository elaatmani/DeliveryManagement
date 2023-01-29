<template>
  <v-app class="my-application">
      <router-view/>
  </v-app>
</template>

<script>
// import Api from '@/api/Api'
// import Csrf from '@/api/Csrf'
import User from '@/api/User'
import { mapActions } from 'vuex'
// import { AbilityBuilder } from '@casl/vue'
export default {
  name: 'App',

  data: () => ({
    theme: 'light'
  }),

  methods: {
    ...mapActions('user', ['setIsLoggedIn']),
    createTestUser() {
      const user = {
        firstname: 'Yassine',
        lastname: 'El Aatmani',
        phone: '12345',
        email: 'Yassine@gmail',
        password: '12345',
        status: 1
      }

      User.signup(user)
      .then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    },

    getUserInfo() {
      return User.getUser().then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    },

    logout() {
      User.logout()
      .then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    },

    login() {
      const user = {
        email: 'Yassine@gmail',
        password: '12345',
      }

      User.login(user)
      .then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    }
  },

  mounted() {
    
    // this.login()
    this.logout()
    // this.getUserInfo()
  }
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