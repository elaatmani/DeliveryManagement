<template>
    <div class="tw-absolute tw-top-full tw-z-10 tw-pt-2">
        <div
            class="tw-flex tw-flex-col tw-w-[800px] tw-h-[380px] tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-shadow tw-overflow-hidden">
            <div class="tw-grid tw-grid-cols-12 tw-h-full">
                <div
                    class="tw-col-span-3 tw-p-2 tw-flex tw-flex-col tw-gap-2 tw-max-h-[320px] tw-overflow-auto tw-relative">
                    <button @click="handleCustomDate(date)" v-for="date in customDates" :key="date.name"
                        :class="[date.name === selectedDateName && '!tw-bg-gray-100 !tw-text-black']"
                        class="tw-flex tw-items-center tw-justify-between tw-p-2 tw-rounded tw-bg-white tw-text-start tw-font-semibold tw-text-gray-600 tw-duration-200 hover:tw-bg-gray-100">
                        <span>{{ date.name }}</span>
                        <icon icon="mage:check" class="tw-text-xl tw-text-black"
                            v-if="date.name === selectedDateName" />
                    </button>
                </div>
                <div v-if="selectedDateName != 'Lifetime'" class="tw-col-span-9 tw-p-2 tw-border-l tw-border-solid tw-border-gray-200">
                    <div v-if="false" class="tw-flex tw-items-center tw-gap-1">
                        <input type="text"
                            class="tw-w-[47%] tw-h-[35px] tw-px-2 tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-outline-none tw-flex-1x"
                            v-model="selectedDates.start" />
                        <div class="tw-w-[6%] tw-flex tw-justify-center tw-items-center">
                            <icon icon="mage:arrow-right" class="tw-text-gray-400 tw-text-sm" />
                        </div>
                        <input type="text"
                            class="tw-w-[47%] tw-h-[35px] tw-px-2 tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-outline-none tw-flex-1x"
                            v-model="selectedDates.end" />
                    </div>
                    <div class="tw-flex tw-p-2 tw-h-full tw-mt-2">
                        <DatePicker multi-month allow-range :month="month" :year="year" :day="day" v-model="selectedDates"
                            @month-change="handleMonthChange" @day-change="handleDayChange" @change="handleChange" />
                    </div>
                </div>
            </div>
            <div class="tw-col-span-12 tw-bg-white tw-h-[50px] tw-border-t tw-border-solid tw-border-gray-200">
                <div class="tw-flex tw-items-center tw-justify-end tw-gap-2 tw-h-full tw-px-2">
                    <button @click="emit('close')" class="tw-px-4 tw-py-0.5 tw-rounded tw-bg-gray-50 tw-text-gray-500">Close</button>
                    <button @click="onFilter" class="tw-px-4 tw-py-0.5 tw-rounded tw-bg-orange-400 tw-text-white">Filter</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, inject, defineEmits } from 'vue';

const emit = defineEmits(['close', 'setName']);
const filters = inject('filters');
const filter = inject('filter');
const today = new Date(Date.now());
const month = ref(today.getMonth());
const year = ref(today.getFullYear());
const day = ref(today.getDay());
const selectedDates = ref({
    start: null,
    end: null,
});

setTimeout(() => {
    filters.value.date = selectedDates.value;
})

const selectedDateName = ref('Lifetime');


const customDates = [
    {
        name: 'Lifetime',
        start: null,
        end: null
    },
    {
        name: 'Today',
        start: new Date(today),
        end: new Date(today)
    },
    {
        name: 'Yesterday',
        start: new Date(new Date(today).setDate(today.getDate() - 1)),
        end: new Date(new Date(today).setDate(today.getDate() - 1))
    },
    {
        name: 'Last 7 days',
        start: new Date(new Date(today).setDate(today.getDate() - 6)),
        end: new Date(today)
    },
    {
        name: 'Last 30 days',
        start: new Date(new Date(today).setDate(today.getDate() - 29)),
        end: new Date(today)
    },
    {
        name: 'Last 90 days',
        start: new Date(new Date(today).setDate(today.getDate() - 89)),
        end: new Date(today)
    },
    {
        name: 'Last 365 days',
        start: new Date(new Date(today).setDate(today.getDate() - 364)),
        end: new Date(today)
    },
    {
        name: 'Last month',
        start: new Date(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
        end: new Date(new Date(today.getFullYear(), today.getMonth(), 0))
    },
    {
        name: 'Last 12 months',
        start: new Date(new Date(today).setFullYear(today.getFullYear() - 1)),
        end: new Date(today)
    },
    {
        name: 'Week to date',
        start: new Date(new Date(today).setDate(today.getDate() - today.getDay() + 1)),
        end: new Date(today)
    },
    {
        name: 'Month to date',
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: new Date(today)
    },
    {
        name: 'Quarter to date',
        start: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1),
        end: new Date(today)
    },
    {
        name: 'Year to date',
        start: new Date(today.getFullYear(), 0, 1),
        end: new Date(today)
    }
];

watch(() => selectedDates.value, () => {
    filters.value.date = selectedDates.value;
}, { deep: true })

const handleMonthChange = (m, y) => {
    month.value = m;
    year.value = y;
    console.log(y, m)
};

const handleChange = (v) => {
    console.log('month: ', v);
}

const handleDayChange = (v) => {
    console.log('day: ', v);
}

const handleCustomDate = (v) => {
    selectedDates.value.start = v.start;
    selectedDates.value.end = v.end;
    selectedDateName.value = v.name;
    emit('setName', v.name)
}


const onFilter = () => {
    filter();
    emit('close');
}
</script>

<style>
.Polaris-DatePicker__Header {
    margin-top: -15px !important;
}
</style>