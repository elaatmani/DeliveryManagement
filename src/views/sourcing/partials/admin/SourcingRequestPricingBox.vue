<template>
    <div class="tw-p-5">
        <div>
            <ul class="tw-space-y-4">
                <li class="tw-flex tw-items-center tw-justify-between">
                    <span>Destination Country:</span>
                    <span class="tw-font-black tw-text-neutral-800 tw-capitalize">{{ sourcing.destination_country }}</span>
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
        <div class="tw-space-y-2 mt-5">
            <button :disabled="false" @click="visible = true"
                class="tw-py-2 tw-px-7 tw-gap-2 tw-w-full justify-center tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                <v-icon size="small" class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                    :class="[false && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                    <icon icon="clarity:edit-solid" class="tw-text-lg tw-text-white" />
                <span>Edit</span>
            </button>
            <SourcingRequestCancel v-if="false" />
        </div>

        <SourcingRequestPricingEdit :sourcing="sourcing" v-model:visible="visible" />
    </div>
</template>

<script setup>
// import { useAlert } from '@/composables/useAlert';
import { currency } from '@/config/config';
import SourcingRequestPricingEdit from './SourcingRequestPricingEdit'
import SourcingRequestCancel from './../common/show/SourcingRequestCancel'
import { ref, defineProps, toRef } from 'vue';

const props = defineProps(['sourcing']);
const sourcing = toRef(props, 'sourcing');
const visible = ref(false);
// const isLoading = ref(false);
// const handleConfirm = () => {
//     isLoading.value = true;
    
//     setTimeout(() => {
//         isLoading.value = false;
//         visible.value = false;
//         useAlert('confirmed')
//     }, 3000)
// }
</script>

<style></style>