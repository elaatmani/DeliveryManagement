
<template>
  <div v-if="user.role_name !== 'admin'" class="tw-flex tw-items-center">
    <v-switch :disabled="isLoading" :loading="isLoading" @change="handleChange" color="primary-color" :flat="true" v-model="checked" density="compact" :hide-details="true"></v-switch>
  </div>
</template>

<script>
import User from '@/api/User'
export default {
    props: ["rowIndex", "prop", "user"],
    data() {
        return {
            isLoading: false,
            checked: false
        }
    },

    watch: {
    },

    methods: {
      handleChange() {
        const data = {
          id: this.user.id,
          status: this.checked ? 'true' : 'false'
        }

        this.isLoading = true
        User.updateStatus(data)
        .then(
          res => {
            if (res.data.code == 'STATUS_USER_UPDATED') {
              this.$alert({
                type: 'success',
                title: 'Status updated'
              })
              this.setUpdatedUser(this.user.id, this.checked)
            }
          }
        ).catch(
          err => {
            this.$handleApiError(err)
          }
        ).finally(() => {
          this.isLoading = false
        })
      },

      setUpdatedUser(id, status) {
        let updatedUsers = localStorage.getItem('updatedUsers');
        
        let users = {}
        if(!updatedUsers) {
          users[id] = status
        } else {
          users = JSON.parse(updatedUsers);
          users[id] = status
        }


        localStorage.setItem('updatedUsers', JSON.stringify(users))

      },

      getUpdatedUsers() {
        let updatedUsers = localStorage.getItem('updatedUsers');

        if(!updatedUsers) {
          return {}
        }

        let users = JSON.parse(updatedUsers);
        return users
      }
    },

    mounted() {
      const users = this.getUpdatedUsers()

      if (Object.keys(users).includes(`${this.user.id}`)) {
        this.checked = users[this.model.id] == 1 ? true : false;
      } else {
        this.checked = this.user.status == 1 ? true : false;
      }
    }

}
</script>

<style>

</style>