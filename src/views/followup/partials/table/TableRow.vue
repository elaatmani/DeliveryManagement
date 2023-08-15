<template>
    <tr>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div>
          <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white">{{ item.id }}</h2>
        </div>
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div>
          <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-flex tw-items-center tw-gap-2">
            <!-- {{ getDate(item.created_at) }} -->
            <p>{{ moment(item.created_at).format("DD[/]MM[/]YY") }}</p>
            <p v-if="false">{{ moment(item.created_at).format("HH[:]mm[:]ss") }}</p>
          </h2>
        </div>
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div>
          <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]">
            {{ item.fullname }}
          </h2>
        </div>
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div>
          <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]">
            {{ item.phone }}
          </h2>
        </div>
      </td>
      <td
        class="tw-px-12 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <span
        :class="[confirmation.bgLight, confirmation.textLight]"
        class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded ">{{ (confirmation.name) }}</span>
      </td>
      <td class="tw-px-12 tw-py-2 tw-text-sm tw-whitespace-nowrap">
        <div v-if="!!item.delivery_fullname" :class="['tw-text-emerald-800', 'tw-bg-emerald-100']" class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-pl-1.5 tw-py-0.5 tw-rounded tw-w-fit tw-flex tw-items-center tw-gap-2">
          <div class="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-emerald-500"></div>
          <span>{{ item.delivery_fullname }}</span>
        </div>
        <div v-else>
          <span
            :class="['tw-text-gray-800', 'tw-bg-gray-100']"
            class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded ">No Delivery</span>
        </div>
      </td>
      <td
        class="tw-px-12 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <span
        :class="[deliveryState.bgLight, deliveryState.textLight]"
        class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded ">{{ (!deliveryState.value ? 'Not Selected' : deliveryState.name ) }}</span>
      </td>

      <td class="tw-px-4 tw-py-2 tw-text-sm tw-whitespace-nowrap">
        <div>
          <TableActions @update="newItem => $emit('update', newItem)" :item="item" />
        </div>
      </td>
    </tr>
</template>

<script>
import moment from 'moment';
import { confirmationsFollowup as confirmations, deliveryStatus } from '@/config/orders';
import TableActions from '@/views/followup/partials/table/TableActions'

export default {
  components: {TableActions},

  props: {
    item: {
      required: true,
    }
  },

  data() {
    return {
      moment: moment
    }
  },

  computed: {
    confirmation() {
      return confirmations.find(c => c.value == this.item.followup_confirmation)
    },

    deliveryState() {
      return deliveryStatus.find(v => v.value == this.item.delivery)
    },

  },

  methods: {

  }
};
</script>

<style>
</style>