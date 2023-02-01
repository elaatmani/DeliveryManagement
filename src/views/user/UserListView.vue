<template>
  <div>
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
        <DataTable :rows="users" :columns="columns" />
      </div>
    </div>
  </div>
</template>

<script>
import { VGridVueTemplate } from '@revolist/vue3-datagrid';
import {localUrl} from '@/config/config'

import UserStatus from './UserStatus.vue';
import UserActions from './UserActions.vue';
import DataTable from '@/components/DataTable'
import User from '@/api/User';
import RoleName from './RoleName.vue';


export default {
  components: { DataTable },
  data() {
    return {
      localUrl,
      isLoaded: false,
      users: [],
      columns: 
      [
        {
            prop: 'id',
            name: '#',
            size: 50,
            // sortable: true,
            filter: false,
        },
        {
            prop: "firstname",
            name: "First Name",
            size: 140,
            filter: 'name'
        },
        {
          prop: 'lastname',
          name: 'Last Name',
          size: 130,
          filter: 'name',
        },
        {
          prop: 'role_name',
          name: 'Role',
          size: 100,
          filter: 'role',
          cellTemplate: VGridVueTemplate(RoleName)
        },
        {
          prop: 'email',
          name: 'Email',
          size: 170,
          filter: 'name'
        },
        {
            prop: "phone",
            name: "Phone Number",
            filter: 'number',
            size: 160
        },
        {
            prop: 'status',
            name: 'Active',
            filter: false,
            size: 100,
            cellTemplate: VGridVueTemplate(UserStatus)
        },
        {
            name: 'Acions',
            prop: 'users',
            cellTemplate: VGridVueTemplate(UserActions),
            size: 130,
            filter: false
        }
    ]
    }
  },
  methods: {
    beforeFocus(e) {
      e.preventDefault();
    }
  },
  mounted() {
    User.all().then(
      res => {
        if(res?.data.code == "SHOW_ALL_USERS") {
            const users = res.data.data.users
            this.users = users;
            console.log(res);
            this.isLoaded = true
    }
            }
        ).catch(
            err => {
                if (err?.response?.data?.code == "NOT_AUTHENTICATED") {
                    this.$store.dispatch('user/setPermissions', [])
                    this.$store.dispatch('user/setIsLoggedIn', false)
                    this.$router.push('/login')
                }

                if (err?.response?.data?.code == 'SERVER_ERROR') {
                    this.$alert({
                        title: 'Something wrong happend. Please try again',
                        type: 'error'
                    })
                }

                this.$alert({
                        title: 'Something wrong happend. Please try again',
                        type: 'error'
                    })
            }
        )
  }
}
</script>

<style>
</style>