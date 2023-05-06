<template>
  <div :key="items.length">
    
    <div class="tw-relative tw-pb-5 tw-overflow-x-auto tw-overflow-y-visible  sm:tw-rounded-lg">
        <table :key="reportedForToday.length" class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
            <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                <tr>
                    <th scope="col" class="tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input @click="handleSelectAll" id="checkbox-all-search" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500 focus:tw-ring-2">
                            <label for="checkbox-all-search" class="tw-sr-only">checkbox</label>
                        </div>
                    </th>
                    <th v-for="column in columns" :key="column.prop" scope="col" class="tw-px-6 tw-py-3 text-truncate">
                        <div class="tw-w-fit tw-flex tw-whitespace-nowrap">
                            {{ column.name }}
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(sale) in items" :key="sale.id" :class="[[sale.confirmation, sale.delivery].includes('reporter') && 'tw-relative', isReportedToday(sale) && '!tw-border tw-border-red-400']" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                    <td class="tw-w-4 tw-p-4 tw-relative">
                        <div class="tw-flex tw-items-center">
                            <input @change="handleSelect($event ,sale.id)" :checked="isSelected(sale.id)" id="checkbox-table-search-1" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500   focus:tw-ring-2 ">
                            <label for="checkbox-table-search-1" class="tw-sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap ">
                        {{ sale.id }}
                    </th>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale.city }}
                    </td>
                    <td class="tw-px-6 tw-py-4 tw-relative">
                        {{ sale?.created_at?.split('T')[0] }}
                        <div v-if="sale.confirmation == 'reporter' || sale.delivery == 'reporter'" :class="isReportedToday(sale) && '!tw-bg-red-400'" class=" tw-text-xs tw-text-white tw-px-1 tw-rounded-t tw-bottom-0 tw-left-1/2 -tw-translate-x-1/2 tw-absolute tw-bg-gray-500">
                             <span v-if="isReportedToday(sale)">
                                Reported for today
                             </span>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale.fullname }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale.product_name }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <SaleUpsell :sale="sale" :id="sale.id" :upsell="sale.upsell" :key="sale.upsell" />
                    </td>
                    <td class="tw-px-6 tw-py-4 tw-relative">
                        <div class="tw-flex tw-items-center tw-justify-center">
                            <SaleConfirmation :class="sale.confirmation == 'reporter' && 'tw-mb-1'" :sale="sale" :id="sale.id" :confirmation="sale.confirmation" :key="sale.confirmation" />
                            <div v-if="sale.confirmation == 'reporter'" :class="isReportedToday(sale) && '!tw-bg-red-400'" class=" tw-text-xs tw-text-white tw-px-1 tw-rounded-t tw-bottom-0 tw-left-1/2 -tw-translate-x-1/2 tw-absolute tw-bg-gray-500">
                                
                                <span class="tw-flex tw-gap-1">
                                    <span v-if="sale.confirmation == 'reporter'">
                                        <v-icon size="x-small">mdi-autorenew</v-icon>
                                        <span >
                                        {{ sale.reported_agente_date  }}
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <SaleAffectation :sale="sale" v-if="sale.confirmation == 'confirmer'" :affectation="sale.affectation" :id="sale.id" :key="sale.affectation" />
                    </td>
                    <td class="tw-px-6 tw-py-4 tw-relative">
                        <div class="tw-flex tw-items-center tw-justify-center">
                            <SaleDelivery :class="sale.delivery == 'reporter' && 'tw-mb-1'" :sale="sale" :id="sale.id" :key="sale.delivery" :delivery="sale.delivery" />
                            <div v-if="sale.delivery == 'reporter'" :class="isReportedToday(sale) && '!tw-bg-red-400'" class=" tw-text-xs tw-text-white tw-px-1 tw-rounded-t tw-bottom-0 tw-left-1/2 -tw-translate-x-1/2 tw-absolute tw-bg-gray-500">
                                
                                <span class="tw-flex tw-gap-1">
                                    <span v-if="sale.delivery == 'reporter'">
                                        <v-icon size="x-small">mdi-autorenew</v-icon>
                                        <span >
                                        {{ sale.reported_delivery_date  }}
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale.quantity }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale.price }}
                    </td>
                    
                    <td class="tw-px-6 tw-py-4">
                        <SaleActions :id="sale.id" :key="sale.delivery" :sale="sale" />
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
        <div class="mt-5 tw-grid tw-grid-cols-12 tw-gap-5">
            <div class="tw-col-span-12 md:tw-col-span-6 d-flex align-center">
                <div class="text-body-2 tw-h-fit mr-2 tw-text-zinc-700 tw-whitespace-nowrap">Show per page: </div>
                <select v-model="paginationLimit" class="focus:tw-border-orange-400 tw-border-solid tw-w-[70px] ml-2 px-2 tw-py-2 tw-rounded-md tw-border tw-flex tw-items-center">
                    <option :value="o" :key="o" v-for="o in allowedLimit">{{ o }}</option>
                </select>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 d-flex tw-justify-end tw-flex-wrap align-center">
                <div class="text-caption tw-h-fit mr-2 font-weight-bold tw-text-zinc-700">{{ prevRange + 1 }} - {{ (currentPage == pageCount ?  sales.length : nextRange) }} of {{  sales.length }} items </div>
                <div>
                <v-btn @click="currentPage = n" :ripple="false" variant="flat" class="mr-1" icon rounded="lg" :color="n == currentPage ? 'primary-color' : 'grey'" density="comfortable"  v-for="n in pageCount" :key="n">
                    <span class="tw-text-white">{{ n }}</span>
                </v-btn>
                </div>
            </div>
        </div>
        <!-- /Pagination -->
  </div>
</template>

<script>
import SaleConfirmation from '@/views/sale/partials/SaleConfirmation'
import SaleUpsell from '@/views/sale/partials/SaleUpsell'
import SaleAffectation from '@/views/sale/partials/SaleAffectation'
import SaleDelivery from '@/views/sale/partials/SaleDelivery'
import SaleActions from '@/views/sale/partials/SaleActions'

export default {
    props: {
        columns: {
            required: true
        } ,
        sales: {
            required: true
        },
        selectedReset: {
            required: false,
            default: []
        }
    },
    components: { SaleConfirmation, SaleUpsell, SaleAffectation, SaleDelivery, SaleActions },

    data() {
        return {
            allowedLimit: [5, 10, 20, 50, 100],
            currentPage: 1,
            paginationLimit: 10,
            todayDate: null,
            selected: [],
        }
    },

    watch: {
        selectedReset(value) {
            this.selected = value
            console.log('reset selected, ', value);
        },
        paginationLimit() {
            this.currentPage = 1
        },
        selected(value) {
            this.$emit('selected', value)
        }
    },

    computed: {
        prevRange() {
            return (this.currentPage - 1) * this.paginationLimit
        },

        nextRange() {
            return (this.currentPage) * this.paginationLimit
        },
        pageCount() {
            return Math.ceil(this.sales.length / this.paginationLimit)
        },
        items() {
            const sales = [...this.reportedForToday,...this.sales.filter(sale => !this.isReportedToday(sale))]
            return sales.slice(this.prevRange, this.nextRange)
        },
        reportedForToday() {
            return this.sales.filter(this.isReportedToday)
        }
    },

    methods: {
        isReportedToday(sale) {
            return this.isConfirmationReportedToday(sale) || this.isDeliveryReportedToday(sale)
        },

        isDeliveryReportedToday(sale) {
            if(sale.delivery != "reporter") {
                return false
            }

            if(sale.reported_delivery_date == this.todayDate) {
                return true
            }

            return false;
        },

        isConfirmationReportedToday(sale) {
            if(sale.confirmation != "reporter") {
                return false
            }

            if(sale.reported_agente_date == this.todayDate) {
                return true
            }

            return false;
        },

        handleSelect(e, id) {
            if(e.target.checked) {
                this.selected = [...this.selected, id]
            } else {
                this.selected = this.selected.filter(i => i != id)
            }
        },

        isSelected(id) {
            return this.selected.includes(id)
        },

        handleSelectAll(e) {
            if(e.target.checked) {
                this.selected = [...this.items.map(i => i.id)]
            } else {
                this.selected = []
            }
        }
    },

    mounted() {
        const date = new Date();
        const day = date.getDate();
        const dayFormated = day.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            });
        const month = date.getMonth() + 1;
        const monthFormated = month.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            })
        const year = date.getFullYear();
        this.todayDate = `${year}-${monthFormated}-${dayFormated}`;
    }
}
</script>

<style>

</style>