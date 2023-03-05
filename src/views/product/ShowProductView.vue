<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Product</h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Show product informations</h2>
    </div>

    <div v-if="!isLoaded">
      <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <div>

        <v-row>
          <v-col cols="12" md="6" class="tw-py-2">
            <v-row class="tw-mt-5">
              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Product Name</div>
                  <div class="tw-py-2 tw-w-full tw-px-2  tw-rounded-lg tw-text-orange-600">{{ product.name }}</div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Reference</div>
                  <div class="tw-py-2 tw-w-full tw-px-2 tw-rounded-lg tw-text-orange-600">{{ product.reference }}</div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6" >
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Buying Price (DH)</div>
                  <div class="tw-py-2 tw-w-full tw-px-2 tw-rounded-lg tw-text-orange-600">{{ product.buyingPrice }}</div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6" >
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Selling Price (DH)</div>
                  <div class="tw-py-2 tw-w-full tw-px-2 tw-rounded-lg tw-text-orange-600">{{ product.sellingPrice }}</div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6" >
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity Total</div>
                  <div class="tw-py-2 tw-w-full tw-px-2 tw-rounded-lg tw-text-orange-600">{{ qtyTotal }}</div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12">
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Description</div>
                  <div class="tw-py-2 tw-w-full tw-px-2 tw-rounded-lg tw-text-orange-600">{{ product.description }}</div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class=" tw-py-2">
            <div>
              
              <div class="">
                <div class="tw-flex tw-justify-between tw-items-center  tw-mt-5">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Variants</div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Quantity Total: {{ qtyTotal }}
                  </div>
                </div>
                <div v-if="variants.length == 0" :class="{'tw-bg-neutral-100 tw-text-neutral-500': formStatus.variants.valid, 'tw-bg-red-100 tw-text-red-500': !formStatus.variants.valid}" class="tw-text-center tw-mb-6  tw-w-full tw-py-3 tw-rounded-lg">
                  {{ formStatus.variants.valid ? 'No Variants yet' : formStatus.variants.message }}
                </div>
                <div v-else class="tw-bg-white tw-text-neutral-500 tw-pb-3 tw-rounded-lg">
                  <div v-for="variant in variants" :key="variant.id" class="tw-bg-neutral-200/30 tw-rounded-lg">
                    <div class="tw-grid tw-grid-cols-12 tw-text-md tw-gap-5 tw-items-center tw-my-2">
                      <div class="tw-flex tw-items-center tw-gap-5 tw-col-span-4 tw-break-words tw-py-1 tw-px-2 tw-rounded-md ">
                        <v-icon size="x-small" color="primary-color">mdi-format-size</v-icon>
                        {{ variant.size }}
                      </div>
                      <div class="tw-flex tw-items-center tw-gap-5 tw-col-span-4 tw-break-words tw-py-1 tw-px-2 tw-rounded-md ">
                        <v-icon size="x-small" color="primary-color">mdi-palette</v-icon>
                        {{ variant.color }}
                      </div>
                      <div class="tw-flex tw-items-center tw-gap-5 tw-col-span-4 tw-break-words tw-py-1 tw-px-2 tw-rounded-md ">
                        <v-icon size="x-small" color="primary-color">mdi-inbox-multiple-outline</v-icon>
                        {{ variant.quantity }}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              
            </div>
          </v-col>
        </v-row>

        <v-row>
          
          
        </v-row>
      </div>

      <div>
        <v-row>
          
        </v-row>
      </div>

      
      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn :to="{ name: 'product/list' }" color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Return</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/api/Product';
export default {
    data() {
      return {
        isLoading: false,
        isLoaded: false,

        variantId: 1,
        variants: [],

        product: {  
          name: '',
          reference: '',
          buyingPrice: 0,
          sellingPrice: 0,
          description: ''
        },
      }

    },

    computed: {
      qtyTotal() {
        let total = 0;
        this.variants.forEach((variant) => total += parseInt(variant.quantity))
        return total
      }
    },

    methods: {
        getProduct() {
            const id = this.$route.params.id
            Product.getProduct(id).then(
                res => {
                    const product = res.data.data.products
                    this.product = {
                        name: product.name,
                        reference: product.ref,
                        buyingPrice: product.buying_price,
                        sellingPrice: product.selling_price,
                        description: product.description
                    }

                    this.variants = product.variations

                    this.isLoaded = true
                }
            )
        }
    },

    mounted() {
        this.getProduct()
    }

}
</script>

<style>

</style>