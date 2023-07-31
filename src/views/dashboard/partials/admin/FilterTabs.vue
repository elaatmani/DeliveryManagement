<template>

    <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-mb-4 py-5">
        <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <div class="tw-relative">
                <DateFilter name="Created Date" v-model:filter="dateFilter" />
            </div>
        </div>

        <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <div class="tw-relative">
                <DateFilter name="Dropped Date" v-model:filter="droppedAtFilter" />
            </div>
        </div>

        <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Agents</span>
            <div class="tw-relative">
                <select v-model="agentFilter"
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                    <option value="all">Select</option>
                    <option :value="agent.id" :key="agent.id" v-for="agent in agents">
                        {{ agent.firstname }} {{ agent.lastname }}
                    </option>
                </select>
                <v-icon
                    class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
        </div>

        <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Deliveries</span>
            <div class="tw-relative">
                <select v-model="deliveryFilter"
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                    <option value="all">Select</option>
                    <option :value="delivery.id" :key="delivery.id" v-for="delivery in deliveries">
                        {{ delivery.firstname }} {{ delivery.lastname }}
                    </option>
                </select>
                <v-icon
                    class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
        </div>

        <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Cities</span>
            <div class="tw-relative">
                <select v-model="cityFilter"
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                    <option value="all">Select</option>
                    <option :value="city.name" :key="city.id" v-for="city in cities">
                        {{ city.name }}
                    </option>
                </select>
                <v-icon
                    class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
        </div>

        <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Products</span>
            <div class="tw-relative">
                <select v-model="productFilter"
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                    <option value="all">Select</option>
                    <option :value="product.id" :key="product.id" v-for="product in products">
                        {{ product.name }}
                    </option>
                </select>
                <v-icon
                    class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
        </div>

        <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Shops</span>
            <div class="tw-relative">
                <select
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                    <option value="all">Select</option>
                </select>
                <v-icon
                    class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
        </div>

        <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Sources</span>
            <div class="tw-relative">
                <select
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                    <option value="all">Select</option>
                </select>
                <v-icon
                    class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
        </div>

        <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Upsell</span>
            <div class="tw-relative">
                <select
                    v-model="upsellFilter"
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                    <option value="all">Select</option>
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                </select>
                <v-icon
                    class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
        </div>

        <div v-if="false" class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Date Added</span>
            <div class="tw-relative">
                <input type="date"
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm" />

            </div>
        </div>

        <div v-if="false" class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Date Validation</span>
            <div class="tw-relative">
                <input type="date"
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm" />

            </div>
        </div>

        <div v-if="false" class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Date Update</span>
            <div class="tw-relative">
                <input type="date"
                    class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm" />

            </div>
        </div>
    </div>
</template>

<script>
   
    import Product from '@/api/Product'
    import User from '@/api/User'
    import DateFilter from '@/views/dashboard/partials/admin/DateFilter'

    export default {
        components: { DateFilter },
        props: ['filters'],

        data() {
            return {
                deliveryFilter: 'all',
                agentFilter: 'all',
                productFilter:'all',
                cityFilter:'all',
                upsellFilter: 'all',
                dateFilter: ['', ''],
                droppedAtFilter: ['', ''],
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

        watch: {
            agentFilter(v) {
                this.$emit('update:filters', {...this.filters, agentFilter: v})
            },
            deliveryFilter(v) {
                this.$emit('update:filters', {...this.filters, deliveryFilter: v})
            },
            productFilter(v) {
                this.$emit('update:filters', {...this.filters, productFilter: v})
            },
            cityFilter(v) {
                this.$emit('update:filters', {...this.filters, cityFilter: v})
            },
            upsellFilter(v) {
                this.$emit('update:filters', {...this.filters, upsellFilter: v})
            },
            dateFilter: {
                deep: true,
                handler(v) {
                    this.$emit('update:filters', {...this.filters, dateFilter: v})
                }
            },
            droppedAtFilter: {
                deep: true,
                handler(v) {
                    this.$emit('update:filters', {...this.filters, droppedAtFilter: v})
                }
            },
        },

        computed: {

            agents() {
                return this.$store.getters['user/agents']
            },

            deliveries() {
                return this.$store.getters['user/deliveries']
            },

            products() {
                return this.$store.getters['product/products']
            },

            cities(){
                return this.$store.getters['city/cities']
            },
           

        },
        mounted() {
            User.deliveries().then(
                res => {
                    if (res?.data.code == "SUCCESS") {
                        const deliveries = res.data.data
                        console.log(res.data);
                        this.$store.dispatch('user/setDeliveries', deliveries)
                        this.isLoaded = true
                    }
                }
            ).catch(this.$handleApiError)

            Product.all().then(
                res => {
                    if (res?.data.code == "SUCCESS") {
                        const products = res.data.data.products
                        console.log(res.data);
                        this.$store.dispatch('product/setProducts', products)
                        this.isLoaded = true
                    }
                }
            ).catch(this.$handleApiError)

            User.cities().then(
                res => {
                    if (res?.data.code == "SUCCESS") {
                        const cities = res.data.data
                        console.log(res.data);
                        this.$store.dispatch('city/setCities', cities)
                        this.isLoaded = true
                    }
                }
            ).catch(this.$handleApiError)

            User.agents().then(
                res => {
                    if (res?.data.code == "SUCCESS") {
                        const agents = res.data.data
                        console.log(res.data);
                        this.$store.dispatch('user/setAgents', agents)
                        this.isLoaded = true
                    }
                }
            ).catch(this.$handleApiError);


        }
    }
</script>

<style></style>