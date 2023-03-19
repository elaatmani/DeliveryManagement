<template>
  <div v-if="orders.length > 0" :key="orders.length">
    
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
                <OrderRow :showNote="!!note" v-for="(order) in items" :key="order.id" :order="order" />
                
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
                <div class="text-caption tw-h-fit mr-2 font-weight-bold tw-text-zinc-700">{{ prevRange + 1 }} - {{ (currentPage == pageCount ?  orders.length : nextRange) }} of {{  orders.length }} items </div>
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
import OrderRow from '@/views/order/partials/OrderRow'
import User from '@/api/User'

export default {
    props: [ 'columns', 'orders', 'note' ],
    data() {
        return {
            allowedLimit: [5, 10, 20, 50, 100],
            currentPage: 1,
            paginationLimit: 10,
        }
    },
    components: { OrderRow },
    methods: {
        getDeliveries() {
            User.deliveries()
            .then(
                res => {
                    console.log(res.data.data);
                    this.$store.dispatch('user/setDeliveries', res.data.data);
                },
                this.$handleApiError
            )
        }
    },
    computed: {
        deliveries() {
            return this.$store.getters['user/deliveries'];
        },
        prevRange() {
            return (this.currentPage - 1) * this.paginationLimit
        },

        nextRange() {
            return (this.currentPage) * this.paginationLimit
        },
        pageCount() {
            return Math.ceil(this.orders.length / this.paginationLimit)
        },
        items() {
            return this.orders.slice(this.prevRange, this.nextRange)
        }
    },
    mounted() {
        if(this.deliveries.length == 0) {
            this.getDeliveries()
        }
        console.log(this.orders);
    }
}
</script>

<style>

</style>