<template>
    <div v-click-outside="handleClickOutside" class="tw-relative">
        <button @click="isOpen = !isOpen"
            class="tw-w-[250px] tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-h-[40px] tw-flex tw-items-center tw-gap-2 tw-p-2 tw-duration-200 hover:tw-bg-gray-100 tw-cursor-pointer">
            <icon icon="solar:calendar-outline" class="tw-text-gray-600 tw-text-xl" />
            <span class="tw-text-sm tw-font-semibold">{{ selectedLabel }}</span>
        </button>

        <transition name="fade">
            <div v-if="isOpen"
                class="tw-absolute tw-top-full tw-w-[320px] tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-shadow-lg tw-z-10 tw-right-1/2 tw-translate-y-2">
                <div class="tw-p-4 tw-border-b tw-border-solid tw-border-gray-200">
                    <h3 class="tw-text-lg tw-font-semibold tw-text-gray-600">Select Date Range</h3>
                </div>
                
                <div class="tw-p-4 tw-flex tw-flex-col tw-gap-2">
                    <div class="tw-flex tw-gap-2 tw-flex-wrap">
                        <button v-for="(label, range) in quickOptions" :key="range" @click="selectQuickOption(range)"
                            class="tw-p-2 tw-text-sm tw-rounded tw-border tw-bg-gray-100 hover:tw-bg-gray-200">
                            {{ label }}
                        </button>
                    </div>
                    <div>
                        <label for="">From <span class="tw-text-xs tw-text-gray-500">(Month / Day / Year)</span></label>
                        <input type="date" v-model="startDate" class="tw-w-full tw-p-2 tw-border tw-rounded tw-border-solid tw-border-gray-200 focus:tw-border-orange-300 tw-duration-200 tw-outline-none" />
                    </div>

                    <div>
                        <label for="">To <span class="tw-text-xs tw-text-gray-500">(Month / Day / Year)</span></label>
                        <input type="date" v-model="endDate" class="tw-w-full tw-p-2 tw-border tw-rounded tw-border-solid tw-border-gray-200 focus:tw-border-orange-300 tw-duration-200 tw-outline-none" />
                    </div>
                </div>

                <div class="tw-sticky tw-bottom-0 tw-p-4 tw-bg-white tw-border-t tw-border-solid tw-border-gray-200 tw-flex tw-justify-end">
                    <button @click="onFilter"
                        class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-transparent hover:tw-border-orange-600 hover:tw-bg-orange-500/80 tw-duration-300 tw-text-white">
                        Apply
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';

const isOpen = ref(false);
const filters = inject('filters');
const startDate = ref(new Date().toISOString().split('T')[0]);
const endDate = ref(new Date().toISOString().split('T')[0]);

const quickOptions = {
    last7: "Last 7 Days",
    last30: "Last 30 Days",
    thisMonth: "This Month",
    lastMonth: "Last Month"
};

const selectedLabel = computed(() => {
    return startDate.value === endDate.value ? startDate.value : `${startDate.value} - ${endDate.value}`;
});

const handleClickOutside = () => {
    isOpen.value = false;
};

const selectQuickOption = (option) => {
    const today = new Date();
    let start, end;

    switch (option) {
        case "last7":
            start = new Date();
            start.setDate(today.getDate() - 7);
            end = today;
            break;
        case "last30":
            start = new Date();
            start.setDate(today.getDate() - 29);
            end = today;
            break;
        case "thisMonth":
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = today;
            break;
        case "lastMonth":
            start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            end = new Date(today.getFullYear(), today.getMonth(), 0);
            break;
    }
    
    startDate.value = start.toISOString().split('T')[0];
    endDate.value = end.toISOString().split('T')[0];
};

selectQuickOption('last7');

const onFilter = () => {
    filters.value.date_range = [startDate.value, endDate.value];
    filters.value.count++;
    isOpen.value = false;
};
</script>

<style scoped>
/* Fade animation for dropdown */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
