<template>
    <div v-if="!loading" class="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-2">
        <div class="tw-shadow-md tw-p-4 tw-flex tw-items-center tw-justify-center  tw-flex-wrap tw-bg-white tw-rounded-lg tw-border-blue-500 tw-border-solid tw-border-2">
            <h1 class="tw-text-xl tw-font-semibold tw-py-2 tw-text-blue-500">Facebook:</h1>
            <div class="tw-flex tw-flex-wrap">
                <div class="tw-border-green-500 tw-border-solid tw-border-2 tw-rounded-lg tw-p-2 tw-m-2">       
                    <p class="tw-text-green-500">Total Spend: {{ data.globalFacebookTotalSpend ? data.globalFacebookTotalSpend : '0.00' }}</p>
                </div>
                <div class="tw-border-blue-300 tw-border-solid tw-border-2 tw-rounded-lg tw-p-2 tw-m-2">
                    <p class="tw-text-blue-300">Total Leads: {{ data.globalFacebookTotalLeads ? data.globalFacebookTotalLeads :'0.00'}}</p>
                </div>
                <div class="tw-border-purple-500 tw-border-solid tw-border-2 tw-rounded-lg tw-p-2 tw-m-2">
                     <p class="tw-text-purple-500">Cost Per Lead: {{ globalFacebookCostPerLead }}</p>
                </div>
            </div>
        </div>
        <div class="tw-shadow-md tw-p-4 tw-flex tw-items-center tw-justify-center tw-flex-wrap tw-bg-white tw-rounded-lg tw-border-[#f60457] tw-border-solid tw-border-2">
            <h1 class="tw-text-xl tw-font-semibold tw-py-2 tw-text-[#f60457]">Tiktok:</h1>
            <div class="tw-flex tw-flex-wrap">
                <div class="tw-border-green-500 tw-border-solid tw-border-2 tw-rounded-lg tw-p-2 tw-m-2">       
                    <p class="tw-text-green-500">Total Spend: {{ data.globalTiktokTotalSpend ? data.globalTiktokTotalSpend :'0.00'}}</p>
                </div>
                <div class="tw-border-blue-300 tw-border-solid tw-border-2 tw-rounded-lg tw-p-2 tw-m-2">
                    <p class="tw-text-blue-300">Total Leads: {{  data.globalTiktokTotalLeads ? data.globalTiktokTotalLeads : '0.00' }}</p>
                </div>
                <div class="tw-border-purple-500 tw-border-solid tw-border-2 tw-rounded-lg tw-p-2 tw-m-2">
                     <p class="tw-text-purple-500">Cost Per Lead: {{ globalTiktokCostPerLead }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class=" tw-h-[100px] tw-my-auto tw-flex tw-items-center tw-justify-center">
        <Loading/>
    </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue';
import Dashboard from '@/api/Dashboard';

const data = ref({});
const loading = ref(false);
onMounted(async () => {
    loading.value = true; 
    const response = await Dashboard.stats();
    if (response.data.code === 'SUCCESS') {
        data.value = response.data.data;
    }
    loading.value = false; 
});
const globalTiktokCostPerLead = computed(() => {
    return data.value.globalTiktokCostPerLead ? data.value.globalTiktokCostPerLead.toFixed(2) : '0.00';
});
const globalFacebookCostPerLead = computed(() => {
    return data.value.globalFacebookCostPerLead ? data.value.globalFacebookCostPerLead.toFixed(2) : '0.00';
});
</script>