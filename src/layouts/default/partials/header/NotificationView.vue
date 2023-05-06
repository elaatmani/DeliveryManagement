<template>
  <div>
    <AdminNotification v-if="user.role == 'admin'" />
    <UserNotification v-if="['agente', 'delivery'].includes(user.role)" />
  </div>
</template>

<script>
import AdminNotification from '@/layouts/default/partials/header/AdminNotification'
import UserNotification from '@/layouts/default/partials/header/UserNotification'
export default {
    components: {AdminNotification, UserNotification},

    computed: {
        user() {
            return this.$store.getters['user/user']
        }
    }

}
</script>

<style>

</style>