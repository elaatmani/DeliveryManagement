<template>
  <div :key="users.length">
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Users List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Manage all users</h2>
      </div>


      <div v-if="$can('users_create')">
        <v-btn color="primary-color" link :to="{name: 'user/add'}" variant="flat" class="text-capitalize">
          <v-icon icon="mdi-plus" class="mr-2 text-white "></v-icon>
          <span class="text-white">
            Add User
          </span>
        </v-btn>
      </div>
    </div>

    <div v-if="!isLoaded">
          <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div class="mb-5 tw-flex">
        <v-btn icon rounded="lg" variant="flat" size="small" color="primary-color" class="text-white">
          <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
        </v-btn>
        <div class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
          <v-img width="18" height="18" max-width="18" class="ma-0 pa-0" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          <input type="text" class="ml-2 tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by name">
        </div>
      </div>

      <div class="">
        <UsersTable :users="users" :columns="columns" />
      </div>
    </div>
  </div>
</template>

<script>
import {localUrl} from '@/config/config'
import User from '@/api/User';
import UsersTable from '@/views/user/UsersTable'


export default {
  components: { UsersTable },
  data() {
    return {
      localUrl,
      isLoaded: false,
      columns: 
      [
        {
          prop: 'id',
            name: '#',
        },
        {
            prop: "fullname",
            name: "Name",
        },
        {
          prop: 'role_name',
          name: 'Role',
        },
        {
          prop: 'email',
          name: 'Email',
        },
        {
            prop: "phone",
            name: "Phone Number",
        },
        {
            prop: 'status',
            name: 'Active',
        },
        {
            name: 'Acions',
            prop: 'users',
        }
    ]
    }
  },

  computed: {
    users() {
      return this.$store.getters['user/users']
    }
  },
  methods: {
    beforeFocus(e) {
      e.preventDefault();
    }
  },
  mounted() {
    
    localStorage.removeItem('updatedUsers')

    console.log('users list mounted');

    User.all().then(
      res => {
        if(res?.data.code == "SHOW_ALL_USERS") {
            const users = res.data.data.users
            this.$store.dispatch('user/setUsers', users);
            console.log(res);
            this.isLoaded = true
          }
        }
        ).catch(this.$handleApiError)
  }
}
</script>

<style>
</style>