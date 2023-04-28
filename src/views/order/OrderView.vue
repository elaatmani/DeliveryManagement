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
                    <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Client: </p>
                        <p class="tw-text-neutral-700">{{ newOrder.fullname }}</p>
                    </div>
                    <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Phone: </p>
                        <p class="tw-text-neutral-700">{{ newOrder.phone }}</p>
                        <v-btn link target="_blank" :href="'https://api.whatsapp.com/send?phone=' + newOrder.phone.replace('+', '').replace('-', '').replace(' ', '')" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="flat" density="comfortable" :ripple="false" size="small">
                            <v-icon color="white">mdi-whatsapp</v-icon>
                          </v-btn>
                    </div>
                    <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Nom de produit: </p>
                        <p class="tw-text-neutral-700">{{ newOrder.product_name }}</p>
                    </div>
                    <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Quantité:</p>
                        <p class="tw-text-neutral-700">{{ newOrder.quantity }}</p>
                    </div>
                    <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Price:</p>
                        <p class="tw-text-neutral-700">{{ newOrder.price }}</p>
                    </div>
                    
                    <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">City: </p>
                        <p class="tw-text-neutral-700">{{ newOrder.city }}</p>
                    </div>

                    <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md">Adresse: </p>
                        <p class="tw-text-neutral-700">{{ newOrder.adresse }}</p>
                    </div>
                    <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md tw-mb-2">Confirmation: </p>
                        <OrderConfirmation :order="newOrder" @update="updateConfirmation" :confirmation="newOrder.confirmation" :id="newOrder.id" />
                    </div>
                    <div v-if="newOrder.confirmation === 'confirmer'" class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md tw-mb-2">Affectation: </p>
                        <OrderAffectation :order="newOrder" :affectation="newOrder.affectation" :id="newOrder.id" />
                    </div>
                    <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
                        <p class="tw-text-neutral-400 tw-text-md tw-mb-2">Upsell: </p>
                        <OrderUpsell :order="newOrder" @update="updateUpsell" :upsell="newOrder.upsell" :id="newOrder.id" />
                    </div>
                </div>
            </div>

            <div  class="tw-flex tw-gap-2 tw-justify-end">
                <v-btn v-if="newOrder.upsell == 'oui' || true" @click="showUpdatePopup = true" color="blue" variant="flat" class="text-capitalize">
                    <span class="text-white">
                        Edit
                    </span>
                </v-btn>
                <v-btn @click="clearOrder" color="primary-color" variant="flat" class="text-capitalize">
                    <span class="text-white">
                        Save
                    </span>
                </v-btn>
            </div>
        </div>

        <div v-if="isLoaded && !isOrderExists">
            <p class="tw-text-neutral-400 tw-py-5">No Order was found !</p>
        </div>

      </div>
    </div>

    <popup-full  :visible="showUpdatePopup" @cancel="handleCancel">
        <div class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5">
            <h1 class="tw-text-lg">Update Order</h1>
            
            <div class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5">
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Client
                    </div>
                    <input v-model="popupOrder.fullname" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-0 tw-text-xs">{{ form.fullname.message }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Phone
                    </div>
                    <input v-model="popupOrder.phone" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.phone.message }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        City
                    </div>
                    <select
                    v-model="popupOrder.city"
                    class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
                    >
                      <option selected disabled :value="popupOrder.city">{{ popupOrder.city }}</option>
                      <option :value="c.name" v-for="c in cities" :key="c.id">
                        {{ c.name }}
                      </option>
                    </select>
                    <!-- <input v-model="popupOrder.city" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"> -->
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.city.message }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Address
                    </div>
                    <input v-model="popupOrder.adresse" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.adresse.message }}</div>
                </div>
                <div v-if="newOrder.upsell == 'oui'" class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Quantity
                    </div>
                    <input v-model="popupOrder.quantity" type="number" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.quantity.message }}</div>
                </div>
                <div v-if="newOrder.upsell == 'oui'" class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Price
                    </div>
                    <input v-model="popupOrder.price" type="number" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.price.message }}</div>
                </div>
            </div>

            <div  class="tw-flex tw-gap-2 mt-3 mb-2 tw-justify-end">
                <v-btn @click="handleCancel" color="grey-darken-2" variant="flat" class="text-capitalize">
                    <span class="text-white">
                        Cancel
                    </span>
                </v-btn>
                <v-btn :loading="isLoading" @click="updateOrder" color="primary-color" variant="flat" class="text-capitalize">
                    <span class="text-white">
                        Save
                    </span>
                </v-btn>
            </div>
        </div>
    </popup-full>
  </div>
</template>

<script>
import OrderConfirmation from '@/views/order/partials/OrderConfirmation'
import OrderAffectation from '@/views/order/partials/OrderAffectation'
import OrderUpsell from '@/views/order/partials/OrderUpsell'
import Sale from '@/api/Sale';
import User from '@/api/User';
import { validateName } from '@/helpers/validators';

export default {
    components: { OrderConfirmation, OrderAffectation, OrderUpsell },
  data() {
    return {
        isOrderExists: false,
        isLoaded: false,
        isLoading: false,
        showUpdatePopup: false,

        form: {
            fullname: {
                valid: true,
                message: ''
            },
            phone: {
                valid: true,
                message: ''
            },
            city: {
                valid: true,
                message: ''
            },
            adresse: {
                valid: true,
                message: ''
            },
            quantity: {
                valid: true,
                message: ''
            },
            price: {
                valid: true,
                message: ''
            }
        },
        
        newOrder: null,
        popupOrder: null
    };
  },

  computed: {
    deliveries() {
        return this.$store.getters['user/deliveries']
    },
    isFormValid() {
        return this.form.fullname.valid
        && this.form.phone.valid
        && this.form.city.valid
        && this.form.adresse.valid
        && this.form.quantity.valid
        && this.form.price.valid
    },
    cities() {
      return this.$store.getters['city/cities']
    }
  },

  methods: {
    updateConfirmation(newValue) {
        console.log(newValue);
        this.newOrder.confirmation = newValue
    },
    updateUpsell(newValue) {
        this.newOrder.upsell = newValue
        this.popupOrder.upsell = newValue
    },
    handleCancel() {
        this.showUpdatePopup = false
        this.popupOrder = {...this.newOrder}
    },
    validateForm() {
        this.form.fullname = validateName(this.popupOrder.fullname, 'Client')
        this.form.phone = validateName(this.popupOrder.phone, 'Phone')
        this.form.city = validateName(this.popupOrder.city, 'City')
        this.form.adresse = validateName(this.popupOrder.adresse, 'Address')
        this.form.quantity = validateName(this.popupOrder.quantity, 'Quantity')
        this.form.price = validateName(this.popupOrder.price, 'Price')
    },
    clearOrder() {
        if(!this.newOrder.confirmation) {
            this.$alert({
                type: 'warning',
                title: 'Order confirmation not changed'
            })
            return false
        }
        this.isOrderExists = false;
    },
    updateOrder() {
        this.validateForm()
        if(!this.isFormValid) return false;
        this.isLoading = true
        this.newOrder = {...this.popupOrder}
        Sale.update(this.newOrder.id, this.newOrder)
        .then(
            res => {
            if(res.data.code == 'SUCCESS') {
                
                this.showUpdatePopup = false
                this.$alert({
                    type: 'success',
                    title: 'Order updated'
                })

                this.$store.dispatch('order/setOrder', this.newOrder)
            }
            }
        )
        .catch(
            (err) => {
            this.$handleApiError(err)
        })
        .finally(
            () => {
            this.isLoading = false
            }
        )
    },
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

                if (res.data.code === "SUCCESS") {
                    console.log('order exists...');
                    if(res.data.data?.orders) {
                        console.log('order set');
                        const order = res.data.data.orders
                        this.newOrder = order;
                        this.popupOrder = {...order};
                        this.$store.dispatch('order/setOrder', this.order)
                        this.isLoaded = true
                        this.isOrderExists = true
                    }
                }

                if (res.data.code == 'NO_ORDERS') {
                    this.isOrderExists = false;
                }
            }
        )
        .catch(this.$handleApiError)
        .finally(() => {
            this.isLoaded = true
        });
    },
    getOrder() {
        Sale.agenteGetOrder().then(
            res => {
                if (res.data.code === "SUCCESS") {
                    const order = res.data.data.orders[0]
                    console.log(order);
                    this.newOrder = order;
                    this.popupOrder = {...order};
                    this.$store.dispatch('order/setOrder', this.order)

                    this.isLoaded = true
                    this.isOrderExists = true
                }

                if (res.data.code === 'NO_ORDER') {
                    this.isLoaded = true;
                }
            },
            err => {
                this.$handleApiError(err)
                this.isLoaded = true
            }
        );
    },
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

  async mounted() {
    this.getOrder()
    if(this.deliveries.length == 0) {
        this.getDeliveries()
    }
  },
};
</script>

<style>
</style>