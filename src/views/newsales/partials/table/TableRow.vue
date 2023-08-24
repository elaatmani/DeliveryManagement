<template>
  <tr
    class="hover:tw-bg-gray-50"
    :class="[
      item.reported_diff != null &&
        item.confirmation == 'reporter' &&
        item.reported_diff <= 0 &&
        ' !tw-shadow-sm !tw-border !tw-border-emerald-300',
    ]"
  >
    <td class="tw-p-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
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
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white">
          {{ item.id }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-flex tw-items-center tw-gap-2"
        >
          <!-- {{ getDate(item.created_at) }} -->
          <p>{{ moment(item.created_at).format("DD[/]MM[/]YY") }}</p>
          <p v-if="false">
            {{ moment(item.created_at).format("HH[:]mm[:]ss") }}
          </p>
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo] tw-max-w-[150px] tw-truncate"
        >
          {{ item.fullname }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-max-w-[100px] tw-truncate tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]"
        >
          {{ item.city }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo] tw-max-w-[120px] tw-truncate"
        >
          {{ item.phone }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <ul class="tw-space-y-1">
          <li
            dir="rtl"
            class="tw-font-[cairo] tw-flex tw-items-center tw-gap-1"
            v-for="p in item.items"
            :key="p.id"
          >
            <span class="tw-font-bold tw-text-green-500"
              >{{ p.quantity }} x
            </span>
            <span class="tw-block tw-max-w-[150px] tw-truncate">{{
              p.product.name
            }}</span>
            <span
              class="tw-font-bold tw-text-orange-500 tw-bg-orange-100 tw-rounded-lg tw-px-2 tw-text-sm"
              v-if="
                !!p.product_variation.color &&
                !['/', '-'].includes(p.product_variation.color)
              "
              >{{ p.product_variation.color }}</span
            >
            <span
              class="tw-font-bold tw-text-orange-500 tw-bg-orange-100 tw-rounded-lg tw-px-2 tw-text-sm"
              v-if="
                !!p.product_variation.size &&
                !['/', '-'].includes(p.product_variation.size)
              "
              >{{ p.product_variation.size }}</span
            >
          </li>
        </ul>
      </div>
    </td>
    <td class="tw-px-2 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <span
          :class="[confirmation.bgLight, confirmation.textLight]"
          class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded"
          >{{ confirmation.name }}</span
        >
      </div>
    </td>
    <td class="tw-px-2 tw-py-2 tw-text-sm tw-whitespace-nowrap">

      <div>
        <TableRowAffectation @update="(newItem) => $emit('update', newItem)" :deliveries="deliveries" :item="item" />
      </div>

      <div v-if="false">
        <div
          v-if="!!item.delivery_fullname"
          :class="['tw-text-emerald-800', 'tw-bg-emerald-100']"
          class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-pl-1.5 tw-py-0.5 tw-rounded tw-w-fit tw-flex tw-items-center tw-gap-2"
        >
          <div
            class="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-emerald-500"
          ></div>
          <span>{{ item.delivery_fullname }}</span>
        </div>
        <div v-else>
          <span
            :class="['tw-text-gray-800', 'tw-bg-gray-100']"
            class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded"
            >No Delivery</span
          >
        </div>
      </div>
    </td>
    <td class="tw-px-2 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <span
          :class="[deliveryState.bgLight, deliveryState.textLight]"
          class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded"
          >{{
            !deliveryState.value ? "Not Selected" : deliveryState.name
          }}</span
        >
      </div>
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-whitespace-nowrap">
      <div>
        <TableActions
          @update="(newItem) => $emit('update', newItem)"
          :item="item"
        />
      </div>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
import { confirmations, deliveryStatus } from "@/config/orders";
import TableActions from "@/views/newsales/partials/table/TableActions";
import TableRowAffectation from "./TableRowAffectation.vue";

export default {
  components: { TableActions, TableRowAffectation },

  props: {
    item: {
      required: true,
    },
    selected: {
      required: true
    },
    deliveries: {
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
    };
  },

  computed: {
    confirmation() {
      return confirmations.find((c) => c.value == this.item.confirmation);
    },

    deliveryState() {
      return deliveryStatus.find((v) => v.value == this.item.delivery);
    },

    isSelected() {
      return this.selected.includes(this.item.id)
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