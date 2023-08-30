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
        <div>
          <ul class="tw-space-y-1">
              <li class="tw-font-[cairo] tw-flex tw-items-center tw-gap-1" v-for="p in item.items" :key="p.id"> <span class="tw-font-bold tw-text-green-500">{{ p.quantity }} x </span> <span>{{ p.product.name }}</span> <span class="tw-font-bold tw-text-orange-500 tw-bg-orange-100 tw-rounded-lg tw-px-2 tw-text-sm" v-if="!!p.product_variation.color && !['/', '-'].includes(p.product_variation.color)">{{ p.product_variation.color }}</span> <span class="tw-font-bold tw-text-orange-500 tw-bg-orange-100 tw-rounded-lg tw-px-2 tw-text-sm" v-if="!!p.product_variation.size && !['/', '-'].includes(p.product_variation.size)">{{ p.product_variation.size }}</span></li>
          </ul>
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
      

      <td class="tw-px-4 tw-py-2 tw-text-sm tw-whitespace-nowrap">
        <div>
          <TableActions @update="newItem => $emit('update', newItem)" :item="item" />
        </div>
      </td>
    </tr>
</template>

<script>
import moment from 'moment';
import { confirmations, deliveryStatus } from '@/config/orders';
import TableActions from '@/views/newagent/partials/table/TableActions'

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
      return confirmations.find(c => c.value == this.item.confirmation)
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