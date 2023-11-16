<template>
    <div>
        <span class="tw-text-sm tw-text-neutral-600">{{ name }}</span>
        <VueDatePicker v-model="date" @cleared="cleared" @update:model-value="onDateRangePicked" :format="dateFilterFormat" range :preset-ranges="presetRanges">
            <template #yearly="{ label, range, presetDateRange }">
                <span @click="presetDateRange(range)">{{ label }}</span>
            </template>
        </VueDatePicker>
    </div>
</template>
<script>
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, subDays } from 'date-fns'
export default {
    props: ['name'],
    data() {
        return {
            date: ['', ''],
            dateFilterFormat: 'yyyy-MM-dd',
            formattedStartDate: '',
            formattedEndDate: '',
            presetRanges: [
                    { label: 'Today', range: [new Date(), new Date()] },
                    { label: 'Yesterday', range: [subDays(new Date(), 1), subDays(new Date(), 1)] },
                    { label: 'This month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
                    {
                        label: 'Last month',
                        range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
                    },
                    { label: 'This year', range: [startOfYear(new Date()), endOfYear(new Date())] },
                ]
        }
    },

    watch: {
        date() {
            this.$emit('update:filter', [this.formattedStartDate, this.formattedEndDate])
        }
    },

    methods: {
        onDateRangePicked(range) {
            if(range) {
                this.formattedStartDate = range[0];
                this.formattedEndDate = range[1];
            } else {
                this.formattedStartDate = null;
                this.formattedEndDate = null;
            }
        },
        cleared() {
            this.date = ['', '']
        }
    }
}
</script>
<style>
    
</style>