<template>
    <div v-if="!loading" class="tw-grid md:tw-grid-cols-4 tw-grid-cols-1 tw-gap-4 tw-mb-2">
        <div v-for="card in cards" :key="card.id"
            class="tw-shadow-lg tw-p-4 tw-flex-wrap tw-bg-[#ffffff] tw-rounded-xl">
            <DashboardCard :color="card.color" :icon="card.icon" :title="card.title" :symbol="card.symbol"
                :percentage="card.percentage" :value="card.value" />
        </div>
    </div>
    <div v-else class="tw-h-[100px] tw-my-auto tw-flex tw-items-center tw-justify-center">
        <Loading />
    </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';
import Dashboard from '@/api/Dashboard';
import DashboardCard from '@/views/dashboardanalytics/partials/analytics/components/DashboardCard';

const props = defineProps({
    filters: {
        type: Object,
        default: () => ({
            dateRange: {
                startDate: null,
                endDate: null,
            },
            selectedAgenteId: null,
        }),
    },
});

const cards = ref([]);
const loading = ref(false);

const getData = async (filters) => {

    loading.value = true;

    const promises = [
        Dashboard.treatedOrHandledOrders(filters),
        Dashboard.DroppedOrders(filters),
        Dashboard.ConfirmedOrders(filters),
        Dashboard.DeliveredOrders(filters),
    ];

    try {
        const results = await Promise.all(promises);
        cards.value = results.map(res => res.data.data.card);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        loading.value = false;
    }
};

watch(
    () => props.filters,
    (newFilters) => {
        const { dateRange, filter } = newFilters || {};
        const { startDate, endDate } = dateRange || {};
        const { selectedAgenteId } = filter || {};
        const filters = { startDate, endDate, selectedAgenteId};

        getData(filters);
    },
    { immediate: true }
);
</script>