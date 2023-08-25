<template>
    <div class="tw-mb-4">
        <div class="tw-w-full tw-p-3 tw-py-2 tw-rounded-lg tw-bg-gray-50 tw-border tw-border-solid ">
            <div class="tw-flex tw-items-center tw-gap-2 tw-justify-between">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <div class="tw-text-sm tw-px-2 tw-w-fit tw-bg-orange-500 tw-aspect-auto tw-text-white tw-rounded">{{ selected.length }}</div>
                    <p class="tw-font-bold tw-text-sm"> Selected</p>
                </div>

                <div class="tw-flex tw-items-center tw-gap-2">
                    <button @click="$emit('update:selected', [])" class="tw-bg-white tw-flex tw-items-center tw-gap-1 tw-py-1.5 hover:tw-shadow-none tw-duration-200 tw-px-3 tw-text-sm tw-rounded tw-border tw-border-solid tw-border-gray-300 tw-shadow-sm">
                        <svg class="tw-stroke-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
                        <span>
                            Clear Selection
                        </span>
                    </button>

                    <button @click="popup = true" class="tw-bg-white tw-flex tw-items-center tw-gap-1 tw-py-1.5 hover:tw-shadow-none tw-duration-200 tw-px-3 tw-text-sm tw-rounded tw-border tw-border-solid tw-border-gray-300 tw-shadow-sm">
                        <svg class="tw-stroke-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.232 11.768A2.493 2.493 0 0 0 10 12.5c.672 0 1.302-.267 1.768-.732A2.493 2.493 0 0 0 12.5 10c0-.672-.267-1.302-.732-1.768A2.493 2.493 0 0 0 10 7.5c-.672 0-1.302.267-1.768.732A2.493 2.493 0 0 0 7.5 10c0 .672.267 1.302.732 1.768Zm2.829-.707c-.28.28-.657.439-1.061.439c-.404 0-.78-.16-1.06-.44S8.5 10.405 8.5 10s.16-.78.44-1.06s.656-.44 1.06-.44s.78.16 1.06.44s.44.656.44 1.06s-.16.78-.44 1.06Z"/><path d="m14.216 3.773l-1.27.714a6.213 6.213 0 0 0-1.166-.48l-.47-1.414a.5.5 0 0 0-.474-.343H9.06a.5.5 0 0 0-.481.365l-.392 1.403a6.214 6.214 0 0 0-1.164.486L5.69 3.835a.5.5 0 0 0-.578.094L3.855 5.185a.5.5 0 0 0-.082.599l.714 1.27c-.199.37-.36.76-.48 1.166l-1.414.47a.5.5 0 0 0-.343.474v1.777a.5.5 0 0 0 .365.481l1.403.392c.122.405.285.794.486 1.164l-.669 1.333a.5.5 0 0 0 .094.578l1.256 1.256a.5.5 0 0 0 .599.082l1.27-.714c.37.199.76.36 1.166.48l.47 1.414a.5.5 0 0 0 .474.343h1.777a.5.5 0 0 0 .481-.365l.392-1.403a6.21 6.21 0 0 0 1.164-.486l1.333.669a.5.5 0 0 0 .578-.093l1.256-1.257a.5.5 0 0 0 .082-.599l-.714-1.27c.199-.37.36-.76.48-1.166l1.414-.47a.5.5 0 0 0 .343-.474V9.06a.5.5 0 0 0-.365-.481l-1.403-.392a6.208 6.208 0 0 0-.486-1.164l.669-1.333a.5.5 0 0 0-.093-.578l-1.257-1.256a.5.5 0 0 0-.599-.082Zm-1.024 1.724l1.184-.667l.733.733l-.627 1.25a.5.5 0 0 0 .019.482c.265.44.464.918.59 1.418a.5.5 0 0 0 .35.36l1.309.366v1.037l-1.327.44a.5.5 0 0 0-.328.354a5.216 5.216 0 0 1-.585 1.42a.5.5 0 0 0-.007.502l.667 1.184l-.733.733l-1.25-.627a.5.5 0 0 0-.482.019c-.44.265-.918.464-1.418.59a.5.5 0 0 0-.36.35l-.366 1.309H9.525l-.44-1.327a.5.5 0 0 0-.355-.328a5.217 5.217 0 0 1-1.42-.585a.5.5 0 0 0-.502-.007l-1.184.667l-.733-.733l.627-1.25a.5.5 0 0 0-.019-.482a5.216 5.216 0 0 1-.59-1.418a.5.5 0 0 0-.35-.36l-1.309-.366V9.525l1.327-.44a.5.5 0 0 0 .327-.355c.125-.5.323-.979.586-1.42a.5.5 0 0 0 .007-.502L4.83 5.624l.733-.733l1.25.627a.5.5 0 0 0 .482-.019c.44-.265.918-.464 1.418-.59a.5.5 0 0 0 .36-.35l.366-1.309h1.037l.44 1.327a.5.5 0 0 0 .354.327c.5.125.979.323 1.42.586a.5.5 0 0 0 .502.007Z"/></g></svg>
                        <span>
                            Actions
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="popup">
            <BulkPopup :selected="selected" @update="handleUpdate" v-model:visible="popup" />
        </div>
    </div>
</template>

<script>
import BulkPopup from './BulkPopup.vue';

export default {
    components: { BulkPopup },

    props: {
        selected: {
            required: true
        }
    },
    data() {
        return {
            popup: false
        };
    },

    methods: {
        handleUpdate() {
            this.$emit('update');
        }
    }
}
</script>