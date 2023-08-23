<template>
    <div>
        <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Value</label>
        <div class="tw-relative">
            <select v-model="vvalue" :class="[false && '!tw-border-red-400']"
                class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 tw-pr-7">
                <option disabled value="not-selected">Select a value</option>
                <option :class="[s.text]" v-for="s in statuses" :value="s.value" :key="s.id">{{ s.name }}</option>
            </select>

            <div
                class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                <svg class="tw-fill-current tw-h-4 tw-w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
        <label v-if="false" class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">
            {{ 'error' }}
        </label>
    </div>
</template>

<script>
import { deliveryStatus } from '@/config/orders'

export default {
    props: {
        value: {
            required: true
        }
    },

    data() {
        return {
            statuses: deliveryStatus,
        }
    },

    computed: {
        vvalue: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('update:value', v)
            }
        }
    }
}

</script>