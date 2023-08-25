<template>
  <div v-if="offers.length">
    <label
        class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
        >Offers</label
      >

    <div class="md:tw-col-span-12 tw-col-span-12">
      <div class="tw-max-w-full tw-overflow-auto">
        <table
          class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500 "
        >
          <thead class="tw-text-xs tw-text-gray-700 !tw-rounded-t-lg tw-border tw-border-solid">
            <tr class="tw-bg-gray-50">
              <th scope="col" class="tw-px-6 tw-py-3">Product Name</th>
              <th scope="col" class="tw-px-6 tw-py-3 tw-w-32">Quantity</th>
              <th scope="col" class="tw-px-6 tw-py-3 tw-w-32">Price</th>
              <th scope="col" class="tw-px-6 tw-py-3">Note</th>
            </tr>
          </thead>

          <tbody>
            <template v-for="(offer) in offers" :key="offer.id">
              <tr
                class="odd:tw-bg-white even:tw-bg-gray-50 tw-border-b "
              >
                <td class="tw-px-3 tw-py-2">{{ getProduct(offer.product_id)?.name }}</td>
                <td class="tw-px-3 tw-py-2">{{ offer.quantity }}</td>
                <td class="tw-px-3 tw-py-2">{{ offer.price }} {{ currency }}</td>
                <td class="tw-px-3 tw-py-2">
                  <p class="tw-max-w-[250px] tw-text-sm">
                    {{ offer.note }}
                  </p>
                </td>
              </tr>
            </template>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { currency } from '@/config/config'

export default {
  props: {
    products: {
      required: true,
    },
    item: {
        required: true,
    },
  },

  data() {
    return {
      currency
    }
  },

  computed: {
    offers() {
      return this.products.filter(p => this.item.items.map(i => i.product_id).includes(p.id)).flatMap(p => p.offers)
    }
  },

  methods: {
      getProduct(id) {
          return this.products.find(p => p.id == id)
      }
  },

  mounted() {
  }
}
</script>

<style>

</style>