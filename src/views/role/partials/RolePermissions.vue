<template>
  <div class="tw-h-100 tw-flex tw-items-center tw-w-[300px] tw-gap-2">
    <div class="tw-py-0 tw-px-2 tw-text-xs tw-h-5 tw-bg-gray-900/10 tw-text-gray-900 tw-rounded-lg" v-for="permission in permissions" :key="permission">{{ permission }}</div>
  </div>
</template>

<script>
export default {
    props: [ "rowIndex", "prop", "model" ],
    name: "rolePermissions",
    data() {
        return {
            permissions: [
                'users_create',
                'users_delete',
                'users_show',
                'users_update',
            ]
        }
    }
}
</script>

<style>

</style>