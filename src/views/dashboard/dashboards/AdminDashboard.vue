<template>

    <div>
        <div class="mb-5 tw-flex tw-justify-between tw-items-center">
            <div>
                <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Dashboard</h1>
            </div>
        </div>

        <div v-if="!isLoaded">
            <LoadingAnimation />
        </div>

        <div v-if="isLoaded">

            <div class="mb-5 mt-5 ml-5 tw-flex tw-justify-between tw-items-center">
                <div>
                    <h2 class="tw-text-gray-500 tw-text-lg">Online</h2>
                </div>
            </div>

            <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
                <v-row>
                    <v-col cols="12" md="12">
                        <UsersTable />
                    </v-col>
                </v-row>
            </div>


            <div class="mb-5 mt-5 ml-5 tw-flex tw-justify-between tw-items-center">
                <div>
                    <h2 class="tw-text-gray-500 tw-text-lg">Statistiques</h2>
                </div>
            </div>

            <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">



                <v-row>
                    <v-col cols="12" md="12">
                        <FilterTabs />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="3" v-for="dash in dashItems" :key="dash.id">
                        <DashItem :dash="dash" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <TabSwitcher />
                    </v-col>
                </v-row>
            </div>

        </div>
    </div>
</template>

<script>
    import DashItem from '@/views/dashboard/partials/DashItem'
    // import DashItemTwo from '@/views/dashboard/partials/DashItemTwo'
    // import DashItemFilled from '@/views/dashboard/partials/DashItemFilled'
    import UsersTable from '@/views/dashboard/partials/UsersTable'
    import Sale from '@/api/Sale'
    import TabSwitcher from '@/views/dashboard/partials/admin/TabSwitcher'
    import FilterTabs from '@/views/dashboard/partials/admin/FilterTabs'

    export default {
        components: { DashItem, UsersTable, TabSwitcher, FilterTabs },

        data() {
            return {
                isLoaded: false,
                dashItems: [
                    {
                        id: 1,
                        title: 'Total Chiffres d\'affaire',
                        value: 1200,
                        icon: 'mdi-currency-usd',
                        color: 'green'
                    },
                    {
                        id: 2,
                        title: 'Chiffres d\'affaire versé',
                        value: '35000 DH',
                        icon: 'mdi mdi-credit-card-check-outline',
                        color: 'orange'
                    },
                    {
                        id: 3,
                        title: 'Chiffres d\'affaire non versé',
                        value: 600,
                        icon: 'mdi mdi-credit-card-remove-outline',
                        color: 'red'
                    },
                    {
                        id: 4,
                        title: 'Chiffres d\'affaire en caisse',
                        value: 543,
                        icon: 'mdi mdi-bank',
                        color: 'yellow'
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
            },

            sales() {
                return this.$store.getters['sale/sales']
            },
            newSales() {
                return {
                    id: 1,
                    title: 'New',
                    value: this.sales.filter(i => !i.confirmation).length,
                    // value: 35,
                    color: 'primary-green',
                    icon: 'mdi mdi-new-box'
                }
            },
            toProcess() {
                return {
                    id: 2,
                    title: 'Process',
                    value: this.sales.filter(
                        i => (!!i.confirmation)
                            && !(['confirmer', 'livre', 'expidier'].includes(i.confirmation))
                    ).length,
                    // value: 231,
                    color: 'primary-orange',
                    icon: 'mdi-reload'
                }
            },
            confirmedSales() {
                return {
                    id: 3,
                    title: 'Confirmed',
                    value: this.sales.filter(i => i.confirmation == 'confirmer').length,
                    // value: 112,
                    color: 'deep-purple-accent-2',
                    icon: 'mdi-phone-check'
                }
            },
            deliveredSales() {
                return {
                    id: 4,
                    title: 'Delivered',
                    value: this.sales.filter(i => i.confirmation == 'livre').length,
                    // value: 412,
                    color: 'primary-blue',
                    icon: 'mdi-account-check-outline'
                }
            },
            shippedSales() {
                return {
                    id: 5,
                    title: 'Shipped',
                    value: this.sales.filter(i => i.confirmation == 'expidier').length,
                    // value: 112,
                    color: 'red',
                    icon: 'mdi-truck'
                }
            },

        },
        mounted() {
            Sale.all().then(
                res => {
                    if (res?.data.code == "SUCCESS") {
                        const sales = res.data.data.orders
                        console.log(res.data);
                        this.$store.dispatch('sale/setSales', sales)
                        this.$store.dispatch('sale/setFetched', true)
                        this.isLoaded = true
                    }
                }
            ).catch(this.$handleApiError)

        }
    }
</script>

<style>

</style>