<template>
  <div v-if="newSale">
    <v-btn link target="_blank" :href="'https://api.whatsapp.com/send?phone=' + sale.phone.replace('+', '').replace('-', '').replace(' ', '')" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-whatsapp</v-icon>
    </v-btn>
    <v-btn v-if="$can(`update_sale`)" @click="showUpdatePopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>
    <v-btn v-if="$can(`view_sale`) && false" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
    </v-btn>
    <v-btn @click="showPopup = true" v-if="$can(`delete_sale`) && false" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
    </v-btn>
    <v-btn @click="showHistoryPopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="teal" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-sort-clock-ascending-outline</v-icon>
    </v-btn>
    <popup-full @cancel="showUpdatePopup = false" :visible="false" >
        <div class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5">
            <h1 class="tw-text-lg">Update Order</h1>
            
            <div class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5">
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Client
                    </div>
                    <input v-model="newSale.fullname" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-0 tw-text-xs">{{ form.fullname.message }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Phone
                    </div>
                    <input v-model="newSale.phone" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.phone.message }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        City
                    </div>
                    <select
                    v-model="newSale.city"
                    class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
                    >
                      <option selected disabled :value="newSale.city">{{ newSale.city }}</option>
                      <option :value="c.name" v-for="c in cities" :key="c.id">
                        {{ c.name }}
                      </option>
                    </select>
                    <!-- <input v-model="newSale.city" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"> -->
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.city.message }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Address
                    </div>
                    <input v-model="newSale.adresse" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.adresse.message }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Quantity
                    </div>
                    <input v-model="newSale.quantity" type="number" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.quantity.message }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Price
                    </div>
                      <input v-model="newSale.price" type="number" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.price.message }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Note
                    </div>
                    <textarea v-model="newSale.note" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"></textarea>
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ form.note.message }}</div>
                </div>
            </div>

            <div  class="tw-flex tw-gap-2 mt-3 mb-2 tw-justify-end">
              <v-btn @click="showUpdatePopup = false" color="grey-darken-2" variant="flat" class="text-capitalize">
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

    <popup-full :visible="showHistoryPopup" @cancel="showHistoryPopup = false">
      <SaleHistory @cancel="showHistoryPopup = false" v-if="showHistoryPopup" :sale="sale" />
    </popup-full>

    <UpdateSale v-model:visible="showUpdatePopup" :order="sale" />

    <!--  -->
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this sale?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" />
  </div>
</template>
<script>
import Sale from '@/api/Sale';
import SaleHistory from '@/views/sale/partials/SaleHistory'
import UpdateSale from '@/views/sale/partials/UpdateSale'
import { validateName } from '@/helpers/validators';


// your vue component
export default {
  // access any cell properties here
  props: [ "sale"],
  name: "saleActions",
  components: { SaleHistory, UpdateSale },
  data() {
    return {
      showPopup: false,
      showUpdatePopup: false,
      showHistoryPopup: false,
      isLoading: false,

      newSale: null,

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
            },
            note: {
                valid: true,
                message: ''
            }
        },

    };
  },
  computed: {
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
    validateForm() {
        this.form.fullname = validateName(this.newSale.fullname, 'Client')
        this.form.phone = validateName(this.newSale.phone, 'Phone')
        this.form.city = validateName(this.newSale.city, 'City')
        this.form.adresse = validateName(this.newSale.adresse, 'Address')
        this.form.quantity = validateName(this.newSale.quantity, 'Quantity')
        this.form.price = validateName(this.newSale.price, 'Price')
    },
    handleResolved(response) {
      if(response) {
        this.isLoading = true
        Sale.delete(this.sale.id)
        .then((res) => {
          if (res.data.code == 'SALE_DELETED') {
            this.isLoading = false
            this.$alert({
              type: 'success',
              title: 'Sale Deleted Successfully'
            })
          }
          Sale.all().then(res => {
            if(res.data.code == 'SUCCESS') {
                const sales = res.data.data.orders
                this.$store.dispatch('sale/setSales', sales)
            }
          }).catch(this.$handleApiError)

        })
        .catch(this.$handleApiError)
        .finally(() => {
          this.isLoading = false
          this.showPopup = false
        });
      } else {
        this.showPopup = false
      }
    },
    update() {
      this.validateForm()
        if(!this.isFormValid) return false;
      this.isLoading = true
      Sale.update(this.newSale.id, this.newSale)
      .then(
        res => {
          if(res.data.code == 'SUCCESS') {
            
            this.showUpdatePopup = false
            this.$alert({
                type: 'success',
                title: 'Order updated'
            })

            this.$store.dispatch('sale/update', { id: this.newSale.id, sale: this.newSale })
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
    }
  },

  mounted() {
    this.newSale = {...this.sale};
  }
};
</script>