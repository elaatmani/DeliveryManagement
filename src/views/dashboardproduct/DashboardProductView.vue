<template>
    <div class="tw-pb-40">
        <div class="tw-space-y-3">

            <IndexTopProducts />

        </div>
    </div>
</template>

<script>

import IndexTopProducts from '@/views/dashboardproduct/IndexTopProducts'


export default {
    components: { IndexTopProducts },

    computed: {
        user() {
            return this.$store.getters['user/user'];
        }
    },


    mounted() {
        if (this.user.role != 'admin') this.$router.push({ name: '404' });
    }
}
</script>

<style></style>