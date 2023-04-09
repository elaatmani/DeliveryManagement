<template>
  <div>
    <v-btn v-if="$can(`update_sale`) || true" @click="showUpdatePopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>
    <v-btn v-if="$can(`view_sale`) || true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
    </v-btn>
    <v-btn @click="showPopup = true" v-if="$can(`delete_sale`) || true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
    </v-btn>
    <popup-full @cancel="showUpdatePopup = false" :visible="showUpdatePopup" >
        <div class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5">
            <h1 class="tw-text-lg">Update Order</h1>
            
            <div class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5">
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Client
                    </div>
                    <input v-model="fullname" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-0 tw-text-xs">{{ 'Client name could not be empty' }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Phone
                    </div>
                    <input v-model="phone" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ '' }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        City
                    </div>
                    <input v-model="city" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ '' }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Address
                    </div>
                    <input v-model="adresse" type="text" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ '' }}</div>
                </div>
                <div class="md:tw-col-span-6 tw-col-span-12">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                        Quantity
                    </div>
                    <input v-model="quantity" type="number" class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500">
                    
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ '' }}</div>
                </div>
            </div>

            <div  class="tw-flex tw-gap-2 mt-3 mb-2 tw-justify-end">
                <v-btn :loading="isLoading" @click="updateOrder" color="primary-color" variant="flat" class="text-capitalize">
                    <span class="text-white">
                        Save
                    </span>
                </v-btn>
            </div>
        </div>
    </popup-full>
    <!--  -->
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this sale?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" />
  </div>
</template>
<script>
import Sale from '@/api/Sale';


// your vue component
export default {
  // access any cell properties here
  props: [ "sale"],
  name: "saleActions",
  data() {
    return {
      showPopup: false,
      showUpdatePopup: false,
      isLoading: false,

      fullname: '',
        phone: '',
        city: '',
        adresse: '',
        quantity: 1
    };
  },
  methods: {
    updateOrder() {
        this.isLoading = true
        setTimeout(() => {
            this.isLoading = false
            this.showUpdatePopup = false
            this.$alert({
                type: 'success',
                title: 'Order updated'
            })
        }, 1000)
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
  },

  mounted() {
    this.fullname = this.sale.fullname
    this.city = this.sale.city
    this.adresse = this.sale.adresse
    this.quantity = this.sale.quantity
    this.phone = this.sale.phone
  }
};
</script>