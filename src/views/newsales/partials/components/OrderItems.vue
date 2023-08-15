<template>
  <div>
    <p
      v-if="!items.length"
      class="tw-col-span-12 tw-rounded-lg tw-text-center tw-p-5 tw-text-gray-700 tw-bg-gray-50"
    >
      No Order items
    </p>

    <div v-if="items.length" class="md:tw-col-span-12 tw-col-span-12">
      <div class="tw-max-w-full tw-overflow-auto">
        <table
          :key="items.length"
          class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500 "
        >
          <thead class="tw-text-xs tw-text-gray-700 tw-uppercase !tw-rounded-t-lg tw-border tw-border-solid">
            <tr class="tw-bg-gray-50">
              <th
                v-for="column in [
                  'product',
                  '',
                  'variation',
                  'quantity',
                  'price',
                  'actions',
                ]"
                :class="[column == 'actions' && '!tw-w-[40px]']"
                :key="column"
                scope="col"
                class="tw-px-6 tw-py-3 text-truncate"
              >
                <div
                  class="tw-w-fit tw-flex tw-whitespace-nowrap tw-capitalize"
                >
                  {{ column }}
                </div>
              </th>
            </tr>
          </thead>

          <tbody v-if="productsFetched">
            <template v-for="(i) in items" :key="i.id">
              <ItemRow :item="i" :products="products" @delete="deleteItem" @update="updateItem" />
            </template>

            <tr>
              <td colspan="3">
              </td>
              <td>
                <div class="tw-p-2">
                  <p>Total: </p>
                </div>
              </td>
              <td colspan="2" class="tw-p-2">
                <div class="tw-p-2 tw-py-1 tw-text-sm tw-text-green-500 tw-w-24 tw-font-medium tw-block  focus:tw-outline-none tw-shadow-sm tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500">
                  <p>{{ currency }} {{price}}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="6">
                <div class="tw-flex tw-justify-end tw-items-center tw-py-3">
                  <button @click="addItem" class="tw-flex tw-items-center tw-justify-center  tw-px-5 tw-py-2 tw-text-sm tw-tracking-wide tw-text-white tw-transition-colors tw-duration-200 tw-bg-orange-400 tw-rounded-lg shrink-0 sm:tw-w-auto tw-gap-x-2 hover:tw-bg-orange-600 darkx:hover:tw-bg-orange-500 darkx:tw-bg-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-w-5 tw-h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>

                      <span>Add Item</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="6">
                <div class="tw-scale-75 tw-p-5">
                  <loading />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ItemRow from '@/views/followup/partials/components/ItemRow';
import { currency } from '@/config/config';
import { getPrice } from '@/helpers/methods';

export default {
  components: { ItemRow },

  props: {
    items: {
      required: true,
      default: [],
    },
    error: {
      required: false,
      default: null
    },
    products: {
      required: true,
    },
    productsFetched: {
      required: true,
      default: false
    },
    order: {
      required: true,
    }
  },

  data() {
    return {
      currency: currency
    }
  },

  computed: {
    price() {
      return getPrice(this.order)
    }
  },

  methods: {
    updateItem(item) {
      const items = this.items.map(i => i.id == item.id ? item : i);
      this.$emit('update:items', items);
    },

    deleteItem(id) {
      const items = this.items.filter(i => i.id != id);
      this.$emit('update:items', items);
    },

    addItem() {
      // Find the last item in the list
      const lastItem = this.items.length > 0 ? this.items[this.items.length - 1] : 1;

      // Get the last ID and add 1 to it
      const newId = lastItem ? lastItem.id + 1 : 1;

      const item = {
        id: newId,
        quantity: 0,
        price: 0,
        product_variation_id: 0,
        product_id: 0
      }
      const newItems = [...this.items, item];

      this.$emit('update:items', newItems);
    },
  },

  mounted() {

  }
};
</script>

<style>
</style>