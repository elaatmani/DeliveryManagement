
<template>
  <div v-if="model.role_name !== 'admin'" class="tw-flex tw-items-center">
    <v-switch :disabled="isLoading" :loading="isLoading" @change="handleChange" color="primary-color" :flat="true" v-model="checked" density="compact" :hide-details="true"></v-switch>
  </div>
</template>

<script>
import User from '@/api/User'
export default {
    props: ["rowIndex", "prop", "model"],
    data() {
        return {
            isLoading: false,
            checked: this.model.status == 1 ? true: false
        }
    },

    methods: {
      handleChange() {
        const data = {
          id: this.model.id,
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
            }
          }
        ).catch(
          err => {
            if (err.response.data.code == 'SERVER_ERROR') {
              this.$alert({
                type: 'error',
                title: 'Something wrong happened. Try again'
              })
              this.checked = !this.checked
            }

            if (err.response.data.code == 'NOT_ALLOWED') {
              this.$store.dispatch('user/logout')
              this.$router.push('/login')
            }
          }
        ).finally(() => {
          this.isLoading = false
        })
      }
    }

}
</script>

<style>

</style>