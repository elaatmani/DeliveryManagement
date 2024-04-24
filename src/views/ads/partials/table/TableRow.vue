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
          <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-flex tw-itemxs-center tw-gap-2">
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
          <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-flex tw-itemxs-center tw-gap-2">
            <!-- {{ getDate(item.created_at) }} -->
            <p>{{ moment(item.ads_at).format("DD[/]MM[/]YY") }}</p>
            <p v-if="false">{{ moment(item.ads_at).format("HH[:]mm[:]ss") }}</p>
          </h2>
        </div>
      </td>
      <td
        v-if="$user.role == 'admin'"
      class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
    >
      <div>
        <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x">
          {{ item.marketers.firstname }} {{ item.marketers.lastname }}
        </h2>
      </div>
    </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div class="tw-flex tw-items-center tw-gap-3">
          <template v-if="['facebook', 'tiktok', 'snapchat', 'google'].includes(item.source?.toLocaleLowerCase())">
            <template v-if="item.source?.toLocaleLowerCase() == 'facebook'">
                <div class="tw-w-[28px]">
                  <icon icon="logos:facebook" class="tw-text-2xl" />
                </div>
                <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x tw-capitalize">
                  Facebook
                </h2>
            </template>

            <template v-if="item.source?.toLocaleLowerCase() == 'tiktok'">
                <div class="tw-w-[28px]">
                  <icon icon="logos:tiktok-icon" class="tw-text-2xl" />
                </div>
                <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x tw-capitalize">
                  TikTok
                </h2>
            </template>

            <template v-if="item.source?.toLocaleLowerCase() == 'google'">
              <div class="tw-w-[28px]">
                <icon icon="logos:google-ads" class="tw-text-2xl" />
              </div>
                <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x tw-capitalize">
                  Google Ads
                </h2>
            </template>

            <template v-if="item.source?.toLocaleLowerCase() == 'snapchat'">
              <div class="tw-w-[28px] tw-h-[28px] tw-bg-[#fffb09] tw-rounded-md tw-flex tw-items-center tw-justify-center">
                <icon icon="jam:snapchat" class="tw-text-2xl tw-text-white tw-stroke-black" />
              </div>
                <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x tw-capitalize">
                  Snapchat
                </h2>
            </template>
          </template>

          <template v-else>
              <div class="tw-w-[28px]">
                <icon icon="fluent-mdl2:unknown-solid" class="tw-text-2xl" />
              </div>
                <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x tw-capitalize">
                  {{ item.source }}
                </h2>
            </template>
        </div>
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div>
          <h2 class="tw-font-bold tw-text-green-500 darkx:tw-text-white tw-font-[cairo]">
            {{ currency }}{{ item.amount }}
          </h2>
        </div>
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div class="tw-flex tw-items-center tw-gap-2">
          <icon icon="material-symbols-light:leaderboard-rounded" class="tw-text-lg tw-text-cyan-400" />
          <h2 class="tw-font-bold tw-text-cyan-500 darkx:tw-text-white">
            {{ item.leads }}
          </h2>
        </div>
      </td>
 
      <td
      class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
    >
      <div>
        <h2 dir="rtl" class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x tw-max-w-[150px] tw-truncate">
          {{ item.products.name }}
        </h2>
      </div>
    </td>
      <td class="tw-px-4 tw-py-2 tw-text-sm tw-whitespace-nowrap">
        <div>
          <TableActions @update=" newItem => $emit('update', newItem)" :item="item" />
        </div>
      </td>
    </tr>
</template>

<script>
import moment from 'moment';
import { currency } from '@/config/config';
import TableActions from '@/views/ads/partials/table/TableActions'

export default {
  components: {TableActions},

  props: {
    item: {
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
    

  },

  methods: {
    
  }
};
</script>

<style>
</style>