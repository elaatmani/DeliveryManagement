<template>
  <div>
    
    <div class="tw-relative tw-overflow-x-auto  sm:tw-rounded-lg">
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
                <tr v-for="product in products" :key="product.id" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                    <td class="tw-w-4 tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500   focus:tw-ring-2 ">
                            <label for="checkbox-table-search-1" class="tw-sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap ">
                        {{ product.id }}
                    </th>
                    <td class="tw-px-6 tw-py-4">
                        {{ product.ref }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ product.name }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ product.buying_price }} DH
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ product.selling_price }} DH
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ calculQty(product.variations) }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ product.created_at.split('T')[0] }}
                    </td>
                    <td class="tw-flex tw-items-center tw-px-6 tw-py-4 tw-space-x-3">
                        <ProductActions :product="product" />
                        <!-- <a href="#" class="tw-font-medium tw-text-green-500  hover:tw-underline">Show</a>
                        <a href="#" class="tw-font-medium tw-text-blue-600  hover:tw-underline">Edit</a>
                        <a href="#" class="tw-font-medium tw-text-red-600  hover:tw-underline">Remove</a> -->
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

  </div>
</template>

<script>
import ProductActions from '@/views/product/ProductActions'

export default {
    props: [ 'columns', 'products' ],
    components: { ProductActions },

    methods: {
        calculQty(variants) {
            let total = 0;
            variants.forEach(item => {
                total += item.quantity
            });

            return total
        }
    }
}
</script>

<style>

</style>