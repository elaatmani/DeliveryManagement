<template>
    <div>
        <popup-new :visible="visible" :closeable="!isLoading" @cancel="cancel" >
            <div
                class="tw-mx-auto tw-w-[95%] md:tw-max-w-[800px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg"
            >
                <div
                    class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50"
                    >
                    <span>Quick Actions</span>
                    <span class="tw-px-2 tw-w-fit tw-bg-orange-500 tw-aspect-auto tw-text-white tw-rounded">{{ selected.length }}</span>
                </div>

                <div class="tw-bg-white tw-p-4">
                    <div class="tw-grid tw-gap-6 tw-gap-y-5 tw-grid-cols-1 md:tw-grid-cols-2">

                        <div class="tw-col-span-2 md:tw-col-span-1">
                            <BulkSelectAction v-model:action="action" />
                        </div>

                        <div v-if="action == 2" class="tw-col-span-2 md:tw-col-span-1">
                            <BulkDeliveryAction v-model:value="value" />
                        </div>

                    </div>
                </div>

                <div
                    class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid"
                    >
                    <button
                        @click="cancel"
                        class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300"
                    >
                        Cancel
                    </button>
                    <button
                    @click="execute"
                        class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white"
                    >
                        <v-icon
                        size="small"
                        
                        class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                        :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']"
                        >mdi-loading</v-icon
                        >
                        <span>Apply</span>
                    </button>
                </div>
            </div>
        </popup-new>
    </div>
</template>

<script>
import BulkSelectAction from './BulkSelectAction.vue';
import BulkDeliveryAction from './actions/BulkDeliveryAction.vue';
import execute from './execute'

export default {
    components: { BulkSelectAction, BulkDeliveryAction },
    props: {
        visible: {
            required: true
        },
        selected: {
            required: true
        }
    },
    data() {
        return {
            isLoading: false,
            action: 1,
            value: 'not-selected'
        };
    },

    watch: {
        action() {
            this.value = 'not-selected'
        }
    },

    methods: {
        cancel() {
            this.$emit('update:visible', false);
        },

        execute() {

            if(this.action == 1) {
                this.$alert({
                    title: 'Select action',
                    type: 'info'
                })
                return false;
            }

            if(this.value == 'not-selected') {
                this.$alert({
                    title: 'Select value',
                    type: 'info'
                })
                return false;
            }
            
            const options = {
                action: this.action,
                value: this.value,
                selected: this.selected
            }

            execute(this, options)
        }
    },
}

</script>