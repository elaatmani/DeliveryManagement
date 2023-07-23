<template>
  <div :key="users.length">
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Users List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Manage all users</h2>
      </div>


      <div v-if="$can('create_user')">
        <v-btn color="primary-color" link :to="{name: 'user/add'}" variant="flat" class="text-capitalize">
          <v-icon icon="mdi-plus" class="mr-2 text-white "></v-icon>
          <span class="text-white">
            Add User
          </span>
        </v-btn>
      </div>
    </div>

    <div v-if="!fetched">
          <LoadingAnimation />
    </div>

    <div v-if="fetched" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div class="mb-5 tw-flex">
        <v-btn @click="showFilters = !showFilters" icon rounded="lg" variant="flat" size="small" color="primary-color" class="text-white">
          <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
        </v-btn>
        <div class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
          <v-img width="18" height="18" max-width="18" class="ma-0 pa-0" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          <input v-model="search" type="text" class="ml-2 tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by name">
        </div>
      </div>

      <div class="tw-max-h-0 tw-duration-500 tw-overflow-hidden" :class="{'!tw-max-h-[500px]': showFilters}">
        <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-mb-4">
          
          <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit"> 
            <span class="tw-text-sm tw-text-neutral-600">Role</span>
            <div class="tw-relative">
              <select v-model="role" class="tw-w-full focus:tw-border-orange-400 tw-capitalize tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
              </select>
              <v-icon class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
          </div>
        </div>
      </div>

      <div class="">
        <UsersTable :users="filteredUsers" :columns="columns" />
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
      
      showFilters: false,
      role: 'All',
      search: '',

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
            prop: "last_seen",
            name: "Last Seen",
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
    fetched() {
      return this.$store.getters['user/fetched']
    },
    users() {
      return this.$store.getters['user/users']
    },
    roles() {
      let roles = new Set(['All', ...this.users.map(user => user.role_name)]);
      return roles;
    },
    filteredUsers() {
      const role = this.role;
      const search = this.search;

      return this.users.filter(item => {
        // filter by confirmation
        if (role.toLocaleLowerCase() !== 'all' && role.toLocaleLowerCase() !== item.role_name) {
          return false;
        }

        if(
          !item.firstname.toLowerCase().includes(search.toLowerCase()) 
          && !item.lastname.toLowerCase().includes(search.toLowerCase()) 
          && !item.role_name.toLowerCase().includes(search.toLowerCase())
          && !item.email.toLowerCase().includes(search.toLowerCase())
          && !item.phone.toLowerCase().includes(search.toLowerCase())
          ) {
          return false;
        }
        

        // if item passes all filters, include it in the filtered data
        return true;
      });
    }
  },
  methods: {
    getRoles() {
      User.roles()
        .then((res) => {
          if (res?.data.code == "SUCCESS") {
            const roles = res.data.data.roles;
            this.$store.dispatch("user/setRoles", roles);
            this.isFormReady = true
          }
        })
        .catch(this.$handleApiError);
    },
    getUsers() {
      User.all().then(
      res => {
        if(res?.data.code == "SHOW_ALL_USERS") {
            const users = res.data.data.users
            this.$store.dispatch('user/setUsers', users);
            this.$store.dispatch('user/setFetched', true);
          }
        }
        ).catch(this.$handleApiError)
    }
  },
  mounted() {
    localStorage.removeItem('updatedUsers')
    if(!this.fetched) {
      this.getUsers()
    }

    
  }
}
</script>

<style>
</style>