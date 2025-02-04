<template>
    <div>
        <popup-new :visible="visible" :closeable="true" @cancel="handleCancel">
            <div
                class="tw-mx-auto tw-w-[95%] md:tw-max-w-[600px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg">
                <div
                    class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50">
                    Add Record
                </div>

                <div class="tw-bg-white tw-p-4">
                    <div class="tw-grid tw-gap-6 tw-gap-y-5 tw-grid-cols-1 md:tw-grid-cols-2">

                        <div class="tw-col-span-2 md:tw-col-span-2">
                            <div class="tw-grid tw-grid-cols-2 tw-gap-4">
                                <button @click="record.type = 'cash-in'" :class="[record.type == 'cash-in' && '!tw-border-emerald-400 tw-border-2x']" class="tw-duration-200 hover:tw-border-emerald-200 tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-border tw-border-solid tw-border-gray-200 tw-rounded tw-p-2 tw-gap-2">
                                    <icon class=" tw-text-2xl tw-text-emerald-400" icon="solar:cash-out-outline" />
                                    <span>Cash In</span>
                                </button>
                                
                                <button @click="record.type = 'cash-out'" :class="[record.type == 'cash-out' && '!tw-border-rose-400 tw-border-2x']" class="tw-duration-200 hover:tw-border-rose-200 tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-border tw-border-solid tw-border-gray-200 tw-rounded tw-p-2 tw-gap-2">
                                    <icon class="tw-rotate-180  tw-text-2xl tw-text-rose-400" icon="solar:cash-out-outline" />
                                    <span>Cash Out</span>
                                </button>
                            </div>
                        </div>

                        <div class="md:tw-col-span-2 tw-col-span-2">
                            <label
                            class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
                            >Category</label
                            >
                            <div class="tw-relative">
                            <select
                            v-model="record.cash_flow_category_id"
                                class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
                            >
                                <option :value="undefined" >Select Category</option>
                                <option :value="c.id" v-for="c in categories" :key="c.id">{{ c.name }}</option>
                            </select>
                            <div
                                class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
                            >
                                <svg
                                class="tw-fill-current tw-h-4 tw-w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                >
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                                </svg>
                            </div>
                            </div>
                        </div>


                        <div class="tw-col-span-2 md:tw-col-span-2">
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Date</label>
                                <div class="tw-relative">
                                    <input v-model="record.spent_at" @input="errors.spent_at = null" type="date"
                                        :class="[errors.spent_at && '!tw-border-red-400']"
                                        class="tw-bg-gray-50 tw-pl-2x tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                        placeholder="0" required />
                                </div>
                            <label v-if="errors.spent_at"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                errors.spent_at }}</label>
                        </div>


                        <div class="tw-col-span-2 md:tw-col-span-2">
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Amount</label>
                                <div class="tw-relative">
                                    <input v-model="record.amount" @input="errors.amount = null" type="number"
                                        :class="[errors.amount && '!tw-border-red-400']"
                                        class="tw-bg-gray-50 tw-pl-8 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                        placeholder="0" required />
                                        <icon icon="iconoir:dollar" class="tw-absolute tw-left-2 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-500" />
                                </div>
                            <label v-if="errors.amount"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                errors.amount }}</label>
                        </div>


                        <div class="tw-col-span-2 md:tw-col-span-2">
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Description</label>
                                <div class="tw-relative">
                                    <input v-model="record.description" @input="errors.description = null" type="text"
                                        :class="[errors.description && '!tw-border-red-400']"
                                        class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                        placeholder="Description" required />
                                </div>
                            <label v-if="errors.description"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                errors.description }}</label>
                        </div>

                    </div>
                </div>

                <div
                    class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid">
                    <button @click="handleCancel"
                        class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
                        Cancel
                    </button>
                    <button @click="handleCreate" :disabled="isLoading"
                        class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                        <v-icon size="small"
                            class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                            :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                        <span>Create</span>
                    </button>
                </div>
            </div>
        </popup-new>
    </div>
</template>

<script setup>
import { toRef, ref, defineProps, defineEmits } from 'vue';
import CashFlow from '@/api/CashFlow';

const props = defineProps(['visible', 'categories']);
const categories = toRef(props, 'categories');
const emit = defineEmits(['update:visible']);
const visible = toRef(props, 'visible');
const isLoading = ref(false);

const record = ref({
    amount: 0,
    type: 'cash-in',
});

const errors = ref({});

const handleCreate = async () => { 
    isLoading.value = true;
    await CashFlow.create(record.value)
    .then(
        (res) => {
            if(res.data.code == "SUCCESS") {

                emit('update:visible', false);
            }
        }
    )
    .catch(
        (err) => {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
                errors.value[key] = value[0]; // Assign the first error message for each key
            }
        }
    );
    isLoading.value = false;

};
const handleCancel = () => emit('update:visible', false);
</script>

<style></style>