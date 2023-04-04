<template>
  <div>

    <div class="tw-w-full tw-rounded-lg tw-py-5 tw-px-5 tw-flex tw-flex-center tw-justify-center">
        <h1 class="tw-text-lg">Welcome to Dashboard !</h1>
    </div>
  </div>
</template>

<script>

export default {
    components: { },

    data() {
        return {
            dashItems: [
                {
                    id: 1,
                    title: 'Orders',
                    value: 1200,
                    icon: 'mdi-package-variant-closed',
                    color: 'orange'
                },
                {
                    id: 2,
                    title: 'Total Sales',
                    value: '35000 DH',
                    icon: 'mdi-currency-usd',
                    color: 'green'
                },
                {
                    id: 3,
                    title: 'Orders Confirmed',
                    value: 600,
                    icon: 'mdi-phone-check-outline',
                    color: 'blue'
                },
                {
                    id: 4,
                    title: 'Orders Delivered',
                    value: 543,
                    icon: 'mdi-truck-check-outline',
                    color: 'pink'
                },
                
            ],

            filledDashItems: [

                {
                    id: 1,
                    title: 'Customers',
                    value: 2300,
                    color: 'primary-orange',
                    icon: 'mdi-account-outline'
                },

                {
                    id: 2,
                    title: 'Suppliers',
                    value: 300,
                    color: 'primary-blue',
                    icon: 'mdi-account-check-outline'
                },

                {
                    id: 3,
                    title: 'Purchase Invoice',
                    value: 1100,
                    color: 'primary-indigo',
                    icon: 'mdi-file-document-outline'
                },

                {
                    id: 4,
                    title: 'Agents',
                    value: 10,
                    color: 'primary-green',
                    icon: 'mdi-moped-outline'
                },
            ]
        }
    },
    computed: {
        user() {
            return this.$store.getters['user/user']
        },
        isAdmin() {
            return this.user.role == "admin"
        }
    }
}
</script>

<style>

</style>