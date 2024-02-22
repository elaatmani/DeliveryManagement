<template>
    <popup-new :visible="props.visible" @cancel="hide">
        <div class="tw-w-full tw-max-w-[500px] tw-mx-auto tw-p-2">
                <div class="tw-w-full tw-h-fit tw-bg-white tw-rounded-md tw-border tw-border-solid tw-shadow-md tw-overflow-hidden">
                    <h1
                        class="tw-text-lg tw-font-medium tw-text-gray-600 tw-bg-gray-100 tw-border-b tw-border-solid tw-p-4">
                        Quotation
                    </h1>


                    <div class="tw-p-5 tw-space-y-4">

                        <div>
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Shipping Method</label>
                            <select v-model.number="form.sourcing.shipping_method" @input="form.errors.shipping_method = null" 
                                :class="[form.errors.shipping_method && '!tw-border-red-400']"
                                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                required >
                                <option value="not-selected" selected>Select shipping method</option>
                                <option value="air-freight">Air freight</option>
                                <option value="ocean-freight">Ocean freight</option>
                            </select>
                            <label v-if="form.errors.shipping_method"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    form.errors.shipping_method }}</label>
                        </div>


                        <div>
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Estimated Quantity</label>
                            <input v-model.number="form.sourcing.estimated_quantity" @input="form.errors.estimated_quantity = null" type="number" min="0" max="10000"
                                :class="[form.errors.estimated_quantity && '!tw-border-red-400']"
                                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                placeholder="Enter the quantity" required />
                            <label v-if="form.errors.estimated_quantity"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    form.errors.estimated_quantity }}</label>
                        </div>

                        <div>
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Unit Price</label>
                            <input v-model.number="form.sourcing.cost_per_unit" @input="form.errors.cost_per_unit = null" type="number"
                                :class="[form.errors.cost_per_unit && '!tw-border-red-400']"
                                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                placeholder="Enter a unit price for the quotation" required />
                            <label v-if="form.errors.cost_per_unit"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    form.errors.cost_per_unit }}</label>
                        </div>


                        <div>
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Additional Fees</label>
                            <input v-model.number="form.sourcing.additional_fees" @input="form.errors.additional_fees = null" type="number"
                                :class="[form.errors.additional_fees && '!tw-border-red-400']"
                                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                placeholder="Enter a additional fees for the sourcing" required />
                            <label v-if="form.errors.additional_fees"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    form.errors.additional_fees }}</label>
                        </div>


                        <div class="tw-border-b tw-border-solid tw-border-neutral-300 tw-my-2"></div>

                        <div class="tw-flex tw-items-center tw-justify-between">
                            <label
                                class="tw-block tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Total</label>
                                <span class="tw-text-lg tw-font-bold">{{ total }} {{ currency }}</span>
                        </div>

                    </div>

                    <div
                        class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-100 tw-border-t tw-border-solid">
                        <button @click="hide"
                            class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
                            Cancel
                        </button>
                        <button @click="update" :disabled="loading"
                            class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                            <v-icon size="small"
                                class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                                :class="[loading && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                            <span>Update quotation</span>
                        </button>
                    </div>
                </div>
        </div>
    </popup-new>
</template>

<script setup>
import Sourcing from '@/api/Sourcing';
import { useAlert } from '@/composables/useAlert';
import { currency } from '@/config/config';
import { clone } from '@/helpers/methods';
import { defineEmits, defineProps, ref, computed, reactive, watch, inject } from 'vue';

const emit = defineEmits(['update:visible']);
const props = defineProps(['visible', 'sourcing']);
const sourcingOptions = inject('sourcing')

const loading = ref(false);
const form = reactive({
    sourcing: {},
    errors: {}
});

const total = computed(() => {
    return ((form.sourcing.estimated_quantity ?? 0) * (form.sourcing.cost_per_unit ?? 0)) + (form.sourcing.additional_fees ?? 0)
})


// functions
const hide = () => {
    emit('update:visible', false)
}


const update = async () => {
    loading.value = true;
    const quotation = form.sourcing.quotation_status == 'pending' ? 'quoting' : form.sourcing.quotation_status;
    await Sourcing.update(form.sourcing.id, {...form.sourcing, total_cost: total.value, quotation_status: quotation })
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                sourcingOptions.updateSourcing(res.data.sourcing);
                useAlert('Quotation sent');
                hide();
            }
        },
        err => {
            if(err?.response?.status == 422) {
                for(let e in err?.response?.data?.errors) {
                    form.errors[e] = err?.response?.data?.errors[e][0]
                }
            }
        }
    );
    loading.value = false;
}

watch(() => props.visible, () => {
    form.sourcing = clone(props.sourcing);
})

</script>

<style>

</style>