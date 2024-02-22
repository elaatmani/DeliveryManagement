<template>
    <div class="tw-p-5">
        <div>
            <ul class="tw-space-y-4">
                <li class="tw-flex tw-items-center tw-justify-between">
                    <span>Destination Country:</span>
                    <span class="tw-font-black tw-text-neutral-800, tw-capitalize">{{ sourcing.destination_country }}</span>
                </li>

                <li class="tw-flex tw-items-center tw-justify-between">
                    <span>Shipping Method:</span>
                    <span v-if="sourcing.shipping_method == 'air-freight'" class="tw-font-black tw-text-neutral-800">Air freight</span>
                    <span v-if="sourcing.shipping_method == 'ocean-freight'" class="tw-font-black tw-text-neutral-800">Ocean freight</span>
                </li>

                <li class="tw-flex tw-items-center tw-justify-between">
                    <span>Quantity:</span>
                    <span class="tw-font-black tw-text-neutral-800">{{ sourcing.estimated_quantity }}</span>
                </li>

                <li class="tw-flex tw-items-center tw-justify-between">
                    <span>Unit Price:</span>
                    <span class="tw-font-black tw-text-neutral-800">{{ sourcing.cost_per_unit }} {{ currency }}</span>
                </li>

                <li class="tw-flex tw-items-center tw-justify-between tw-">
                    <span>Additional Fees:</span>
                    <span class="tw-font-black tw-text-neutral-800">{{ sourcing.additional_fees }} {{ currency }}</span>
                </li>

                <li class="tw-border-b tw-border-solid tw-border-neutral-200">
                </li>

                <li class="tw-flex tw-items-center tw-justify-between">
                    <span>Total:</span>
                    <span class="tw-font-black tw-text-neutral-800">{{ sourcing.total_cost }} {{ currency }}</span>
                </li>
            </ul>
        </div>
        <div v-if="(sourcing.quotation_status == 'quoting') || ['quoting', 'pending'].includes(sourcing.quotation_status)" class="tw-space-y-2 mt-5">
            <button v-if="sourcing.quotation_status == 'quoting'" :disabled="false" @click="visible = true"
                class="tw-py-2 tw-px-7 tw-w-full justify-center tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-emerald-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-emerald-600 dark:tw-border-neutral-900 dark:hover:tw-border-emerald-500 hover:tw-bg-emerald-500/80 dark:hover:tw-bg-emerald-400 tw-duration-300 tw-text-white">
                <v-icon size="small" class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                    :class="[false && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                <span>Confirm</span>
            </button>
            <sourcing-request-cancel :sourcing="sourcing" v-if="['quoting', 'pending'].includes(sourcing.quotation_status)" />
        </div>

        <popup-new v-if="sourcing.quotation_status == 'quoting'" :visible="visible" @cancel="visible = false">
            <div
                class="tw-mx-auto tw-w-[95%] md:tw-max-w-[500px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg"
            >
                <div
                class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50"
                >
                Confirm product sourcing
                </div>
                <div class="tw-p-4 tw-bg-white">
                    <p class="tw-text-lg tw-font-medium">
                        Are you sure you want to proceed with this action ?
                    </p>
                </div>
                <div
                    class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid"
                    >
                    <button
                        @click="visible = false"
                        class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300"
                    >
                        Cancel
                    </button>
                    <button
                        @click="handleConfirm"
                        :disabled="isLoading"
                        class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white"
                    >
                        <v-icon
                        size="small"
                        class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                        :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']"
                        >mdi-loading</v-icon
                        >
                        <span>Confirm</span>
                    </button>
                    </div>
            </div>
        </popup-new>
    </div>
</template>

<script setup>
import Sourcing from '@/api/Sourcing';
import { useAlert } from '@/composables/useAlert';
import { currency } from '@/config/config';
import { ref, defineProps, toRef, inject } from 'vue';
import SourcingRequestCancel from './SourcingRequestCancel';

const visible = ref(false);
const isLoading = ref(false);
const props = defineProps(['sourcing']);
const sourcing = toRef(props, 'sourcing');
const sourcingOptions = inject('sourcing');

const handleConfirm = async () => {
    isLoading.value = true;
    await Sourcing.update(sourcing.value.id, {...sourcing.value, quotation_status: 'confirmed'})
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                sourcingOptions.updateSourcing(res.data.sourcing);
                useAlert('Quotation has been accepted')
            }
        }
    )
    visible.value = false;
    isLoading.value = false;
}
</script>

<style></style>