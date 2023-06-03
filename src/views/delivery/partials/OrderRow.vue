<template>
  <tr :key="order.id" :class="[ order.delivery == 'reporter' && 'tw-relative', isReportedToday(order) && '!tw-border tw-border-red-400']" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                    <td class="tw-w-4 tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500   focus:tw-ring-2 ">
                            <label for="checkbox-table-search-1" class="tw-sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap ">
                        {{ order.id }}
                    </th>
                    <td class="tw-px-6 tw-py-4 tw-relative">
                        {{ order?.created_at?.split('T')[0] }}
                        <div v-if="order.delivery == 'reporter'" :class="isReportedToday(order) && '!tw-bg-red-400'" class=" tw-text-xs tw-text-white tw-px-1 tw-rounded-t tw-bottom-0 tw-left-1/2 -tw-translate-x-1/2 tw-absolute tw-bg-gray-500">
                             <span v-if="isReportedToday(order)">
                                Reported for today
                             </span>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ order.fullname }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ order.adresse }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ order.phone }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <div class="tw-pb-2">
                            <ul>
                            <li v-for="i in order.items" :key="i.id" class="tw-font-bold">
                                -
                                <span
                                class="tw-text-orange-500 tw-font-bold tw-pr-1 tw-text-xs"
                                >{{ i.quantity }}
                                X </span
                                >{{ i.product.name }} | {{ i.product_variation.size }} /
                                {{ i.product_variation.color }}
                            </li>
                            </ul>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4 tw-relative">
                        <div class="tw-flex tw-items-center tw-justify-center">
                            <OrderDelivery :class="order.delivery == 'reporter' && 'tw-mb-1'" :order="order" :id="order.id" :key="order.delivery" :delivery="order.delivery" />
                            <div v-if="order.delivery == 'reporter'" :class="isReportedToday(order) && '!tw-bg-red-400'" class=" tw-text-xs tw-text-white tw-px-1 tw-rounded-t tw-bottom-0 tw-left-1/2 -tw-translate-x-1/2 tw-absolute tw-bg-gray-500">
                                
                                <span class="tw-flex tw-gap-1">
                                    <span v-if="order.delivery == 'reporter'">
                                        <v-icon size="x-small">mdi-autorenew</v-icon>
                                        <span >
                                        {{ order.reported_delivery_date  }}
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ order.price }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ order.city }}
                    </td>
                    <td class="tw-px-6 tw-py-4 ">
                        <div class="tw-max-w-[300px] tw-min-w-[150px] tw-whitespace-normal">
                            {{ order.note }}

                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <OrderActions :key="order.id" :order="order" />
                    </td>
                </tr>
</template>

<script>
import OrderDelivery from './OrderDelivery.vue'
import OrderActions from '@/views/delivery/partials/OrderActions'

export default {
    props: ['order', 'showNote'],
    components: { OrderDelivery, OrderActions },

    data() {
        return {
            showPopup: false,
            isLoading: false,

            todayDate: null
        }
    },

    methods: {
        handleClick() {
            this.showPopup = true
        },

        isReportedToday(order) {
            if(order.delivery != "reporter") {
                return false
            }

            if(order.reported_delivery_date == this.todayDate) {
                return true
            }

            return false;
        },
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