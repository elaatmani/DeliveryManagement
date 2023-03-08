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
                <tr v-for="(sale, i) in sales" :key="i" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
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
                        <SaleUpsell />
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <SaleConfirmation />
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <SaleAffectation />
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
                        {{ sale.created_at.split('T')[0] }}
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

  </div>
</template>

<script>
import SaleConfirmation from '@/views/sale/partials/SaleConfirmation'
import SaleUpsell from '@/views/sale/partials/SaleUpsell'
import SaleAffectation from '@/views/sale/partials/SaleAffectation'

export default {
    props: [ 'columns', 'sales' ],
    components: { SaleConfirmation, SaleUpsell, SaleAffectation },

    methods: {
    }
}
</script>

<style>

</style>