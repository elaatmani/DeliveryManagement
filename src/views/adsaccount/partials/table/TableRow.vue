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
          <h2 class="tw-font-semibold tw-text-gray-800  darkx:tw-text-white tw-flex tw-itemxs-center tw-gap-2">
            <!-- {{ getDate(item.created_at) }} -->
            <p>{{ moment(item.created_at).format("DD[/]MM[/]YY") }}</p>
            <p>{{ moment(item.created_at).format("HH[:]mm[:]ss") }}</p>
          </h2>
        </div>
      </td>
      <td
      class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
    >
      <div>
        <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x">
        {{ item.ad_account_id }}
        </h2>
      </div>
    </td>
      <td
      class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
    >
      <div>
        <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x">
          {{ item.name }}
        </h2>
      </div>
    </td>
    <td class="tw-px-6 tw-py-4  ">
            <div
                class="tw-flex tw-items-center tw-w-full tw-text-neutral-600 dark:tw-text-neutral-200 tw-text-md tw-py-1">
                <label class="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer tw-w-fit tw-scale-75">
                    <input :disabled="isLoadingAuto" v-model="autoFetch" type="checkbox" class="tw-sr-only tw-peer" />
                    <div
                        class="tw-flex tw-items-center peer-checked:tw-bg-emerald-500 tw-w-11 tw-h-6 tw-bg-gray-200 peer-focus:tw-outline-none tw-rounded-full tw-peer dark:tw-bg-neutral-600 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600">
                    </div>
                </label>
                <v-icon v-if="isLoadingAuto" color="green" size="small" class="tw-animate-spin">mdi-loading</v-icon>
            </div>
        </td>
      <td
        v-if="$user.role == 'admin'"
      class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
    >
      <div>
        <h2 class="tw-font-semibold tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]x">
          {{ item.marketer_firstname }} {{ item.marketer_lastname }}
        </h2>
      </div>
    </td>

      <td class="tw-px-4 tw-py-2 tw-text-sm tw-whitespace-nowrap">
        <div>
          <TableActions @update=" newItem => $emit('update', newItem)" @delete="id => $emit('delete', id)" :item="item" />
        </div>
      </td>
    </tr>
</template>

<script>
import moment from 'moment';
import { currency } from '@/config/config';
import TableActions from '@/views/adsaccount/partials/table/TableActions'
import Adaccount from '@/api/Adaccount';

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
      currency,
      isLoadingAuto: false,

    }
    
  },
  
  computed: {
    autoFetch: {
        get() {
            return this.item.auto_fetch == 1 ? true : false;
        },
        set(v) {
            this.updateAutoFetch(v)
        }
    },
  },

  methods: {
            updateAutoFetch(value) {
                this.isLoadingAuto = true
                Adaccount.updateAutoFetch(this.item.id, value).then(
                    (response) => {
                        if (response.data.code == 'SUCCESS') {
                            this.$alert({
                                title: value ? 'Activated' : 'Disabled',
                                type: 'success'
                            })
                            this.$store.dispatch('adaccount/update', response.data.data.adaccount)
                        }

                    },
                    this.$handleApiError
                ).finally(() => {
                    this.isLoadingAuto = false
                })
            }
        },
};
</script>

<style>
</style>