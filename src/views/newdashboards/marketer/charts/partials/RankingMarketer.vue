<template>
   <div v-if="!loading" class="tw-bg-white tw-p-2 tw-border tw-rounded-lg tw-border-solid tw-border-gray-200 tw-h-full tw-flex tw-flex-col">
        <div class="tw-flex tw-items-center tw-gap-2">
            <p class="tw-p-2 tw-font-bold tw-text-lg">Ranking</p>
        </div>

        <div class="tw-p-2 tw-bg-gray-200x tw-flex-1">
            <div class="tw-flex tw-flex-col tw-gap-1">
                <div v-for="(marketer, index) in data" :key="marketer.id" :class="[user.id == marketer.id &&  'tw-border-amber-500 tw-font-semibold tw-bg-gray-50']" class="tw-text-sm tw-flex tw-items-center tw-justify-between tw-border-l-2 tw-px-2 tw-border-solid tw-border-gray-200">
                    <span :class="[user.id == marketer.id ? 'tw-text-base tw-text-amber-500' : 'tw-blur-sm tw-select-none tw-pointer-events-none']">#{{ index + 1 }} - {{ marketer.firstname }} {{ marketer.lastname }}</span>
                    <div class="tw-font-semibold">{{ marketer.total_leads }}</div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="loading" class="tw-bg-white tw-p-2 tw-border tw-border-solid tw-border-gray-200 tw-h-full">
        <div class="tw-flex tw-items-center tw-gap-2">
            <p class="tw-p-2 tw-font-bold tw-text-lg">Ranking</p>
            <p class="tw-px-1 tw-bg-emerald-600 tw-text-white tw-text-sm tw-rounded">
                <icon icon="eos-icons:three-dots-loading" class="tw-text-xl" />
            </p>
        </div>
        <div class="tw-h-[100px] tw-w-full tw-bg-gray-100 tw-rounded tw-animate-pulse">
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Analytics from '@/api/Analytics'
import store from '@/store/'

const loading = ref(true);
const data = ref([]);
const user = computed(() => store.getters['user/user']);

const getData = async () => {
    loading.value = true;
    const response = await Analytics.marketersRanking()
    if (response.data.code === 'SUCCESS') {
        data.value = response.data.data
    }
    loading.value = false;
}

getData()
</script>
