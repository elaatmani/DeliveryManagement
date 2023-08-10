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
            <template v-for="(i, index) in items" :key="i.id">
              <ItemRow :item="i" @update="newItem => updateItem(newItem, index)" />
            </template>
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

export default {
  components: { ItemRow },

  props: {
    items: {
      required: true,
      default: [],
    },
    products: {
      required: true,
    },
    productsFetched: {
      required: true,
      default: false
    }
  },

  data() {
    return {

    }
  },

  methods: {
    updateItem(item) {
      console.log(item);
    },
  },

  mounted() {
    
  }
};
</script>

<style>
</style>