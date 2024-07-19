<template>
    <div v-if="!loading" class="tw-grid tw-grid-cols-3 tw-gap-4 tw-mb-2">
        <div class="tw-shadow-md tw-p-4   tw-flex-wrap tw-bg-white tw-rounded-lg tw-border-green-300 tw-border-solid tw-border-2">
            <h1 class="tw-text-xl tw-font-semibold">Total Spend: </h1>
            <div class="tw-flex tw-justify-between tw-flex-wrap">
                <div>
                    <div>       
                        <p class="tw-text-blue-700 tw-text-xl">Facebook: {{ data.globalFacebookTotalSpend ? data.globalFacebookTotalSpend : '0.00' }}</p>
                    </div>
                    <div >       
                        <p class="tw-text-[#f60457] tw-text-xl">Tiktok: {{ data.globalTiktokTotalSpend ? data.globalTiktokTotalSpend :'0.00'}}</p>
                    </div>
                    <div class="tw-text-xl tw-font-semibold tw-text-green-500">
                        Total: {{ totalSpend }}
                    </div>
                </div>
         </div>
        </div>
        <div class="tw-shadow-md tw-p-4 tw-flex-wrap tw-bg-white tw-rounded-lg tw-border-blue-300 tw-border-solid tw-border-2">
        <h1 class="tw-text-xl tw-font-semibold tw-text-black">Total Lead:</h1>
        <div>
            <div>
                <p class="tw-text-blue-700 tw-text-xl">Facebook: {{ data.globalFacebookTotalLeads ? data.globalFacebookTotalLeads :'0.00'}}</p>
            </div>
            <div >
                <p class="tw-text-[#f60457] tw-text-xl">TikTok: {{  data.globalTiktokTotalLeads ? data.globalTiktokTotalLeads : '0.00' }}</p>
            </div>
            <div class="tw-text-xl tw-font-semibold tw-text-blue-500">
                Total: {{ totalLeads }}
            </div>
        </div>
    </div>
    <div class="tw-shadow-md tw-p-4 tw-flex-wrap tw-bg-white tw-rounded-lg tw-border-purple-300 tw-border-solid tw-border-2">
        <h1 class="tw-text-xl tw-font-semibold">Cost Per Lead:</h1>
        <div>   
            <div>
                <p class="tw-text-blue-700 tw-text-xl">Facebook: {{ globalFacebookCostPerLead }}</p>
            </div>
            <div >
                <p class="tw-text-[#f60457] tw-text-xl">Tiktok: {{ globalTiktokCostPerLead }}</p>
            </div> 
            <div class="tw-text-xl tw-font-semibold tw-text-purple-500">
                Average: {{ averageCostPerLead }}
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
const totalSpend = computed(() => {
    const fbSpend = data.value.globalFacebookTotalSpend ? parseFloat(data.value.globalFacebookTotalSpend) : 0;
    const tiktokSpend = data.value.globalTiktokTotalSpend ? parseFloat(data.value.globalTiktokTotalSpend) : 0;
    return (fbSpend + tiktokSpend).toFixed(2);
});
const totalLeads = computed(() => {
    const fbLeads = data.value.globalFacebookTotalLeads ? parseFloat(data.value.globalFacebookTotalLeads) : 0;
    const tiktokLeads = data.value.globalTiktokTotalLeads ? parseFloat(data.value.globalTiktokTotalLeads) : 0;
    return (fbLeads + tiktokLeads).toFixed(2);
});

const averageCostPerLead = computed(() => {
    const fbCost = data.value.globalFacebookCostPerLead ? parseFloat(data.value.globalFacebookCostPerLead) : 0;
    const tiktokCost = data.value.globalTiktokCostPerLead ? parseFloat(data.value.globalTiktokCostPerLead) : 0;
    return ((fbCost + tiktokCost) / 2).toFixed(2);
});

</script>