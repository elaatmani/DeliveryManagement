<template>

    <div>
        <!-- <div class="mb-5 tw-flex tw-justify-between tw-items-center">
            <div>
                <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Dashboard</h1>
            </div>
        </div> -->

        <div v-if="!isLoaded">
            <LoadingAnimation />
        </div>

        <div v-if="isLoaded">

            <div class="mb-2 mt-5 tw-flex tw-justify-between tw-items-center">
                <div>
                    <h2 class="tw-text-gray-500 tw-text-lg">Online</h2>
                </div>
            </div>

            <div class="py-2 px-2 tw-border bg-white tw-w-full tw-rounded">
                <v-row>
                    <v-col cols="12" md="12">
                        <UsersTable />
                    </v-col>
                </v-row>
            </div>


            <div class="mb-2 mt-2 tw-flex tw-justify-between tw-items-center tw-w-full">
                <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
                    <h2 class="tw-text-gray-500 tw-text-lg">Statistiques</h2>

                    <button :disabled="updating"  @click="updateSales"  type="button" class="tw-text-white tw-w-fit tw-my-2 tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 hover:tw-bg-gradient-to-bl focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-cyan-300 dark:focus:tw-ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center tw-mr-2 dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 tw-duration-200 tw-gap-2 tw-pointer-events-auto tw-inline-flex tw-items-center">
                            <div v-if="!updating" class="tw-flex tw-items-center tw-gap-2">
                                <v-icon class="tw-text-sm" color="white">mdi-autorenew</v-icon>
                                Refresh
                            </div>
                            <div  v-if="updating">
                                <svg aria-hidden="true" role="status" class="tw-inline tw-w-4 tw-h-4 tw-mr-3 tw-text-white tw-animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                loading...
                            </div>
                    </button>
                </div>
            </div>

            <div class="px-5 tw-border bg-white tw-w-full tw-rounded-md">



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
import { getPrice } from '@/helpers/methods'
    

    export default {
        components: { DashItem, UsersTable, TabSwitcher, FilterTabs },

        data() {
            return {
                updating: false,
                filters: {
                    deliveryFilter: 'all',
                    agentFilter: 'all',
                    productFilter:'all',
                    cityFilter:'all',
                    upsellFilter:'all',
                    dateFilter: ['', ''],
                    droppedAtFilter: ['', '']
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
            isLoaded() {
                return this.$store.getters['sale/fetched']
            },
            filteredSales() {
                const agentFilter = this.filters.agentFilter;
                const deliveryFilter = this.filters.deliveryFilter;
                const productFilter = this.filters.productFilter;
                const cityFilter = this.filters.cityFilter;
                const upsellFilter = this.filters.upsellFilter;
                const startDate = this.filters.dateFilter[0];
                const endDate = this.filters.dateFilter[1];

                const droppedStartDate = this.filters.droppedAtFilter[0];
                const droppedEndDate = this.filters.droppedAtFilter[1];

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

                    
                    const droppedAt = new Date(sale.dropped_at);
                    const droppedAtDay = droppedAt.getDate();
                    const droppedAtMonth = droppedAt.getMonth();
                    const droppedAtYear = createdAt.getFullYear();


                    if (!!droppedStartDate) {
                        const droppedStartDay = droppedStartDate.getDate();
                        const droppedStartMonth = droppedStartDate.getMonth();
                        const droppedStartYear = droppedStartDate.getFullYear();

                        if (
                            droppedAtYear < droppedStartYear ||
                            (droppedAtYear === droppedStartYear && droppedAtMonth < droppedStartMonth) ||
                            (droppedAtYear === droppedStartYear && droppedAtMonth === droppedStartMonth && droppedAtDay < droppedStartDay)
                        ) {
                            return false;
                        }
                    }

                    if (!!droppedEndDate) {
                        const droppedEndDay = droppedEndDate.getDate();
                        const droppedEndMonth = droppedEndDate.getMonth();
                        const droppedEndYear = droppedEndDate.getFullYear();

                        if (
                            droppedAtYear > droppedEndYear ||
                            (droppedAtYear === droppedEndYear && droppedAtMonth > droppedEndMonth) ||
                            (droppedAtYear === droppedEndYear && droppedAtMonth === droppedEndMonth && droppedAtDay > droppedEndDay)
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
                        value: this.getChiffresDaffaire().toFixed(2),
                        icon: 'mdi-currency-usd',
                        color: 'green'
                    }
            },
            dashChiffreAffairesVerse() {
                return {
                        id: 2,
                        title: 'Chiffres d\'affaire versé',
                        value: this.getChiffresDaffaireVerse().toFixed(2),
                        icon: 'mdi mdi-credit-card-check-outline',
                        color: 'orange'
                    }
            },
            dashChiffreAffairesNonVerse() {
                return {
                        id: 3,
                        title: 'Chiffres d\'affaire non versé',
                        value: this.getChiffresDaffaireNonVerse().toFixed(2),
                        icon: 'mdi mdi-credit-card-remove-outline',
                        color: 'red'
                    }
            },
            dashChiffreAffairesEnCaisse() {
                return {
                        id: 4,
                        title: 'Chiffres d\'affaire en caisse',
                        value: this.getChiffresDaffaireEnCaise().toFixed(2),
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
                        this.$store.dispatch('sale/setSales', sales)
                        this.$store.dispatch('sale/setFetched', true)
                        // this.isLoaded = true
                    }
                }
                ).catch(this.$handleApiError)
            },
            updateSales() {
                this.updating = true;
                Sale.all().then(
                res => {
                    if (res?.data.code == "SUCCESS") {
                        const sales = res.data.data.orders
                        this.$store.dispatch('sale/setSales', sales)
                        this.updating
                        // this.isLoaded = true;
                    }
                }
                ).catch(this.$handleApiError)
                .finally(() => {
                    this.updating = false
                })
            },
            getChiffresDaffaire() {
                let total = 0;
                this.filteredSales.forEach(s => {
                    total += getPrice(s);
                })
                return total;
            },
            getChiffresDaffaireVerse() {
                let total = 0;
                this.filteredSales.forEach(s => {
                    if(s.factorisations != null && s.factorisations.paid) {
                        total += getPrice(s);
                    }
                })
                return total;
            },
            getChiffresDaffaireNonVerse() {
                let total = 0;
                this.filteredSales.forEach(s => {
                    if(s.factorisations != null && !s.factorisations.paid) {
                        total += getPrice(s);
                    }
                })
                return total;
            },
            getChiffresDaffaireEnCaise() {
                return this.getChiffresDaffaire() - this.getChiffresDaffaireVerse()
            }
        },

        mounted() {
            // if(!this.isLoaded) {
            //     this.getSales();
            // }
        }
    }
</script>

<style>

</style>