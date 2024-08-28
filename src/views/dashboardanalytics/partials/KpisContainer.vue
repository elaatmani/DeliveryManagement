<template>
    <div class="tw-h-full tw-bg-white tw-border tw-border-solid tw-border-gray-200 tw-p-4 tw-w-full">
        <p class="tw-text-lg tw-font-bold">KPIs</p>
        <div v-if="loading"  class="tw-mt-3  tw-grid tw-grid-cols-12 tw-gap-3">
            <div class="tw-p-5 tw-h-[90px] tw-bg-gray-100 tw-col-span-3 tw-animate-pulse" v-for="i in 12" :key="i">
            </div>
        </div>

        <div v-else class="tw-mt-3  tw-grid tw-grid-cols-12 tw-gap-3">
            <div class="tw-p-5 tw-h-[90px] tw-bg-gray-100 tw-col-span-3 tw-animate-pulse" v-for="i in 12" :key="i">
            </div>
        </div>
    </div>
</template>

<script setup>
import Analytics from "@/api/Analytics";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['register', 'loaded']);
const loading = ref(false);
const data = ref({})


const getData = async (filters) => {
    loading.value = true;
    console.log(filters);

    await Analytics.kpis(filters)
        .then(
            res => {
                data.value = res.data.data
            },
            err => {
                console.log(err)
            }
        )
    loading.value = false;
}

getData();

emit('register', getData)
</script>

<style></style>