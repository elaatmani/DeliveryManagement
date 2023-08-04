<template>
  <div>
    <h1 class="tw-mb-2 tw-font-medium">Offers</h1>
    <div>
        <div class="tw-relative tw-overflow-x-auto tw-border-b sm:tw-rounded">
        <table
          class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500"
        >

          <thead
            class="tw-text-xs tw-text-gray-700 tw-bg-gray-50 "
          >
            <tr>
              <th scope="col" class="tw-px-6 tw-py-3">Product Name</th>
              <th scope="col" class="tw-px-6 tw-py-3 tw-w-32">Quantity</th>
              <th scope="col" class="tw-px-6 tw-py-3 tw-w-32">Price</th>
              <th scope="col" class="tw-px-6 tw-py-3">Note</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="offer in offers"
              :key="offer.key"
              class="odd:tw-bg-white even:tw-bg-gray-50 tw-border-b "
            >
              <td class="tw-px-6 tw-py-4">{{ getProduct(offer.product_id)?.name }}</td>
              <td class="tw-px-6 tw-py-4">{{ offer.quantity }}</td>
              <td class="tw-px-6 tw-py-4">{{ offer.price }} {{ currency }}</td>
              <td class="tw-px-6 tw-py-4">
                <p class="tw-max-w-[250px] tw-text-sm">
                  {{ offer.note }}
                </p>
              </td>
            </tr>
            <tr v-if="offers.length == 0">
              <td colspan="5">
                <p class="tw-text-center tw-p-5">
                  No Offers
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@/config/config';
export default {
    props: [ 'productIds' ],

    data() {
        return {
            currency
        }
    },

    computed: {
        products() {
            return this.$store.getters["product/products"];
        },
        offers() {
            return this.products.filter(p => this.productIds.includes(p.id)).flatMap(p => p.offers)
        }
    },

    methods: {
        getProduct(id) {
            return this.products.find(p => p.id == id)
        }
    }
}
</script>

<style>

</style>