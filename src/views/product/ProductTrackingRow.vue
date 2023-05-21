<template>
  <tr class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
    <th
      scope="row"
      class=" tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
    >
      <div class="tw-flex tw-items-start tw-h-full">
        {{ item.id }}
      </div>
    </th>
    <th
      scope="row"
      class=" tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
    >
      {{ item.name }}
    </th>
    <td class=" tw-px-6 tw-py-2">
      <div v-if="source == 'warehouses'">
        <div class="tw-w-fit tw-min-w-[200px] tw-flex tw-items-center">
          <button
            @click="showDetails = !showDetails"
            class="tw-bg-blue-400/10 tw-py-1 tw-px-4 tw-rounded tw-text-blue-400 tw-flex tw-gap-2 tw-items-center tw-justify-between"
          >
            <p>Total: {{ get_total_quantity(item.product_variations) }}</p>
            <v-icon>{{
              showDetails ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </button>
        </div>
        <v-expand-transition>
          <div class="tw-h-fit tw-py-2" v-if="showDetails">
            <table>
              <tbody>
                <tr>
                  <td
                    class="tw-px-3 tw-py-1 tw-bg-emerald-100 tw-border tw-text-emerald-500"
                  >
                    Received:
                  </td>
                  <td class="tw-px-3 tw-py-1 tw-border tw-text-emerald-500">
                    {{
                      get_total_quantity(
                        item.product_variations,
                        "movements_total_confirmed_quantity"
                      )
                    }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="tw-px-3 tw-py-1 tw-bg-red-100 tw-text-red-500 tw-border"
                  >
                    Not Received:
                  </td>
                  <td class="tw-px-3 tw-py-1 tw-border tw-text-red-500">
                    {{
                      get_total_quantity(
                        item.product_variations,
                        "movements_total_not_confirmed_quantity"
                      )
                    }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="tw-px-3 tw-py-1 tw-bg-purple-100 tw-border tw-text-purple-500"
                  >
                    Shipped:
                  </td>
                  <td class="tw-px-3 tw-py-1 tw-border tw-text-purple-500">
                    {{
                      get_total_quantity(
                        item.product_variations,
                        "total_shipped_quantity"
                      )
                    }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="tw-px-3 tw-py-1 tw-bg-blue-100 tw-border tw-text-blue-500"
                  >
                    Delivered:
                  </td>
                  <td class="tw-px-3 tw-py-1 tw-border tw-text-blue-500">
                    {{
                      get_total_quantity(
                        item.product_variations,
                        "total_delivered_quantity"
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-expand-transition>
      </div>

      <div v-if="source == 'deliveries'">
        <div class="tw-w-fit tw-min-w-[200px] tw-flex tw-items-center">
          <button
            @click="showDetails = !showDetails"
            class="tw-bg-blue-400/10 tw-py-1 tw-px-4 tw-rounded tw-text-blue-400 tw-flex tw-gap-2 tw-items-center tw-justify-between"
          >
            <p>Total: {{ get_total_quantity(item.product_variations) }}</p>
            <v-icon>{{
              showDetails ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </button>
        </div>
        <v-expand-transition>
          <div class="tw-h-fit tw-py-2" v-if="showDetails">
            <table>
              <tbody>
                <tr>
                  <td
                    class="tw-px-3 tw-py-1 tw-bg-emerald-100 tw-border tw-text-emerald-500"
                  >
                    Received:
                  </td>
                  <td class="tw-px-3 tw-py-1 tw-border tw-text-emerald-500">
                    {{
                      get_total_quantity(
                        item.product_variations,
                        "movements_total_confirmed_quantity"
                      )
                    }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="tw-px-3 tw-py-1 tw-bg-red-100 tw-text-red-500 tw-border"
                  >
                    Not Received:
                  </td>
                  <td class="tw-px-3 tw-py-1 tw-border tw-text-red-500">
                    {{
                      get_total_quantity(
                        item.product_variations,
                        "movements_total_not_confirmed_quantity"
                      )
                    }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="tw-px-3 tw-py-1 tw-bg-purple-100 tw-border tw-text-purple-500"
                  >
                    Shipped:
                  </td>
                  <td class="tw-px-3 tw-py-1 tw-border tw-text-purple-500">
                    {{
                      get_total_quantity(
                        item.product_variations,
                        "total_shipped_quantity"
                      )
                    }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="tw-px-3 tw-py-1 tw-bg-blue-100 tw-border tw-text-blue-500"
                  >
                    Delivered:
                  </td>
                  <td class="tw-px-3 tw-py-1 tw-border tw-text-blue-500">
                    {{
                      get_total_quantity(
                        item.product_variations,
                        "total_delivered_quantity"
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-expand-transition>
      </div>
    </td>
    <td class=" tw-px-6 tw-py-2 tw-space-x-3">
      <div>
        <ShowProductVariantActions :type="source" :source="item" />
      </div>
    </td>
  </tr>
</template>

<script>
import ShowProductVariantActions from "@/views/product/ShowProductVariantActions";

export default {
  components: { ShowProductVariantActions },
  props: ["source", "item"],

  data() {
    return {
      showDetails: false,
    };
  },

  methods: {
    get_total_quantity(variations, type = "on_hand_quantity") {
      let total = 0;
      variations.forEach((i) => {
        total += i[type];
      });

      return total;
    },
  },
};
</script>

<style>
</style>