<template>
  <tr>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white">
          {{ item.id }}
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <PdfFactorisation :item="item"/>
      </div>
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]"
        >
          <span
            >{{ item.delivery.firstname }} {{ item.delivery.lastname }}</span
          >
        </h2>
      </div>
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]"
        >
          <span>
            {{ item.delivery_order_count }}
          </span>
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]"
        >
          <span>
            {{ item.delivery_order_price }} 
          </span>

          {{currency}}
        </h2>
      </div>
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-flex tw-items-center tw-gap-2"
        >
          <!-- {{ getDate(item.created_at) }} -->
          <span v-if="!!item.close_at">
            <p>{{ moment(item.close_at).format("DD[/]MM[/]YY") }}</p>
            <p v-if="true">
              {{ moment(item.close_at).format("HH[:]mm[:]ss") }}
            </p>
          </span>
          <span v-else> - </span>
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <h2
          class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-flex tw-items-center tw-gap-2"
        >
          <!-- {{ getDate(item.created_at) }} -->
          <span v-if="!!item.paid_at">
            <p>{{ moment(item.paid_at).format("DD[/]MM[/]YY") }}</p>
            <p v-if="true">
              {{ moment(item.paid_at).format("HH[:]mm[:]ss") }}
            </p>
          </span>
          <span v-else> - </span>
        </h2>
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div>
        <CloseFactorisation :item="item" :key="item.id" @update="f => $emit('update', f)" />
      </div>
    </td>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
      <div v-if="item.close">
        <PaidFactorisation :item="item" :key="item.id" @update="f => $emit('update', f)" />
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
import TableActions from "@/views/newfactorisation/partials/table/TableActions";
import CloseFactorisation from "./../components/CloseFactorisation";
import PaidFactorisation from "./../components/PaidFactorisation";
import PdfFactorisation from "./../components/PdfFactorisation";
import { currency } from '@/config/config'

export default {
  components: { TableActions, CloseFactorisation, PaidFactorisation , PdfFactorisation },

  props: {
    item: {
      required: true,
    },
  },

  data() {
    return {
      moment: moment,
      currency: currency
    };
  },

  computed: {},

  methods: {
   
  },
};
</script>

<style></style>
