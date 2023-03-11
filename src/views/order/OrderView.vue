<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Order</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Order Details</h2>
      </div>
    </div>


    <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <div class="">
        <div>
            <v-btn @click="addOrder" color="primary-color" variant="flat" class="text-capitalize">
                <span class="text-white">
                    {{ isLoaded ? 'Add Order' : 'Loading...'}}
                </span>
                <v-icon v-if="!isLoaded" icon="mdi-autorenew" class="ml-2 text-white tw-animate-spin"></v-icon>
            </v-btn>
        </div>

        <div v-if="isLoaded && isOrderExists">

            <div class="mt-5">
                <div class="tw-grid tw-grid-cols-12 mt-">
                    <div class="tw-col-span-3 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Client Name</p>
                        <p class="tw-text-neutral-700">{{ fullname }}</p>
                    </div>
                    <div class="tw-col-span-3 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Phone</p>
                        <p class="tw-text-neutral-700">{{ phone }}</p>
                    </div>
                    <div class="tw-col-span-3 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Product Name</p>
                        <p class="tw-text-neutral-700">{{ product_name }}</p>
                    </div>
                    <div class="tw-col-span-3 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Quantity</p>
                        <p class="tw-text-neutral-700">{{ quantity }}</p>
                    </div>
                    
                    <div class="tw-col-span-3 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Address</p>
                        <p class="tw-text-neutral-700">{{ adresse }}</p>
                    </div>
                    <div class="tw-col-span-3 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md tw-mb-2">Confirmation</p>
                        <OrderConfirmation :confirmation="confirmation" />
                    </div>
                    <div class="tw-col-span-3 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md tw-mb-2">Affecté</p>
                        <OrderAffectation />
                    </div>
                    <div class="tw-col-span-3 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md tw-mb-2">Upsell</p>
                        <OrderUpsell upsell="true" />
                    </div>
                </div>
            </div>

            <div class="tw-flex tw-justify-end">
                <v-btn @click="getOrder" color="primary-color" variant="flat" class="text-capitalize">
                    <span class="text-white">
                        Confirm
                    </span>
                </v-btn>
            </div>
        </div>

        <div v-if="isLoaded && !isOrderExists">
            <p class="tw-text-neutral-400 tw-py-5">No Order was found !</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import OrderConfirmation from '@/views/order/partials/OrderConfirmation'
import OrderAffectation from '@/views/order/partials/OrderAffectation'
import OrderUpsell from '@/views/order/partials/OrderUpsell'
import Sale from '@/api/Sale';

export default {
    components: { OrderConfirmation, OrderAffectation, OrderUpsell },
  data() {
    return {
        isOrderExists: false,
        isLoaded: false,

        "id": 9,
        "fullname": null,
        "product_name": null,
        "agente_id": null,
        "upsell": null,
        "phone": null,
        "city": null,
        "adresse": null,
        "quantity": 0,
        "confirmation": null,
        "affectation": null,
        "delivery": null,
        "note": null,
    };
  },

  computed: {
    
  },

  methods: {
    addOrder() {
        this.isLoaded = false
        Sale.agenteAddOrder().then(
            res => {
                if (res.data.code === "ORDER_NOT_CONFIRMED") {
                    this.$alert({
                        type: 'warning',
                        title: 'Order was not confirmed'
                    })
                }
            }
        ).finally(() => {
            this.isLoaded = true
        });
    },
    getOrder() {
        Sale.agenteGetOrder().then(
            res => {
                if (res.data.code === "SUCCESS") {
                    const order = res.data.data.orders[0]
                    this.id = order?.id
                    this.fullname = order?.fullname
                    this.product_name = order?.product_name
                    this.agente_id = order?.agente_id
                    this.upsell = order?.upsell
                    this.phone = order?.phone
                    this.adresse = order?.adresse
                    this.quantity = order?.quantity
                    this.confirmation = order?.confirmation
                    this.affectation = order?.affectation
                    this.delivery = order?.delivery
                    this.note = order?.note

                    this.isLoaded = true
                    this.isOrderExists = true
                }
            },
            err => {
                this.$handleApiError(err)
                this.isLoaded = true
            }
        );
    }
  },

  async mounted() {
    this.getOrder()
  },
};
</script>

<style>
</style>