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
              <ProductVariantDetailsRow  v-for="item in source.product_variations" :key="item.id" :item="item" :type="type" />
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
import ProductVariantDetailsRow from '@/views/product/ProductVariantDetailsRow'
export default {
  props: ["visible", "source", "type"],
  components: {ProductVariantDetailsRow},

  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },

  mounted() {
  },
};
</script>

<style>
</style>