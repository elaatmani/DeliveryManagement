<template>
    <tr class="tw-bg-gray-50 tw-border-t tw-border-gray-300 tw-sticky tw-bottom-0">
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
      </td>
      <td
        v-if="$user.role == 'admin'"
      class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
    >
    </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div class="tw-flex tw-flex-col tw-items-start tw-gap-1">
            <h2 class="tw-font-bold tw-text-green-500 darkx:tw-text-white tw-font-[cairo]">
                {{ currency }}{{ totalSpend }}
            </h2>
            <p class="tw-text-xs tw-text-green-500x tw-font-semibold">TOTAL SPEND</p>
        </div>
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div class="tw-flex tw-flex-col tw-items-start tw-gap-1">
            <div class="tw-flex tw-items-center tw-gap-2">
                <icon icon="material-symbols-light:leaderboard-rounded" class="tw-text-lg tw-text-cyan-400" />
                <h2 class="tw-font-bold tw-text-cyan-500 darkx:tw-text-white">
                    {{ totalLeads }}
                </h2>
            </div>
            <p class="tw-text-xs tw-text-cyan-500x tw-font-semibold">TOTAL LEADS</p>
        </div>
      </td>
 
      <td
      class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
    >
    <div class="tw-flex tw-items-start tw-flex-col tw-gap-1">
        <div class="tw-flex tw-items-center tw-gap-1">
            <span class="tw-font-bold tw-text-fuchsia-500">{{ currency }}{{ ( totalSpend / totalLeads).toFixed(2) }}</span>
        </div>
        <p class="tw-text-xs tw-text-fuchsia-500x tw-font-semibold">COST PER LEAD</p>
    </div>
    </td>
      <td class="tw-px-4 tw-py-2 tw-text-sm tw-whitespace-nowrap">
        <div>
        </div>
      </td>
    </tr>
</template>

<script>
import moment from 'moment';
import { currency } from '@/config/config';

export default {
  components: {},

  props: {
    items: {
      required: true,
    }
  },

  data() {
    return {
      moment,
      currency
    }
    
  },
  
  computed: {
    totalLeads() {
        return this.items.reduce((a, b) => a += b.leads, 0)
    },
    totalSpend() {
        return this.items.reduce((a, b) => a += b.amount, 0).toFixed(2)
    },

  },

  methods: {
    
  }
};
</script>

<style>
</style>