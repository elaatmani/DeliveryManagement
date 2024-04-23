<template>
  <tr
    class="hover:tw-bg-gray-50"
  >
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white">
          {{ item.product_id }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo] tw-max-w-[350px] tw-truncate"
        >
          {{ item.product_name }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo] tw-max-w-[120px] tw-truncate"
        >
          {{ item.total_orders }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div class="tw-flex tw-font-medium tw-text-green-600 tw-rounded  tw-items-center">
        <h2
          class="tw-font-medium tw-p-1 tw-w-fit darkx:tw-text-white tw-font-[cairo] tw-max-w-[120px] tw-truncate"
        >
          {{ item.total_quantity }}
        </h2>
      </div>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
import { currency } from '@/config/config';
// import TableRowAffectation from "./TableRowAffectation.vue";

export default {
  components: {  },

  props: {
    item: {
      required: true,
    },
    all: {
      required: true
    },
    index: {
      required: true
    }
  },

  data() {
    return {
      moment: moment,
      currency: currency
    };
  },

  computed: {
  },

  methods: {
  },

  mounted() {
  }
};
</script>

<style>
</style>