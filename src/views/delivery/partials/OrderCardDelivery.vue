<template>
  <div>
    <popup-full @cancel="cancel" :visible="visible" >
        <div class="md:tw-w-[80%] tw-overflow-hidden tw-w-[95%] tw-max-w-[550px] tw-mx-auto tw-my-3 tw-min-h-[200px] tw-bg-white tw-rounded-lg tw-shadow-lg">
            <div class="tw-px-5 tw-pt-5">
                <h1 class="tw-font-bold tw-text-gray-600">Select Status</h1>
                <div class="tw-mt-3 tw-flex tw-gap-3 tw-flex-wrap">
                    <button :disabled="isDisabled(d)" @click="handleChange(d)" v-for="d in deliveryStatus" :key="d.value" :class="[isDisabled(d) && 'tw-saturate-0', d.text, d.bg, d.id == delivery  && [d.ring, 'tw-ring']]"
                        class="tw-px-4 tw-py-2 tw-rounded"
                    >
                        {{ d.name }}
                    </button>
                </div>
            </div>
            <div class="tw-mt-5 tw-px-5  tw-py-3 tw-bg-gray-50 tw-border-t tw-flex tw-gap-2 tw-justify-end">
                <v-btn @click="cancel" class="!tw-capitalize" color="grey-lighten-3" flat>
                    <span class="!tw-text-gray-500">Cancel</span>
                </v-btn>
                <v-btn @click="handleConfirm" :loading="isLoading" class="!tw-capitalize" color="primary-color" flat>
                    <span class="!tw-text-white">Confirm</span>
                </v-btn>
            </div>
        </div>
    </popup-full>

    <OrderReporting @order-reported="cancel" :order="order" :visible="showPopupReporter" @cancel="showPopupReporter = false" />
  </div>
</template>

<script>
import { deliveryStatus } from '@/config/orders'
import Sale from '@/api/Sale'
import OrderReporting from '@/views/delivery/partials/OrderReporting'

export default {
    props: ['visible', 'order'],

    components: { OrderReporting },

    data: () => ({
        status: deliveryStatus,
        disabled: ['expidier', 'annuler', 'dispatch'],
        delivery: 2,
        isLoading: false,
        note: '',
        showPopupReporter: false
    }),

    computed: {
        deliveryStatus() {
            return this.status.filter(i => !!i.value)
        },

        selected() {
            return this.status.find(i => i.id == this.delivery)
        }
    },

    watch: {
        order: {
            handler(newValue) {
                this.delivery = this.getDeliveryId(newValue.delivery)
            },
            deep: true,
            immediate: true,
        }
    },

    methods: {
        cancel() {
            this.getCurrentStatus()
            this.$emit('cancel')
        },

        isDisabled(v) {
            return this.disabled.includes(v.value)
        },

        handleChange(delivery) {
            if(this.isDisabled(delivery)) return false;
            this.delivery = delivery.id;
        },

        handleConfirm() {
            const option = this.selected

            if (option.value === this.order.delivery) {
                this.cancel()
                return false
             }
          
            if(option.value != 'reporter') {
                this.updateOrder()
                .then(
                    () => {
                        this.cancel()
                    }
                )
            }

            if(option.value == 'reporter') {
                this.showPopupReporter = true
            }
        },

        async updateOrder() {
          this.isLoading = true
          return Sale.deliveryUpdateDelivery(this.order.id, this.selected.value)
          .then(
            res => {
              if (res.data.code === 'SUCCESS') {
                this.$alert({
                  type: 'success',
                  title: res.data.data
                })
                this.updateDelivery(this.order.id, this.selected.value)
                this.isLoading = false
                this.cancel();
              }
            },
            err => this.$handleApiError(err)
          )
          .then(
            () => this.$emit('update', this.selected.value)
          );
        },

        updateDelivery(id, delivery) {
            this.$store.dispatch('order/updateDelivery', {id, delivery})
        },

        getDeliveryId(value) {
            return this.status.find(i => i.value == value).id || 0
        },
        
        getCurrentStatus() {
            this.delivery = this.getDeliveryId(this.order.delivery)
        }
    },

    mounted() {
        this.getCurrentStatus()
    }

}
</script>

<style>

</style>