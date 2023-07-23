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
          <div class="tw-grid tw-grid-cols-12 tw-gap-2">
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center tw-justify-between tw-flex-wrap">
              <p class="tw-font-light tw-text-neutral-500">Name:</p>
              <p class="tw-text-neutral-800 tw-font-medium tw-px-3">{{ product.name }}</p>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center tw-justify-between tw-flex-wrap">
              <p class="tw-font-light tw-text-neutral-500">Reference:</p>
              <p class="tw-text-neutral-800 tw-font-medium tw-px-3">{{ product.ref }}</p>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center tw-justify-between tw-flex-wrap">
              <p class="tw-font-light tw-text-neutral-500">Buying Price:</p>
              <p class="tw-text-neutral-800 tw-font-medium tw-px-3">{{ product.buying_price }} {{currency}}</p>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center tw-justify-between tw-flex-wrap">
              <p class="tw-font-light tw-text-neutral-500">Selling Price:</p>
              <p class="tw-text-neutral-800 tw-font-medium tw-px-3">{{ product.selling_price }} {{currency}}</p>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center tw-justify-between tw-flex-wrap">
              <p class="tw-font-light tw-text-neutral-500">Total Delivered:</p>
              <p class="tw-text-neutral-800 tw-font-medium tw-px-3">{{ qtyTotalDelivered }}</p>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-gap-2 tw-items-center tw-justify-between tw-flex-wrap">
              <p class="tw-font-light tw-text-neutral-500">Total Sent:</p>
              <p class="tw-text-neutral-800 tw-font-medium tw-px-3">{{ qtyTotalSent }}</p>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-12 tw-flex tw-gap-2 tw-flex-col tw-flex-wrap">
              <p class="tw-font-light tw-text-neutral-500">Description:</p>
              <p class="tw-text-neutral-800 tw-font-medium">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h1 v-if="isLoaded" class="tw-text-neutral-700 tw-font-bold tw-mb-1 tw-mt-5">Tracking</h1>
    <div v-if="isLoaded" class="tw-border bg-white tw-w-full tw-rounded-md">
      <ProductTracking :product="product" />
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
                                </div>
                            </td>
                            <td class="tw-px-6 tw-py-2">
                              {{ variant.stockAlert }}
                          </td>
                        </tr>
                        <tr class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                            <th scope="row" class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900">
                                
                            </th>
                            <th scope="row" class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900">
                                
                            </th>
                            <td class="tw-px-6 tw-py-2">
                                
                            </td>
                            <td class="tw-px-6 tw-py-2">
                                <div class="tw-flex tw-flex-col tw-font-medium">
                                  <span>Total: {{ qtyTotal }}</span>
                                </div>
                            </td>
                            <td class="tw-px-6 tw-py-2">
                            </td>
                        </tr>
                    </tbody>
                </table>
          </div>
        </div>
        
      </div>
    </div>


    

  </div>
</template>

<script>
import Product from '@/api/Product';
import ProductTracking from '@/views/product/ProductTracking'
import { currency } from '@/config/config';

export default {
    components: {  ProductTracking },
    data() {
      return {
        currency,
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
      qtyTotalDelivered() {
        let total = 0;
        this.product.tracking.deliveries.forEach(element => {
          element.product_variations.forEach(i => {
            total += i.total_delivered_quantity;
          })
        });
        this.product.tracking.warehouses.forEach(element => {
          element.product_variations.forEach(i => {
            total += i.total_delivered_quantity;
          })
        });
        return total
      },
      qtyTotalSent() {
        let total = 0;
        this.product.tracking.warehouses.forEach(element => {
          element.product_variations.forEach(i => {
            total += i.movements_total_confirmed_quantity;
            total += i.movements_total_not_confirmed_quantity;
          })
        });
        return total
      },

      qtyTotal() {
        if(this.isLoaded) {

          let total = 0;
          this.product.variations.forEach(element => {
            total += element.quantity;
          });
          return total
      }
      return 0
      }

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
        },
    },

    mounted() {
        this.getProduct()
    }

}
</script>

<style>

</style>