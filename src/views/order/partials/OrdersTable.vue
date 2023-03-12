<template>
  <div :key="orders.length">
    
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
                <OrderRow v-for="(order) in orders" :key="order.id" :order="order" />
                
            </tbody>
        </table>
    </div>

  </div>
</template>

<script>
import OrderRow from '@/views/order/partials/OrderRow'

export default {
    props: [ 'columns', 'orders' ],
    components: { OrderRow },
    methods: {
    }
}
</script>

<style>

</style>