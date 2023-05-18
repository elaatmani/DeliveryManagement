<template>
  <div>
    <popup-full :visible="visible" @cancel="cancel">
      <div
        class="md:tw-w-[50%] tw-relative tw-max-h-full tw-w-[95%] tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg"
      >
        <v-btn
          @click="cancel"
          icon="mdi-close"
          variant="flat"
          size="w-small"
          color="red"
          class="tw-absolute tw-top-3 tw-z-10 tw-right-3"
        ></v-btn>
        <div class="tw-p-5">
          <table
            class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500 tw-rounded-md tw-overflow-hidden"
          >
            <thead
              class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50"
            >
              <tr>
                <th
                  scope="col"
                  class="tw-px-4 tw-max-w-[50px] tw-py-3 text-truncate"
                >
                  ID
                </th>
                <th scope="col" class="tw-px-6 tw-py-3 text-truncate">SIZE</th>
                <th scope="col" class="tw-px-4 tw-py-3 text-truncate">COLOR</th>
                <th scope="col" class="tw-px-4 tw-py-3 text-truncate">
                  QUANTITY
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in source.product_variations"
                :key="item.id"
                class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50"
              >
                <td class="tw-w-4 tw-p-4">
                  {{ item.id }}
                </td>
                <td class="tw-w-4 tw-p-4">
                  {{ item.size }}
                </td>
                <td class="tw-w-4 tw-p-4">
                  {{ item.color }}
                </td>
                <td class="tw-w-4 tw-p-4">
                  <div v-if="type == 'deliveries'">
                    <div class=" tw-border-b tw-pb-1 tw-mb-1 tw-w-fit">
                        <div class="tw-text-pink-400">
                          Expidier: {{ item.expidier_quantity }}
                        </div>
                        <div class="tw-text-green-400">
                          Livrer: {{ item.delivery_quantity }}
                        </div>
                        <div class="tw-text-orange-400 tw-flex tw-items-center tw-gap-2">
                          <span>On Hand:</span>
                          <span class="tw-text-orange-400">{{ item.movements_confirmed_quantity }}</span>
                          <span class="tw-text-black">/</span>
                          <span class="tw-text-red-400">{{ item.movements_not_confirmed_quantity }}</span>
                        </div>
                    </div>
                    <div class="tw-font-bold">
                      Total: {{ item.left_quantity }}
                    </div>
                  </div>
                  <div v-if="type == 'warehouses'" class="tw-flex tw-items-center tw-gap-1">
                    <span class="tw-text-green-500"
                      >{{ item.on_hand_quantity }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="false" class="tw-flex tw-gap-3 mt-5">
            <div class="tw-flex tw-items-center tw-gap-1 tw-text-xs">
              <div
                class="tw-w-[10px] tw-h-[10px] tw-rounded-full tw-bg-green-500"
              ></div>
              <span>Available</span>
            </div>

            <div class="tw-flex tw-items-center tw-gap-1 tw-text-xs">
              <div
                class="tw-w-[10px] tw-h-[10px] tw-rounded-full tw-bg-neutral-700"
              ></div>
              <span>Initial</span>
            </div>

            <div class="tw-flex tw-items-center tw-gap-1 tw-text-xs">
              <div
                class="tw-w-[10px] tw-h-[10px] tw-rounded-full tw-bg-red-400"
              ></div>
              <span>Not Received</span>
            </div>
          </div>
        </div>
      </div>
    </popup-full>
  </div>
</template>

<script>
export default {
  props: ["visible", "source", "type"],

  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },

  mounted() {
    console.log(this.type);
  }
};
</script>

<style>
</style>