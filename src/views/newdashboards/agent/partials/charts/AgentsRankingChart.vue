<template>
    <div v-if="!loading" class="tw-bg-white tw-p-2 tw-border tw-border-solid tw-border-gray-200 tw-h-[300px] tw-flex tw-flex-col">
        <div class="tw-flex tw-items-center tw-gap-2">
            <p class="tw-p-2 tw-font-bold tw-text-lg">Ranking</p>
        </div>

        <div class="tw-p-2 tw-bg-gray-200x tw-flex-1">
            <div class="tw-flex tw-flex-col tw-gap-1">
                <div v-for="(u, index) in sortedData" :key="u.agente_id" :class="[user.id == u.agente_id &&  'tw-border-amber-500 tw-font-semibold tw-bg-gray-50']" class="tw-text-sm tw-flex tw-items-center tw-justify-between tw-border-l-2 tw-px-2 tw-border-solid tw-border-gray-200">
                    <span :class="[user.id == u.agente_id ? 'tw-text-base tw-text-amber-500' : 'tw-blur-sm tw-select-none tw-pointer-events-none']">#{{ (index + 1) }} - {{ u.name }}</span>
                    <div class="tw-font-semibold" :class="[u.confirmation_percentage > 50 ? 'tw-text-green-600' : 'tw-text-red-700']">{{ u.confirmation_percentage }}%</div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="loading" class="tw-bg-white tw-p-2 tw-border tw-border-solid tw-border-gray-200 tw-h-[300px]">
        <div class="tw-flex tw-items-center tw-gap-2">
            <p class="tw-p-2 tw-font-bold tw-text-lg">Ranking</p>
            <p class="tw-px-1 tw-bg-emerald-600 tw-text-white tw-text-sm tw-rounded">
                <icon icon="eos-icons:three-dots-loading" class="tw-text-xl" />
            </p>
        </div>
        <div class="tw-h-[230px] tw-w-full tw-bg-gray-100 tw-rounded tw-animate-pulse">
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Analytics from '@/api/Analytics'
import store from '@/store/'


const loading = ref(true);
const user = computed(() => store.getters['user/user']);

const data = ref([
    {
        "agente_id": "11",
        "total_orders": 5433,
        "name": "aya1 aya1",
        "confirmed_orders": "3398",
        "confirmation_percentage": 62.54
    },
    {
        "agente_id": "13",
        "total_orders": 27455,
        "name": "rania1 rania1",
        "confirmed_orders": "16988",
        "confirmation_percentage": 61.88
    },
    {
        "agente_id": "18",
        "total_orders": 16229,
        "name": "Rahaf Rahaf",
        "confirmed_orders": "9876",
        "confirmation_percentage": 60.85
    },
    {
        "agente_id": "23",
        "total_orders": 28156,
        "name": "Safa safa",
        "confirmed_orders": "17017",
        "confirmation_percentage": 60.44
    },
    {
        "agente_id": "2",
        "total_orders": 1340,
        "name": "aicha aicha",
        "confirmed_orders": "785",
        "confirmation_percentage": 58.58
    },
    {
        "agente_id": "32",
        "total_orders": 842,
        "name": "hana hana",
        "confirmed_orders": "515",
        "confirmation_percentage": 61.16
    },
    {
        "agente_id": "50",
        "total_orders": 6129,
        "name": "raghad raghad",
        "confirmed_orders": "3784",
        "confirmation_percentage": 61.74
    },
    {
        "agente_id": "52",
        "total_orders": 2514,
        "name": "AMANI AMANI",
        "confirmed_orders": "1289",
        "confirmation_percentage": 51.27
    },
    {
        "agente_id": "8",
        "total_orders": 5234,
        "name": "sarah sarah",
        "confirmed_orders": "3053",
        "confirmation_percentage": 58.33
    }
]);

const sortedData = computed(() => data.value.toSorted((a, b) => b.confirmation_percentage - a.confirmation_percentage))

const getData = async () => {
    loading.value = true;
    await Analytics.agentsRanking()
        .then(
            res => {
                if (res.data.code == 'SUCCESS') {
                    console.log(data)
                    // data.value = res.data.data
                    data
                }
            },
            err => {
                console.log(err)
            }
        )
    loading.value = false;
}

getData()

</script>

<style></style>