<template>
  <tr :key="order.id" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
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
                        {{ product_name }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <OrderUpsell :key="upsell" :upsell="upsell" :id="id" />
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <OrderConfirmation :confirmation="confirmation" :key="confirmation" :id="id" />
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <OrderAffectation v-if="confirmation === 'confirmer'" :id="id" :affectation="affectation" :key="affectation" />
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
                    <td v-if="showNote" class="tw-px-6 tw-py-4 ">
                        <div class="tw-max-w-[300px] tw-min-w-[150px] tw-whitespace-normal">
                            {{ note }}
                            <v-icon @click="handleClick" size="x-small" class="tw-ml-2 tw-text-blue-500 tw-cursor-pointer hover:tw-bg-neutral-900/10 tw-rounded-full tw-p-3" :class="{'tw-animate-spin': isLoading}">{{ isLoading ? 'mdi-loading' : 'mdi-pencil' }}</v-icon>

                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ created_at?.split('T')[0] }}
                    </td>
                </tr>
                <popup type="info" title="Add Note" @resolved="handleResolved" :loading="isLoading" :visible="showPopup">
                    <div class="tw-min-w-[300px]">
                        <p>Edit note</p>
                        <v-textarea v-model="newNote" variant="outlined" class="rounded-md" color="primary-color">

                        </v-textarea>
                    </div>
                </popup>
</template>

<script>
import OrderConfirmation from '@/views/order/partials/OrderConfirmation'
import OrderUpsell from '@/views/order/partials/OrderUpsell'
import OrderAffectation from '@/views/order/partials/OrderAffectation'
import Sale from '@/api/Sale'

export default {
    props: ['order', 'showNote'],
    components: { OrderConfirmation, OrderUpsell, OrderAffectation },

    data() {
        return {
            showPopup: false,
            isLoading: false,
            newNote: ''

        }
    },

    computed: {
        id() {
            return this.order.id;
        },
        fullname() {
            return this.order.fullname;
        },
        product_name() {
            return this.order.product_name;
        },
        agente_id() {
            return this.order.agente_id;
        },
        upsell() {
            return this.order.upsell;
        },
        phone() {
            return this.order.phone;
        },
        city() {
            return this.order.city;
        },
        adresse() {
            return this.order.adresse;
        },
        quantity() {
            return this.order.quantity;
        },
        confirmation() {
            return this.order.confirmation;
        },
        affectation() {
            return this.order.affectation;
        },
        delivery() {
            return this.order.delivery;
        },
        note() {
            return this.order.note;
        },
        created_at() {
            return this.order?.created_at;
        },
    },

    methods: {
        handleClick() {
            this.showPopup = true
            this.newNote = this.note
        },
        handleResolved(response) {
            if(!response) {
                this.showPopup = false;
                return;
            }

            this.showPopup = false
            this.isLoading = true
            Sale.agenteUpdateNote(this.id, this.newNote)
            .then(
                res => {
                    if (res.data.code == "SUCCESS") {
                        this.$alert({
                            type: 'success',
                            title: res.data.data
                        })
                        this.$store.dispatch('order/updateNote', {note: this.newNote, id: this.id})
                    }
                },
                this.$handleApiError
            )
            .finally(
                () => this.isLoading = false
            )
        },
    },
    mounted() {
        
    }

}
</script>

<style>

</style>