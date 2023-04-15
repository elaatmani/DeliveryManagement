<template>
  <div class="tw-h-100 tw-flex tw-items-center tw-max-w-[750px] tw-flex-wrap tw-gap-2">
    <div class="tw-py-0 tw-px-2 tw-text-xs tw-h-5 tw-bg-gray-900/10 tw-text-gray-900 tw-rounded-lg" v-for="permission in permissions" :title="permission.description" :key="permission.name">{{ permission.name }}</div>
  </div>
</template>

<script>
export default {
    props: [ "role" ],
    name: "rolePermissions",
    data() {
        return {
            // permissions: [
            //     'users_create',
            //     'users_delete',
            //     'users_show',
            //     'users_update',
            // ]
        }
    },
    computed: {
      permissions() {
        return this.role.permissions.map(i => i);
      }
    }
}
</script>

<style>

</style>