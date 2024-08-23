<template>
    <div>
        <div
            class="tw-bg-white tw-border tw-border-dashedx tw-border-gray-200 tw-shadow-sm tw-rounded-lgx tw-p-4 tw-h-fit">
            <div class="tw-flex tw-justify-start tw-gap-5">
                <div :style="{ background: color }"
                    class="tw-p-2 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[50px] tw-h-[50px] tw-text-white">
                    <v-icon :style="[title == 'Orders' && { color: '#2ee1ff' }]" size="x-large">{{ icon }}</v-icon>
                </div>
                <div class="tw-w-full">
                    <div class="tw-flex tw-w-full tw-items-center tw-justify-between tw-gap-2">
                        <p class="tw-text-gray-500 tw-uppercase tw-text-sm tw-font-bold">{{ title }}</p>
                        <p v-if="percentage != undefined"
                            class="tw-text-sm tw-font-medium tw-rounded tw-px-1 tw-text-white"
                            :style="{ background: color }">{{ (percentage).toFixed(2) }}%</p>
                    </div>
                    <div class="tw-flex tw-w-full tw-items-center tw-gap-2">
                        <span class="tw-text-gray-700 tw-text-xl tw-font-bold">
                            {{ parseFloat(value).toFixed(2) }}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            required: true,
        },
        title: {
            required: true,
        },
        value: {
            required: true
        },
        symbol: {
            default: '',
            required: false
        },
        percentage: {
            required: false
        },
        color: {
            required: true,
            default: '#6b7280'
        }
    }
}
</script>

<style></style>