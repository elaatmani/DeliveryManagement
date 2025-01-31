<template>
    <div>
        <div class="md:tw-col-span-1 tw-col-span-2">
            <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Cancel Reason</label>
            <div class="tw-relative">
                <select :disabled="loading.load" v-model="order.cancel_reason" @change="emit('update:error', '')"
                    class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5">
                    <option :value="reason" v-for="reason in reasons" :key="reason">{{ reason }}</option>
                </select>
                <div
                    class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                    <svg class="tw-fill-current tw-h-4 tw-w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="tw-flex tw-items-center tw-justify-between tw-mt-2 ">
            <div>
                <label v-if="error"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    error }}</label>
            </div>
            <button @click="dialog = true"
                class="tw-text-xs tw-bg-gray-50 tw-text-gray-600 hover:tw-underline tw-rounded tw-px-1">
                Add new
            </button>
        </div>

        <v-dialog v-model="dialog" width="auto" z-index="10000000">
            <v-card max-width="500" title="Add new cancel reason">
                <div class="tw-col-span-2 md:tw-col-span-1 tw-p-4 tw-min-w-[400px]">
                    <label
                        class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Reason</label>
                    <input v-model="newReason" type="text"
                        class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                        placeholder="Order was canceled because..." required />
                    <label v-if="false"
                        class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                            false }}</label>
                </div>
                <template v-slot:actions>
                    <div class="tw-flex tw-items-center tw-justify-end tw-w-full">
                        <button @click="createCancelReason" :disabled="loading.create" :class="loading.create ? 'tw-cursor-not-allowed tw-opacity-50' : ''"
                            class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                            <v-icon size="small"
                                class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                                :class="[loading.create && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                            <span>Create</span>
                        </button>
                    </div>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import CancelReason from '@/api/CancelReason';
import { defineProps, defineEmits, toRef, ref } from 'vue';

const props = defineProps(['order', 'error']);
const emit = defineEmits(['update:order', 'update:error']);
const order = toRef(props, 'order');
const error = toRef(props, 'error');
const loading = ref({
    create: false,
    load: true
})
const dialog = ref(false);
const newReason = ref('');

const reasons = ref([
    "reason 1",
    "reason 2",
    "reason 3",
    "reason 4"
])


const getCancelReasons = async () => {
    loading.value.load = true;
    await CancelReason.all()
    .then(
        res => {
            if(res.data.code == "SUCCESS") {
                reasons.value = res.data.reasons.map(reason => reason.reason);
            }
        }
    )
    loading.value.load = false;
}


const createCancelReason = async () => {
    loading.value.create = true;
    await CancelReason.create({reason: newReason.value})
    .then(
        res => {
            if(res.data.code == "SUCCESS") {
                reasons.value.push(newReason.value);
                order.value.cancel_reason = newReason;
                dialog.value = false;

            }
        }
    )
    loading.value.create = false;
}

getCancelReasons();
</script>

<style></style>