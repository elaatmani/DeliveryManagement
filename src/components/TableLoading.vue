<template>
    <tbody class="tw-bg-white tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700 darkx:tw-bg-gray-900">
        <tr>
            <td :colspan="props.rows">

                <div role="status"
                    class="tw-w-full tw-p-4 tw-space-y-4  tw-border-gray-200 tw-divide-y tw-divide-gray-200 tw-rounded tw-shadow tw-animate-pulse dark:tw-divide-gray-300 md:tw-p-6 dark:tw-border-gray-300">
                    <div class="tw-flex tw-items-center tw-justify-between">
                        <div>
                            <!-- <div class="tw-h-2.5 tw-bg-gray-300 tw-rounded-full dark:tw-bg-gray-600 tw-w-24 tw-mb-2.5"></div> -->
                            <div class="tw-w-32 tw-h-2 tw-bg-gray-200 tw-rounded-full dark:tw-bg-gray-200">
                            </div>
                        </div>
                        <div class="tw-h-2.5 tw-bg-gray-300 tw-rounded-full dark:tw-bg-gray-200 tw-w-12">
                        </div>
                    </div>
                    <div v-for="i in props.columns" :key="i" class="tw-flex tw-items-center tw-justify-between tw-pt-4">
                        <div>
                            <div class="tw-w-32 tw-h-2 tw-bg-gray-200 tw-rounded-full dark:tw-bg-gray-200">
                            </div>
                        </div>
                        <div class="tw-h-2.5 tw-bg-gray-200 tw-rounded-full dark:tw-bg-gray-200 tw-w-12">
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    columns: {
        type: Number,
        required: false,
        default: 10
    },
    rows: {
        type: Number,
        required: false,
        default: 10
    }
})
</script>

<style></style>