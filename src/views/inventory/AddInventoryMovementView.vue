<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Add Inventory Movement</h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Create New Movement</h2>
    </div>

    <div v-if="!isLoaded">
          <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div>

        <v-row>
            <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Delivery</div>
                  <div class="tw-relative">
                    <select
                    v-model="delivery"
                    class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-capitalize tw-rounded-lg tw-border tw-border-solid tw-cursor-pointer tw-border-neutral-400 focus:tw-border-orange-500"
                    >
                      <option :value="d.id" v-for="d in deliveries" :key="d.id">
                        {{ d.firstname + ' ' + d.lastname }}
                      </option>
                    </select>
                    <v-icon size="small" class="tw-absolute tw-right-3 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
                </div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Product Name</div>
                  <div class="tw-relative">
                    <select
                    :disabled="selectedVariations.length > 0"
                    v-model="product"
                    class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-cursor-pointer tw-border-neutral-400 focus:tw-border-orange-500"
                    >
                      <option :value="p.id" v-for="p in products" :key="p.id">
                        {{ p.name }}
                      </option>
                    </select>
                    <v-icon size="small" class="tw-absolute tw-right-3 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
                </div>
                </div>
              </v-col>

              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Variation</div>
                  <div class="tw-relative">
                    <select
                    v-model="variation"
                    class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-cursor-pointer tw-border-neutral-400 focus:tw-border-orange-500"
                    >
                      <option :value="v.id" v-for="v in variations" :key="v.id">
                        {{ v.color + ' / ' + v.size + ' / ' + v.quantity  }}
                      </option>
                    </select>
                    <v-icon size="small" class="tw-absolute tw-right-3 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
                </div>
                </div>
              </v-col>

              <v-col class="!tw-py-2" cols="12" sm="4" md="4">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity</div>
                  <div>
                  <v-text-field type="number" @change="handleQuantityChange"  :hide-details="true" v-model="quantity" clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
                  <!-- <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{  }}</div> -->
                </div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="2" md="2">
                <div class="tw-w-full tw-h-full tw-flex tw-items-end">
                  <v-btn @click="addVariation" color="primary-color" variant="flat" size="large">
                    <span class="text-white text-capitalize">Add</span>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="tw-max-w-full">
                  <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
                      <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                          <tr>
                              <th  scope="col" class="tw-px-4 tw-max-w-[50px] tw-py-3 text-truncate">
                                ID
                              </th>
                              <th scope="col" class="tw-px-6 tw-py-3 text-truncate">
                                SIZE
                              </th>
                              <th scope="col" class="tw-px-4 tw-py-3 text-truncate">
                                COLOR
                              </th>
                              <th scope="col" class="tw-px-4 tw-py-3 text-truncate">
                                QUANTITY
                              </th>
                              <th scope="col" class="tw-px-4 tw-py-3 text-truncate tw-max-w-[50px]">
                                ACTIONS
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(item) in selectedVariations" :key="item.id" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                              <td class="tw-w-4 tw-p-4">
                                {{ item.id }}
                              </td>
                              <td class="tw-w-4 tw-p-4">
                                {{ item.size }}
                              </td>
                              <td class="tw-w-4 tw-p-4">
                                {{ item.color }}
                              </td>
                              <td class="tw-w-4 tw-p-4">
                                {{ item.quantity }}
                              </td>
                              <td class="tw-w-4 tw-p-4">
                                <div class="tw-w-fit tw-h-full tw-flex tw-items-end">
                                  <v-btn @click="deleteVariation(item.id)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
                                      <v-icon color="white">mdi-delete-outline</v-icon>
                                      <!-- <span class="text-white text-capitalize">Delete</span> -->
                                    </v-btn>
                                </div>
                              </td>
                          </tr>
                          
                      </tbody>
                  </table>
                </div>
              </v-col>
              
          
        </v-row>
      </div>


      
      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Cancel</span>
        </v-btn>
        <v-btn @click="create" :loading="isLoading" color="primary-color" variant="flat" size="large">
          <span class="text-white text-capitalize">Create</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/api/User'
import Product from '@/api/Product'
import Inventory from '@/api/Inventory'
export default {
    data() {
      return {
        isLoading: false,
        isLoaded: false,
        
        variationId: 0,
        product: 1,
        delivery: 1,
        quantity: 0,
        variation: 0,

        selectedVariations: [
        ],
      }
    },

    computed: {
      products() {
        return this.$store.getters['product/products']
      },
      deliveries() {
        return this.$store.getters['user/deliveries']
      },
      variations() {
        return this.products.find(i => i.id == this.product)
        ?.variations.filter(
          i => {
            let check = true;
            this.selectedVariations.forEach(element => {
              if(i.id == element.id) {
                check =  false;
              }
            });

            return check
          }
        )
      }
    },

    watch: {
      product() {
        if(this.variations.length > 0) {
          this.variation = this.variations[0].id
        } else {
          this.variation = null
        }
      }
    },

    methods: {
      addVariation() {
        if(this.variations.length == 0) return false;

        const selectedVariation = this.variations.find(i => i.id == this.variation)

        if(!selectedVariation) return false;

        if((this.quantity > selectedVariation.quantity) || this.quantity == 0) {
          this.$alert({
            type: 'warning',
            title: 'Quantity should be between 1 and ' + selectedVariation.quantity
          })
          return false;
        }

        const variation = {
          id: selectedVariation.id,
          size: selectedVariation.size,
          color: selectedVariation.color,
          quantity: this.quantity
        }


        this.quantity = 0;

        this.selectedVariations.push(variation)

        if (this.variations.length > 0) {
          this.variation = this.variations[0].id
          // console.log('true', this.variations);
        } else {
          this.variation = null
          // console.log('false', this.variations);
        }
      },

      deleteVariation(id) {
        this.selectedVariations = this.selectedVariations.filter(i => i.id !== id)
        if (this.variations.length == 1) {
          this.variation = this.variations[0].id
        }
      },

      create() {
        if(this.selectedVariations.length == 0) {
          this.$alert({
            type: 'warning',
            title: 'You need to add some variations'
          })
          return false
        }

        let qty = 0;
        this.selectedVariations.forEach(
          i => qty += i.quantity
        )

        this.isLoading = true
        Inventory.inventoryMovementCreate({
          product_id: this.product, 
          delivery_id: this.delivery, 
          variants: this.selectedVariations,
          quantity: this.qty
        })
        .then(
          res => {
            if(res.data.code == 'SUCCESS') {
              this.$alert({
                type: 'success',
                title: res.data.message
              })

              this.selectedVariations = []
              this.getData()
            }

            if (res.data.code == 'ERROR_QUANTITY') {
              this.$alert({
                type: 'warning',
                title: res.data.message
              })
            }
          }
        )
        .finally(
          () => this.isLoading = false
        )
      },
      handleQuantityChange() {
        if (this.quantity <= 0) {
          this.quantity = 0
        }
      },
      async getDeliveries() {
      
          await User.deliveries()
          .then(
              res => {
                  const deliveries = res.data.data;
                  this.$store.dispatch('user/setDeliveries', deliveries);
                  if(deliveries.length > 0) {
                    this.delivery = deliveries[0].id
                  } else {
                    this.delivery = null
                  }
              },
              this.$handleApiError
          )
      },
      getProducts() {
        return Product.all()
        .then(
          res => {
            if (res.data.code == 'SUCCESS') {
              const products = res.data.data.products
              this.$store.dispatch('product/setProducts', products)

              if(products.length > 0) {
                this.product = products[0].id
              } else {
                this.product = null
              }
            }
            
          },
          err => {
            this.$handleApiError(err)
          }
        )
      },
      getData() {
        this.isLoaded = false;
        Promise.allSettled([this.getProducts(), this.getDeliveries()])
        .then(() => {
          this.isLoaded = true
        })
      }
    },

    mounted() {
      this.getData()
    }

}
</script>

<style>

</style>