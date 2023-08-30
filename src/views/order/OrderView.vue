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
                        <div class="tw-py-5" v-if="!!newOrder.product_name">
                            <p class="tw-text-neutral-400 tw-text-md">Original Order: </p>
                            <p>
                            <ul>
                                <li v-for="i in newOrder.product_name.split('\n')" :key="i" class="tw-font-bold">
                                    - {{ i }}
                                </li>
                            </ul>
                            </p>
                        </div>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
                                <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50 ">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Client
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Phone
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Product
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            City
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Adresse
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="tw-bg-white tw-border-b">
                                        <th scope="row" class="px-6 py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap">
                                            {{ newOrder.id }}
                                        </th>
                                        <th scope="row" class="px-6 py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap">
                                            {{ newOrder.fullname }}
                                        </th>
                                        <td class="px-6 py-4 tw-flex tw-items-center">
                                            {{ newOrder.phone }}
                                            <v-btn link target="_blank" :href="'https://api.whatsapp.com/send?phone=' + newOrder.phone.replace('+', '').replace('-', '').replace(' ', '')" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="text" density="comfortable" :ripple="false" size="small">
                                                <v-icon color="green">mdi-whatsapp</v-icon>
                                            </v-btn>
                                        </td>
                                        <td class="px-6 py-4">
                                            <p>
                                            <ul>
                                                <li v-for="i in newOrder.items" :key="i.id" class="tw-font-bold">
                                                    -
                                                    <span
                                                        class="tw-text-orange-500 tw-font-bold tw-pr-1 tw-text-xs"
                                                        >{{ i.quantity }}
                                                    X </span
                                                        >{{ i.product.name }} 
                                                    <span v-if="!!i.product_variation.size">| {{ i.product_variation.size }}</span>
                                                    <span v-if="!!i.product_variation.color">| {{ i.product_variation.color }}</span>
                                                </li>
                                            </ul>
                                            </p>
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ getPrice(newOrder) }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ newOrder.city }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ newOrder.adresse }}
                                        </td>
                                        <td class="px-6 py-4">
                                            <v-btn v-if="newOrder.upsell == 'oui' || true" @click="showUpdatePopup = true"  class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
                                                <v-icon color="white">mdi-pencil-outline</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                        <NewOrder  @update="handleDoubleUpdate" :order="o" v-for="o in doubles.filter(i => i.id != newOrder.id)" :key="o.id" />
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- <div class="md:tw-col-span-6 lg:tw-col-span-3 tw-col-span-12 tw-py-5">
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
                        </div> -->
                    <div  class="tw-flex tw-gap-2 tw-justify-end tw-mt-5">
                        <!-- <v-btn v-if="newOrder.upsell == 'oui' || true" @click="showUpdatePopup = true" color="blue" variant="flat" class="text-capitalize">
                            <span class="text-white">
                                Edit
                            </span>
                        </v-btn> -->
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
        <UpdateOrder @update-order="handleUpdateOrder" v-model:visible="showUpdatePopup" v-if="showUpdatePopup" :order="newOrder" />
    </div>
</template>

<script>
// import OrderConfirmation from '@/views/order/partials/OrderConfirmation'
// import OrderAffectation from '@/views/order/partials/OrderAffectation'
// import OrderUpsell from '@/views/order/partials/OrderUpsell'
import Sale from '@/api/Sale';
import User from '@/api/User';
import { validateName } from '@/helpers/validators';
import UpdateOrder from '@/views/order/partials/UpdateOrder'
import { getPrice } from '@/helpers/methods'
import NewOrder from '@/views/order/partials/NewOrder'

export default {
    components: { UpdateOrder, NewOrder },
  data() {
    return {
        isOrderExists: false,
        isLoaded: false,
        isLoading: false,
        showUpdatePopup: false,

        doubles: [],
        double: false,

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
        this.newOrder.confirmation = newValue
    },
    getPrice(order) {
            return getPrice(order)
        },
    updateUpsell(newValue) {
        this.newOrder.upsell = newValue
        this.popupOrder.upsell = newValue
    },
    handleCancel() {
        this.showUpdatePopup = false
        this.popupOrder = {...this.newOrder}
    },
    handleUpdateOrder(o) {
        this.newOrder = {...o}
    },
    validateForm() {
        this.form.fullname = validateName(this.popupOrder.fullname, 'Client')
        this.form.phone = validateName(this.popupOrder.phone, 'Phone')
        this.form.city = validateName(this.popupOrder.city, 'City')
        this.form.adresse = validateName(this.popupOrder.adresse, 'Address')
        this.form.quantity = validateName(this.popupOrder.quantity, 'Quantity')
        this.form.price = validateName(this.popupOrder.price, 'Price')
    },
    handleDoubleUpdate(order) {
        console.log('order updated: ', order);
        this.doubles = this.doubles.map(o => o.id == order.id ? order : o);
    },
    clearOrder() {
        if(!this.newOrder.confirmation) {
            this.$alert({
                type: 'warning',
                title: 'Order confirmation not changed'
            })
            return false
        }

        if(this.double && this.doubles.some(o => o.id != this.newOrder.id && !o.confirmation)) {
            this.$alert({
                type: 'warning',
                title: 'Double order confirmation not changed'
            })
            return false
        }

        this.isOrderExists = false;
        this.$alert({
            type: 'success',
            title: 'Order Saved Successfully !'
        })
        this.$store.dispatch('order/addOrder', this.newOrder)
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
                        const order = res.data.data.orders
                        this.newOrder = order;
                        this.popupOrder = {...order};
                        this.$store.dispatch('order/setOrder', this.order)
                        this.isLoaded = true;

                        if(res.data.data.double == true) {
                            this.doubles = res.data.data.double_orders
                            this.double = true
                        } else {
                            this.doubles = [];
                            this.double = false;
                        }

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
                    this.newOrder = order;
                    this.popupOrder = {...order};
                    this.$store.dispatch('order/setOrder', this.order);

                    if(res.data.data.double == true) {
                        this.doubles = res.data.data.double_orders
                        this.double = true
                    } else {
                        this.doubles = [];
                        this.double = false;
                    }


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