<template>
  <tr
    class="hover:tw-bg-gray-50"
    :class="[
      availableQuantity <= 0 &&
        '!tw-border !tw-border-red-300 tw-bg-red-100 hover:tw-bg-red-100',
    ]"
  >
    <td class="tw-p-2 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div class="tw-max-w-[25px]">
        <div class="tw-inline-flex tw-items-center">
          <label
            class="tw-relative tw-flex tw-cursor-pointer tw-items-center tw-rounded-full tw-p-3"
            for="checkbox"
            data-ripple-dark="true"
          >
            <input
              type="checkbox"
              :checked="isSelected"
              @change="handleSelected"
              class="before:tw-content[''] tw-border-solid tw-bg-white tw-peer tw-relative tw-h-5 tw-w-5 tw-cursor-pointer tw-appearance-none tw-rounded-md tw-border tw-border-blue-gray-200 tw-transition-all before:tw-absolute before:tw-top-2/4 before:tw-left-2/4 before:tw-block before:tw-h-12 before:tw-w-12 before:-tw-translate-y-2/4 before:-tw-translate-x-2/4 before:tw-rounded-full before:bg-blue-gray-500 before:tw-opacity-0 before:tw-transition-opacity checked:tw-border-orange-500 checked:tw-bg-orange-500 checked:before:tw-bg-orange-500 hover:before:tw-opacity-10"
              :id="'checkbox-' + item.id"
            />
            <div
              class="tw-pointer-events-none tw-absolute tw-top-2/4 tw-left-2/4 -tw-translate-y-2/4 -tw-translate-x-2/4 tw-text-white tw-opacity-0 tw-transition-opacity peer-checked:tw-opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="tw-h-3.5 tw-w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
        </div>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white">
          {{ item.id }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo] tw-max-w-[70px] tw-truncate"
        >
          {{ item.ref }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo] tw-max-w-[350px] tw-truncate"
        >
          {{ item.name }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div class="tw-flex tw-items-center tw-gap-1">
        <div title="Buying Price" class="tw-flex tw-items-center tw-font-bold tw-p-1 tw-rounded">
          <span class="tw-text-blue-700">{{ item.buying_price }}</span>
          <v-icon class="tw-text-lg tw-text-blue-400 tw-ml-1">mdi-arrow-down-bold</v-icon>
        </div>
        <div title="Selling Price" class="tw-flex tw-items-center tw-font-bold tw-p-1 tw-rounded">
          <v-icon class="tw-text-lg tw-mr-1 tw-text-green-400">mdi-arrow-up-bold</v-icon>
          <span class="tw-text-green-700">{{ item.selling_price }}</span>
        </div>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo] tw-max-w-[120px] tw-truncate"
        >
          {{ quantityTotal }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div class="tw-flex tw-font-medium tw-text-green-600 tw-rounded  tw-items-center">
        <h2
          class="tw-font-medium tw-p-1 tw-w-fit darkx:tw-text-white tw-font-[cairo] tw-max-w-[120px] tw-truncate"
        >
          {{ deliveredQuantity }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div class="tw-flex tw-font-medium tw-text-purple-600 tw-rounded  tw-items-center">
        <h2
          class="tw-font-medium tw-p-1 tw-w-fit darkx:tw-text-white tw-font-[cairo] tw-max-w-[120px] tw-truncate"
        >
          {{ shippedQuantity }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div :class="{'tw-text-red-500 !tw-font-bold': availableQuantity <= 0}" class="tw-flex tw-font-medium tw-text-blue-600 tw-rounded  tw-items-center">
        <h2
          class="tw-p-1 tw-w-fit darkx:tw-text-white tw-font-[cairo] tw-max-w-[120px] tw-truncate"
        >
          {{ availableQuantity }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-font-medium tw-whitespace-nowrap tw-max-w-[100px]">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-max-w-[100px] tw-flex tw-items-center tw-gap-2"
        >
          <!-- {{ getDate(item.created_at) }} -->
          <p>{{ moment(item.created_at).format("DD[/]MM[/]YY") }}</p>
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-1 tw-text-sm tw-whitespace-nowrap">
      <div>
        <TableActions
          @update="(newItem) => $emit('update', newItem)"
          :item="item"
          @refresh="$emit('refresh')"
        />
      </div>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
import { currency } from '@/config/config';
import TableActions from "@/views/newproducts/partials/table/TableActions";
// import TableRowAffectation from "./TableRowAffectation.vue";

export default {
  components: { TableActions },

  props: {
    item: {
      required: true,
    },
    selected: {
      required: true
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
    isSelected() {
      return this.selected.includes(this.item.id)
    },

    quantityTotal() {
      return this.item.variations.reduce((s, i) => s + parseInt(i.quantity), 0);
    },
    deliveredQuantity() {
      return this.item.variations.reduce((s, i) => s + parseInt(i.delivered_quantity), 0);
    },
    shippedQuantity() {
      return this.item.variations.reduce((s, i) => s + parseInt(i.shipped_quantity), 0);
    },
    availableQuantity() {
      return this.item.variations.reduce((s, i) => s + parseInt(i.available_quantity), 0);
    }
  },

  methods: {
    handleSelected(e) {
      if(e.target.checked) {
        const newSelected = [...this.selected];
        newSelected.push(this.item.id);
        this.$emit('update:selected', newSelected)
        return false;
      }

      const newSelected = this.selected.filter(i => i!= this.item.id)
      this.$emit('update:selected', newSelected)
    }
  },

  mounted() {
  }
};
</script>

<style>
</style>