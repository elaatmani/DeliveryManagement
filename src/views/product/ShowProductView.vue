<template>
  <div class="tw-pb-14">
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Product</h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Show product informations</h2>
    </div>

    <div v-if="!isLoaded">
      <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <div>
        <div>
          <!-- <h1 class="tw-text-neutral-700 tw-font-bold tw-mb-2">Informations</h1> -->
          <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-my-2">
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center">
              <p class="tw-font-medium tw-underline tw-underline-offset-2">Name:</p>
              <p class="tw-text-neutral-700">{{ product.name }}</p>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center">
              <p class="tw-font-medium tw-underline tw-underline-offset-2">Ref:</p>
              <p class="tw-text-neutral-700">{{ product.ref }}</p>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center">
              <p class="tw-font-medium tw-underline tw-underline-offset-2">Buying Price:</p>
              <p class="tw-text-neutral-700">{{ product.buying_price }}DH</p>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center">
              <p class="tw-font-medium tw-underline tw-underline-offset-2">Selling Price:</p>
              <p class="tw-text-neutral-700">{{ product.selling_price }}DH</p>
            </div>
            <div class="tw-col-span-12 tw-flex tw-flex-col tw-gap-1">
              <p class="tw-font-medium tw-underline tw-underline-offset-2">Description:</p>
              <p class="tw-text-neutral-700">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h1 v-if="isLoaded" class="tw-text-neutral-700 tw-font-bold tw-mt-5 tw-mb-1">Variations</h1>
    <div v-if="isLoaded" class="tw-overflow-hidden tw-border bg-white tw-w-full tw-rounded-md">
      <div>

        <div>
          <div class="tw-max-w-full tw-overflow-auto">
            <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
                    <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                        <tr>
                            <th v-for="column in ['id', 'size', 'color', 'qty','Stock Alert']" :class="[column == 'actions' && '!tw-w-[40px]']" :key="column" scope="col" class="tw-px-6 tw-py-3 text-truncate">
                                <div class="tw-w-fit tw-flex tw-whitespace-nowrap tw-capitalize">
                                    {{ column }}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="variant in product.variations" :key="variant.id" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                            <th scope="row" class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900">
                                {{ variant.id }}
                            </th>
                            <th scope="row" class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900">
                                {{ variant.size }}
                            </th>
                            <td class="tw-px-6 tw-py-2">
                                {{ variant.color }}
                            </td>
                            <td class="tw-px-6 tw-py-2">
                                <div class="tw-flex tw-flex-col">
                                  <span>Initial: {{ variant.quantity }}</span>
                                  <p class="tw-text-green-500">
                                    Available: 
                                  <span v-if="!!variant.created_at" class="tw-text-xs tw-text-green-500">{{ variant.available_quantity }}</span>
                                  </p>
                                </div>
                            </td>
                            <td class="tw-px-6 tw-py-2">
                              {{ variant.stockAlert }}
                          </td>
                        </tr>
                    </tbody>
                </table>
          </div>
        </div>
        
      </div>
    </div>


    <h1 v-if="isLoaded" class="tw-text-neutral-700 tw-font-bold tw-mb-1 tw-mt-5">Tracking</h1>
    <div v-if="isLoaded" class="tw-border bg-white tw-w-full tw-rounded-md">
      <ProductTracking :product="product" />
    </div>

    <div v-if="isLoaded && false" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <div>

        <div>
          <div class="tw-max-w-full tw-overflow-auto">
            <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
                    <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                        <tr>
                            <th v-for="column in ['id', 'size', 'color', 'qty','Stock Alert' ,'actions']" :class="[column == 'actions' && '!tw-w-[40px]']" :key="column" scope="col" class="tw-px-6 tw-py-3 text-truncate">
                                <div class="tw-w-fit tw-flex tw-whitespace-nowrap tw-capitalize">
                                    {{ column }}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="variant in product.variations" :key="variant.id" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                            <th scope="row" class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900">
                                {{ variant.id }}
                            </th>
                            <th scope="row" class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900">
                                {{ variant.size }}
                            </th>
                            <td class="tw-px-6 tw-py-2">
                                {{ variant.color }}
                            </td>
                            <td class="tw-px-6 tw-py-2">
                                <div class="tw-flex tw-flex-col">
                                  <span>Initial: {{ variant.quantity }}</span>
                                  <p class="tw-text-green-500">
                                    Available: 
                                  <span v-if="!!variant.created_at" class="tw-text-xs tw-text-green-500">{{ variant.available_quantity }}</span>
                                  </p>
                                </div>
                            </td>
                            <td class="tw-px-6 tw-py-2">
                              {{ variant.stockAlert }}
                          </td>
                            <td class="tw-flex tw-items-center tw-px-6 tw-py-2 tw-space-x-3">
                                <div>
                                  <ShowProductVariantActions :variant="variant" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
          </div>
        </div>
        

      
      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn :to="{ name: 'product/list' }" color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Return</span>
        </v-btn>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/api/Product';
import ShowProductVariantActions from '@/views/product/ShowProductVariantActions'
import ProductTracking from '@/views/product/ProductTracking'

export default {
    components: { ShowProductVariantActions, ProductTracking },
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
      // qtyTotal() {
      //   let total = 0;
      //   this.variants.forEach((variant) => total += parseInt(variant.quantity))
      //   return total
      // }
    },

    methods: {
        getProduct() {
            const id = this.$route.params.id
            Product.getProduct(id).then(
                res => {
                  if(res.data.code == 'SUCCESS') {
                    this.product = res.data.data.products

                    this.isLoaded = true

                  }

                },
                this.$handleApiError
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