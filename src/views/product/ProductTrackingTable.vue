<template>
  <div class="tw-mt-5">
      <div class="tw-max-w-full tw-overflow-auto">
        <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
          <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
            <tr>
              <th
                v-for="column in [
                  'id',
                  'name',
                  'quantity',
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
          <tbody>
            <tr
              v-for="item in items"
              :key="item.id"
              class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50"
            >
              <th
                scope="row"
                class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
              >
                {{ item.id }}
              </th>
              <th
                scope="row"
                class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
              >
                {{ item.name }}
              </th>
              <td class="tw-px-6 tw-py-2">
                {{ get_total_quantity(item.product_variations) }}
              </td>
                <td class="tw-flex tw-items-center tw-px-6 tw-py-2 tw-space-x-3">
                    <div>
                        <ShowProductVariantActions :source="item"  />
                    </div>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import ShowProductVariantActions from '@/views/product/ShowProductVariantActions'
export default {
    // source: ['warehouse', 'delivery'];
    props: ['product', 'source'],

    components: {ShowProductVariantActions},

    computed: {
        items() {
            return this.product.tracking[this.source]
            // console.log(this.source);
            // console.log(this.product.tracking['warehouses']);
            // return []
        }
    },

    methods: {
        get_total_quantity(variations) {
            let total = 0;
            variations.forEach(i => {
                total += i.on_hand_quantity
            });

            return total
        }
    },

    mounted() {
        console.log(this.product);
    }
};
</script>

<style>
</style>