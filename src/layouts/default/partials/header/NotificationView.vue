<template>
  <div>
    <AdminNotification v-if="user.role == 'admin'" />
  </div>
</template>

<script>
import AdminNotification from '@/layouts/default/partials/header/AdminNotification'
export default {
    components: {AdminNotification},

    computed: {
        user() {
            return this.$store.getters['user/user']
        }
    }

}
</script>

<style>

</style>