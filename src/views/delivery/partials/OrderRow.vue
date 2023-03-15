<template>
  <tr :key="order" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                    <td class="tw-w-4 tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500   focus:tw-ring-2 ">
                            <label for="checkbox-table-search-1" class="tw-sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap ">
                        {{ id }}
                    </th>
                    <td class="tw-px-6 tw-py-4">
                        {{ fullname }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ adresse }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ phone }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ product_name }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <OrderDelivery :id="id" :key="delivery" :delivery="delivery" />
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ quantity }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        - DH
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ city }}
                    </td>
                    <td class="tw-px-6 tw-py-4 ">
                        <div class="tw-max-w-[300px] tw-min-w-[150px] tw-whitespace-normal">
                            {{ note }}

                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ created_at?.split('T')[0] }}
                    </td>
                </tr>
</template>

<script>
import OrderDelivery from './OrderDelivery.vue'

export default {
    props: ['order', 'showNote'],
    components: { OrderDelivery },

    data() {
        return {
            showPopup: false,
            isLoading: false,

            "id": null,
            "fullname": null,
            "product_name": null,
            "agente_id": null,
            "upsell": null,
            "phone": null,
            "city": null,
            "adresse": null,
            "quantity": null,
            "confirmation": null,
            "affectation": null,
            "delivery": null,
            "note": null,
            "created_at": null
        }
    },

    methods: {
        handleClick() {
            this.showPopup = true
        },


    },

    mounted() {
        this.id = this.order.id
        this.fullname = this.order.fullname
        this.product_name = this.order.product_name
        this.agente_id = this.order.agente_id
        this.upsell = this.order.upsell
        this.phone = this.order.phone
        this.city = this.order.city
        this.adresse = this.order.adresse
        this.quantity = this.order.quantity
        this.confirmation = this.order.confirmation
        this.affectation = this.order.affectation
        this.delivery = this.order.delivery
        this.note = this.order.note
        this.created_at = this.order?.created_at
    }

}
</script>

<style>

</style>