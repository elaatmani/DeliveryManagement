<template>
  <div>
    
    <div class="tw-relative tw-min-h-[400px] tw-overflow-x-auto tw-overflow-y-visible  sm:tw-rounded-lg">
        <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
            <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                <tr>
                    <th scope="col" class="tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input id="checkbox-all-search" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500 focus:tw-ring-2">
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
                <tr v-for="(sale, i) in items" :key="i" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                    <td class="tw-w-4 tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500   focus:tw-ring-2 ">
                            <label for="checkbox-table-search-1" class="tw-sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap ">
                        {{ sale.id }}
                    </th>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale.fullname }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale.product_name }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <SaleUpsell :id="sale.id" :upsell="sale.upsell" :key="sale.upsell" />
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <SaleConfirmation :id="sale.id" :confirmation="sale.confirmation" :key="sale.confirmation" />
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <SaleAffectation :affectation="sale.affectation" :id="sale.id" :key="sale.affectation" />
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale.quantity }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        - DH
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale.city }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ sale?.created_at?.split('T')[0] }}
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
        <div class="mt-5 tw-flex tw-justify-between">
            <div class="d-flex align-center">
                <div class="text-body-2 tw-h-fit mr-2 tw-text-zinc-700">Show per page: </div>
                <v-select :hide-details="true" v-model="paginationLimit" :items="allowedLimit" variant="outlined" density="compact" color="primary-color"></v-select>
            </div>
            <div class="d-flex align-center">
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

export default {
    props: [ 'columns', 'sales' ],
    components: { SaleConfirmation, SaleUpsell, SaleAffectation },

    data() {
        return {
            allowedLimit: [5, 10, 20, 50, 100],
            currentPage: 1,
            paginationLimit: 10,
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
            return this.sales.slice(this.prevRange, this.nextRange)
        }
    }
}
</script>

<style>

</style>