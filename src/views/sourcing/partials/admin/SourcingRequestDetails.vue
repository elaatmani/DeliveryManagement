<template>
    <div class="tw-p-5">
        <div class="tw-grid tw-grid-cols-12 tw-gap-5">

            <div class="md:tw-col-span-6 tw-col-span-12">
                <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Product
                    Name</label>
                <input v-model="form.sourcing.product_name" @input="errors.product_name = null"
                    :class="[errors.product_name && '!tw-border-red-400']" type="text"
                    class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                    placeholder="Product Name" required />
                <label v-if="errors.product_name"
                    class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                        errors.product_name }}</label>
            </div>

            <div class="md:tw-col-span-6 tw-col-span-12">
                <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Product
                    URL</label>
                <input v-model="form.sourcing.product_url" @input="errors.product_url = null"
                    :class="[errors.product_url && '!tw-border-red-400']" type="text"
                    class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                    placeholder="https://..." required />
                <label v-if="errors.product_url"
                    class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                        errors.product_url }}</label>
            </div>


            <!-- <div class="md:tw-col-span-6 tw-col-span-12">
                <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Estimated
                    Quantity</label>
                <input v-model="form.sourcing.estimated_quantity" readonly @input="errors.estimated_quantity = null"
                    :class="[errors.estimated_quantity && '!tw-border-red-400']" type="number"
                    class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                    placeholder="Estimated quantity" required />
                <label v-if="errors.estimated_quantity"
                    class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                        errors.estimated_quantity }}</label>
            </div> -->

            <div class="md:tw-col-span-6 tw-col-span-12">
                <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Shipping
                    Method</label>

                <div class="tw-relative">
                    <select v-model="form.sourcing.shipping_method" @change="errors.shipping_method = null"
                        :class="[errors.shipping_method && '!tw-border-red-400']"
                        class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5">
                        <option value="not-selected" selected>Select shipping method</option>
                        <option value="air-freight">Air freight</option>
                        <option value="ocean-freight">Ocean freight</option>
                    </select>
                    <div
                        class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                        <svg class="tw-fill-current tw-h-4 tw-w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
                <label v-if="errors.shipping_method"
                    class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                        errors.shipping_method }}</label>

            </div>

            <div class="md:tw-col-span-6 tw-col-span-12">
                <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Destination
                    Country</label>
                <div class="tw-relative">
                    <select v-model="form.sourcing.destination_country" @change="errors.destination_country = null"
                        :class="[errors.destination_country && '!tw-border-red-400']"
                        class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5">
                        <option value="lebanon">Lebanon</option>
                    </select>
                    <div
                        class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                        <svg class="tw-fill-current tw-h-4 tw-w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
                <label v-if="errors.destination_country"
                    class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                        errors.destination_country }}</label>
            </div>


            <div class="tw-col-span-12">
                <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Note</label>
                <textarea v-model="form.sourcing.note" rows="4"
                    class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                    placeholder="Special request"></textarea>
            </div>

            <div class="tw-col-span-12 tw-flex tw-justify-end tw-items-center tw-pt-4 tw-gap-3 ">

                <button :disabled="isLoading" @click="handleUpdate"
                    class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                    <v-icon size="small" class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                        :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                    <span>Update</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import Sourcing from "@/api/Sourcing";
import { useAlert } from "@/composables/useAlert";
import { clone } from "@/helpers/methods";
import { reactive, ref, defineProps, watch, inject } from "vue";

const errors = reactive({});
const props = defineProps(['sourcing']);
const isLoading = ref(false);
const sourcingOptions = inject('sourcing');

const form = reactive({
    sourcing: {}
});

const handleUpdate = async () => {
    isLoading.value = true;
    await Sourcing.update(form.sourcing.id, form.sourcing)
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                sourcingOptions.updateSourcing(res.data.sourcing);
                useAlert('Updated success');
            }
        },
        err => {
            if(err?.response?.status == 422) {
                for(let e in err?.response?.data?.errors) {
                    errors[e] = err?.response?.data?.errors[e][0]
                }
            }
        }
    );
    isLoading.value = false;
}

watch(() => props.sourcing, () => {
    form.sourcing = clone(props.sourcing);
}, { deep: true })

form.sourcing = clone(props.sourcing);
</script>

<style></style>