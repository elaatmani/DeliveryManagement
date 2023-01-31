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
    ...mapActions('user', ['setIsLoggedIn', 'setPermissions']),
    createTestUser() {
      const user = {
        firstname: 'Yassine',
        lastname: 'El Aatmani',
        phone: '12345',
        email: 'admin@gmail.com',
        password: 'admin',
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
        email: 'admin@gmail.com',
        password: 'admin',
      }

      User.login(user)
      .then(
        res => {
          console.log(res);
          if (res.data.code == 'AUTHENTICATION_SUCCESSFUL') {
            this.setIsLoggedIn(true)
            this.$router.push('/')
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  },

  mounted() {
    // this.createTestUser()
    // this.logi
    // this.logout()
    // this.getUserInfo()

    this.$can('say test')

    // console.log( this.$can('product_update'))
    // this.$ability.update(['product_update'])
    // console.log(this.$ability);
    // console.log( this.$can('product_update'))

    // setTimeout(() => {
    //   this.setIsLoggedIn(false)
    //   this.$router.push('/login')
    // },4000)
  },
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