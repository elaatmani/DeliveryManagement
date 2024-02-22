<template>
  <div>
        <button @click="visible = true"
            class="tw-py-2 tw-px-7 tw-w-full justify-center tw-flex tw-items-center tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
            Cancel
        </button>
        <popup-new :visible="visible" @cancel="visible = false">
            <div
                class="tw-mx-auto tw-w-[95%] md:tw-max-w-[500px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg"
            >
                <div
                class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50"
                >
                Cancel product sourcing
                </div>
                <div class="tw-p-4 tw-bg-white">
                    <p class="tw-text-lg tw-font-medium">
                        Are you sure you want to cancel with this sourcing ?
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
                        @click="handleCancel"
                        :disabled="isLoading"
                        class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-rose-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-rose-600 dark:tw-border-neutral-900 dark:hover:tw-border-rose-500 hover:tw-bg-rose-500/80 dark:hover:tw-bg-rose-400 tw-duration-300 tw-text-white"
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
import { useAlert } from '@/composables/useAlert';
import { ref, defineProps, toRef, inject } from 'vue';
import Sourcing from '@/api/Sourcing';

const visible = ref(false);
const isLoading = ref(false);
const props = defineProps(['sourcing']);
const sourcing = toRef(props, 'sourcing');
const sourcingOptions = inject('sourcing');

const handleCancel = async () => {
    // return false;
    console.log(props)
    isLoading.value = true;
    await Sourcing.update(sourcing.value.id, {...sourcing.value, quotation_status: 'cancelled'})
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                sourcingOptions.updateSourcing(res.data.sourcing);
                useAlert('Quotation has been cancelled')
            }
        }
    )
    visible.value = false;
    isLoading.value = false;
}

</script>

<style>

</style>