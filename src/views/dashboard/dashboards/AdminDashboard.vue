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
                        <FilterTabs v-model:filters="filters" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="3">
                        <DashItem :dash="dashChiffreAffaires" />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <DashItem :dash="dashChiffreAffairesVerse" />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <DashItem :dash="dashChiffreAffairesNonVerse" />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <DashItem :dash="dashChiffreAffairesEnCaisse" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <TabSwitcher :filtered-sales="filteredSales" />
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
                filters: {
                    deliveryFilter: 'all',
                    agentFilter: 'all',
                    productFilter:'all',
                    cityFilter:'all',
                    upsellFilter:'all',
                    dateFilter: ['', '']
                },
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
            filteredSales() {
                const agentFilter = this.filters.agentFilter;
                const deliveryFilter = this.filters.deliveryFilter;
                const productFilter = this.filters.productFilter;
                const cityFilter = this.filters.cityFilter;
                const upsellFilter = this.filters.upsellFilter;
                const startDate = this.filters.dateFilter[0];
                const endDate = this.filters.dateFilter[1];

                return this.sales.filter(sale => {

                    if(agentFilter !== 'all') {
                        if(parseInt(sale.agente_id) != parseInt(agentFilter)) {
                            return false;
                        }
                    }

                    if(deliveryFilter !== 'all') {
                        if(parseInt(sale.affectation) != parseInt(deliveryFilter)) {
                            return false;
                        }
                    }

                    if(upsellFilter !== 'all') {
                        if(sale.upsell != upsellFilter) {
                            return false;
                        }
                    }

                    if(productFilter !== 'all') {
                        if(!sale.items.some(i => parseInt(i.product_id) == parseInt(productFilter))) {
                            return false;
                        }
                    }

                    if(cityFilter !== 'all') {
                        if(sale.city?.toLocaleLowerCase() != cityFilter?.toLocaleLowerCase()) {
                            return false;
                        }
                    }

                    const createdAt = new Date(sale.created_at);
                    const createdAtDay = createdAt.getDate();
                    const createdAtMonth = createdAt.getMonth();
                    const createdAtYear = createdAt.getFullYear();

                    /* eslint-disable */
                    if (!!startDate) {
                        const startDay = startDate.getDate();
                        const startMonth = startDate.getMonth();
                        const startYear = startDate.getFullYear();

                        if (
                            createdAtYear < startYear ||
                            (createdAtYear === startYear && createdAtMonth < startMonth) ||
                            (createdAtYear === startYear && createdAtMonth === startMonth && createdAtDay < startDay)
                        ) {
                            return false;
                        }
                    }


                    if (!!endDate) {
                        const endDay = endDate.getDate();
                        const endMonth = endDate.getMonth();
                        const endYear = endDate.getFullYear();

                        if (
                            createdAtYear > endYear ||
                            (createdAtYear === endYear && createdAtMonth > endMonth) ||
                            (createdAtYear === endYear && createdAtMonth === endMonth && createdAtDay > endDay)
                        ) {
                            return false;
                        }
                    }

                    return true;

                });
            },
            dashChiffreAffaires() {
                return {
                        id: 1,
                        title: 'Total Chiffres d\'affaire',
                        value: this.getChiffresDaffaire(),
                        icon: 'mdi-currency-usd',
                        color: 'green'
                    }
            },
            dashChiffreAffairesVerse() {
                return {
                        id: 2,
                        title: 'Chiffres d\'affaire versé',
                        value: this.getChiffresDaffaireVerse(),
                        icon: 'mdi mdi-credit-card-check-outline',
                        color: 'orange'
                    }
            },
            dashChiffreAffairesNonVerse() {
                return {
                        id: 3,
                        title: 'Chiffres d\'affaire non versé',
                        value: this.getChiffresDaffaireNonVerse(),
                        icon: 'mdi mdi-credit-card-remove-outline',
                        color: 'red'
                    }
            },
            dashChiffreAffairesEnCaisse() {
                return {
                        id: 4,
                        title: 'Chiffres d\'affaire en caisse',
                        value: this.getChiffresDaffaireEnCaise(),
                        icon: 'mdi mdi-bank',
                        color: 'yellow'
                    }
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

        methods: {
            getSales() {
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
            },
            getChiffresDaffaire() {
                let total = 0;
                this.filteredSales.forEach(s => {
                    total += s.price;
                })
                return total;
            },
            getChiffresDaffaireVerse() {
                let total = 0;
                this.filteredSales.forEach(s => {
                    if(s.factorisations != null && s.factorisations.paid) {
                        total += s.price;
                    }
                })
                return total;
            },
            getChiffresDaffaireNonVerse() {
                let total = 0;
                this.filteredSales.forEach(s => {
                    if(s.factorisations != null && !s.factorisations.paid) {
                        total += s.price;
                    }
                })
                return total;
            },
            getChiffresDaffaireEnCaise() {
                return this.getChiffresDaffaire() - this.getChiffresDaffaireVerse()
            }
        },

        mounted() {
            this.getSales();
        }
    }
</script>

<style>

</style>