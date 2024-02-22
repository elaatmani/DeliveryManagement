<template>
  <popup-new :visible="visible" @cancel="emit('update:visible', false)">
    <div
        class="tw-mx-auto tw-w-[95%] md:tw-max-w-[800px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg"
      >
        <div
          class="tw-p-4 tw-text-lg tw-relative tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50"
        >
          <span>Sourcing History</span>

            <button @click="emit('update:visible', false)" class="tw-absolute tw-right-3 tw-top-1/2 tw-p-2 tw-rounded-md hover:tw-bg-black/10 tw-duration-200 -tw-translate-y-1/2">
                <icon icon="ic:round-close" class="tw-text-xl tw-text-neutral-700" />
            </button>
        </div>

        <div v-if="fetching" class="tw-h-[250px] tw-flex tw-items-center tw-justify-center  tw-bg-white">
            <loading />
        </div>

        <div v-if="!fetching" class="tw-bg-white tw-p-5 tw-pl-8 tw-py-10">

            
        <p v-if="!history.length" class="tw-text-neutral-500 tw-text-lg tw-font-semibold tw-text-center">There is no history for this sourcing yet.</p>

        <ol v-if="history.length" class="tw-relative tw-border-l tw-border-neutral-200 dark:tw-border-gray-700">                  
            <li v-for="h in history" :key="h.id" class="tw-mb-10 tw-mx-6">            
                <span class="tw-absolute tw-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-bg-neutral-100 tw-rounded-full -tw-left-3 tw-ring-8 tw-ring-white dark:tw-ring-gray-900 dark:tw-bg-blue-900">
                </span>

                <div class="tw-flex tw-items-center tw-justify-between tw-mb-2">
                    <p class="tw-text-gray-500">
                        by
                        <span class="tw-text-black tw-font-semibold tw-capitalize tw-mb-2">{{ h.action_by }}</span>

                    </p>

                    <time class="tw-mb-1 tw-text-xs tw-font-normal tw-text-gray-400 sm:tw-order-last sm:tw-mb-0 tw-whitespace-nowrap" @mouseenter="h.isHovering = true" @mouseleave="h.isHovering = false">{{ h.isHovering ? moment(h.created_at).format("YYYY-MM-DD HH:mm:ss") : moment(h.created_at).fromNow() }} </time>
                </div>
                <div class="tw-items-start tw-justify-between tw-p-4 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow-sm sm:tw-flex dark:tw-bg-gray-700 dark:tw-border-gray-600">
                    <div class="tw-flex tw-flex-col tw-gap-4">
                        <template v-for="f in h.fields" :key="f.field">
                            <div v-if="!['note'].includes(f.field)" class="tw-text-sm tw-font-normal tw-text-gray-500 dark:tw-text-gray-300">Changed <span class="tw-font-semibold tw-text-blue-600 dark:tw-text-blue-500 hover:tw-underline">{{ field_names[f.field] }}</span> from <span class="tw-bg-gray-100 tw-text-gray-800 tw-text-xs tw-font-normal tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded dark:tw-bg-rose-100 dark:tw-text-rose-500">{{ f.field in field_values ? field_values[f.field][f.old_value] : f.old_value }}</span>to <span class="tw-bg-emerald-100 tw-text-emerald-800 tw-text-xs tw-font-normal tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded dark:tw-bg-green-100 dark:tw-text-green-500">{{ f.field in field_values ? field_values[f.field][f.new_value] : f.new_value }}</span></div>
                            <div v-else class="tw-w-full">
                                <div class="tw-items-center tw-justify-between tw-mb-3 sm:tw-flex">
                                    <div class="tw-text-sm tw-font-normal tw-text-gray-500 lex dark:tw-text-gray-300">Added a note:</div>
                                </div>
                                <div class="tw-p-3 tw-w-full tw-text-sm tw-italic tw-font-normal tw-text-gray-500 tw-border tw-border-gray-200 tw-rounded-lg tw-bg-gray-50 dark:tw-bg-gray-600 dark:tw-border-gray-500 dark:tw-text-gray-300">{{ f.new_value }}</div>
                            </div>
                        </template>
                    </div>
                </div>
            </li>
        </ol>



        </div>

    </div>
  </popup-new>
</template>

<script setup>
import Sourcing from "@/api/Sourcing";
import { quotation_statuses, sourcing_statuses } from '@/config/sourcing'
import { defineProps, toRef, defineEmits, ref } from "vue";
import moment from 'moment'


const field_names = {
    'product_name': 'Product name',
    'product_url': 'Product URL',
    'estimated_quantity': 'Estimated Quantity',
    'destination_country': 'Destination Country',
    'note': 'Note',
    'shipping_method': 'Shipping Method',
    'quotation_status': 'Quotation Status',
    'sourcing_status': 'Sourcing Status',
    'cost_per_unit': 'Unit Price',
    'total_cost': 'Total Cost',
    'additional_fees': 'Additional Fees'
}

const field_values = {
    shipping_method: {
        'air-freight': 'Air Freight',
        'ocean-freight': 'Ocean Freight'
    },
    'quotation_status': quotation_statuses.reduce((obj, status) => {
                            obj[status.value] = status.name;
                            return obj;
                        }, {}),
    'sourcing_status': sourcing_statuses.reduce((obj, status) => {
                            obj[status.value] = status.name;
                            return obj;
                        }, {}),
}

const props = defineProps(['visible', 'sourcing']);
const emit = defineEmits(['update:visible'])
const visible = toRef(props, 'visible');
const sourcing = toRef(props, 'sourcing');
const fetching = ref(true);
const history = ref([true]);

const getHistory = async () => {
    fetching.value = true;
    await Sourcing.history(sourcing.value.id)
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                console.log(res.data)
                history.value = res.data.history;
                history.value.reverse();
            }
        }
    )
    fetching.value = false;
}

getHistory();
</script>

<style>

</style>