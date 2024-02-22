<template>
    <div>
        <div class="tw-mt-6 tw-mb-4 md:tw-flex md:tw-items-center md:tw-justify-between tw-flex-wrap">
            <div
                class="tw-inline-flex tw-flex-wrap tw-overflow-hidden tw-bg-white tw-border tw-divide-x tw-rounded-lg darkx:tw-bg-gray-900 rtl:tw-flex-row-reverse darkx:tw-border-gray-700 darkx:tw-divide-gray-700">
                <button :class="[true && '!tw-bg-gray-100']" :disabled="true"
                    class="tw-h-[40px] tw-flex tw-items-center tw-justify-center tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 hover:tw-bg-gray-100 sm:tw-text-sm darkx:tw-bg-gray-800 darkx:tw-text-gray-300">
                    View all
                </button>

                <button title="Requests created today" :class="[false && '!tw-bg-gray-100']" :disabled="false"
                    class="tw-h-[40px] tw-flex tw-items-center tw-justify-center tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
                    Today
                </button>

                <button v-if="['admin'].includes($user.role)" title="Filters" :class="[visible.filters && '!tw-bg-gray-100']"
                    @click="visible.filters = !visible.filters"
                    class="tw-h-[40px] tw-flex tw-items-center tw-justify-center tw-px-5 tw-py-2 tw-text-xs tw-font-medium tw-border-solid tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
                    <icon icon="mi:filter" class="tw-text-2xl" />
                </button>

                <div class="tw-relative tw-h-[40px]">
                    <select :value="5"
                        class="tw-h-full tw-px-5 tw-py-2 tw-w-20 focus:tw-outline-none tw-text-xs tw-font-medium tw-text-gray-600 tw-transition-colors tw-duration-200 sm:tw-text-sm darkx:hover:tw-bg-gray-800 darkx:tw-text-gray-300 hover:tw-bg-gray-100">
                        <option :value="i" :key="i" v-for="i in [5, 10, 20, 50, 100, 250, 500]">{{ i }}</option>
                    </select>
                    <div
                        class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
                    >
                        <icon icon="mdi:chevron-down" class="tw-text-xl" />
                    </div>
                </div>
            </div>

            <div>
                <SearchOption />
            </div>
        </div>

        <div v-if="['admin'].includes($user.role)">
            <div :class="[visible.filters ? 'tw-grid-rows-[1fr]' : 'tw-grid-rows-[0fr]']"
                class="tw-grid tw-duration-300 tw-transition-all">
                <div class="tw-overflow-hidden tw-col-span-1">
                    <FilterOption />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import FilterOption from './partials/FilterOption';
import SearchOption from './partials/SearchOption';

const visible = reactive({
    filters: false
})
</script>

<style></style>