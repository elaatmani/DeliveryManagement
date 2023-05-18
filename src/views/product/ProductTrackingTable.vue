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
                <div v-if="source == 'warehouses'" class="tw-text-emerald-500">
                  {{ get_total_quantity(item.product_variations) }}
                </div>
                <div v-if="source == 'deliveries'">
                  <div class=" tw-border-b tw-pb-1 tw-mb-1 tw-w-fit">
                    <div class="tw-text-pink-400">
                      Expidier: {{ get_total_quantity(item.product_variations, 'expidier_quantity') }}
                    </div>
                    <div class="tw-text-green-400">
                      Livrer: {{ get_total_quantity(item.product_variations, 'delivery_quantity') }}
                    </div>
                    <div class="tw-text-orange-400 tw-flex tw-items-center tw-gap-2">
                      <span>On Hand:</span>
                      <span class="tw-text-orange-400">{{ get_total_quantity(item.product_variations, 'movements_confirmed_quantity') }}</span>
                      <span class="tw-text-black">/</span>
                      <span class="tw-text-red-400">{{ get_total_quantity(item.product_variations, 'movements_not_confirmed_quantity') }}</span>
                    </div>
                  </div>
                  <div class="tw-font-bold">
                    Total: {{ get_total_quantity(item.product_variations, 'left_quantity') }}
                  </div>
                </div>
              </td>
                <td  class="tw-flex tw-items-center tw-px-6 tw-py-2 tw-space-x-3">
                    <div>
                        <ShowProductVariantActions :type="source"  :source="item"  />
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
    // source: ['warehouses', 'deliveries'];
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
        get_total_quantity(variations, type = 'on_hand_quantity') {
            let total = 0;
            variations.forEach(i => {
                total += i[type]
            });

            return total
        }
    },

    mounted() {
        console.log(this.source);
    }
};
</script>

<style>
</style>