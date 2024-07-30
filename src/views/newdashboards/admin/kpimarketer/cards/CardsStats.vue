<template>
    <div v-if="!loading" class="tw-grid md:tw-grid-cols-3 tw-grid-cols-1 tw-gap-4 tw-mb-2">
        <div class="tw-shadow-lg tw-p-4  tw-flex-wrap tw-bg-[#ffffff] tw-rounded-xl">
            <h1 class="tw-text-lg tw-font-semibold tw-mb-2 ">Spend: </h1>
            <div class="tw-flex-wrap">
                <div class="tw-flex tw-flex-wrap">
                    <div class="tw-w-1/2">       
                        <p class="tw-text-white tw-mr-2 tw-bg-blue-800 tw-text-center tw-text-lg tw-rounded-lg tw-p-2">Facebook: {{ data.globalFacebookTotalSpend ? data.globalFacebookTotalSpend.toFixed(2) : '0.00' }}</p>
                    </div>
                    <div class="tw-w-1/2">       
                        <p class="tw-text-white tw-bg-[#f60457] tw-text-center tw-text-lg tw-rounded-lg tw-p-2">Tiktok: {{ data.globalTiktokTotalSpend ? data.globalTiktokTotalSpend.toFixed(2) :'0.00'}}</p>
                    </div>
                </div >
                <div class="tw-text-xl tw-items-center tw-font-semibold tw-text-green-500 tw-border-2 tw-border-green-500 tw-rounded-lg tw-flex tw-justify-center tw-my-2 ">
                    Total: {{ totalSpend }} <icon icon="prime:dollar" class="tw-text-xl tw-text-green-500" />
                </div>   
         </div>
         
        </div>

        <div class="tw-shadow-lg tw-p-4  tw-flex-wrap tw-bg-[#ffffff] tw-rounded-xl">
            <h1 class="tw-text-lg tw-font-semibold tw-mb-2 ">Lead: </h1>
            <div class="tw-flex-wrap">
                <div class="tw-flex tw-flex-wrap">
                    <div class="tw-w-1/2">       
                        <p class="tw-text-white tw-mr-2 tw-bg-blue-800 tw-text-center tw-text-lg tw-rounded-lg tw-p-2">Facebook: {{ data.globalFacebookTotalLeads ? data.globalFacebookTotalLeads.toFixed(2):'0.00'}}</p>
                    </div>
                    <div class="tw-w-1/2">       
                        <p class="tw-text-white tw-bg-[#f60457] tw-text-center tw-text-lg tw-rounded-lg tw-p-2">TikTok: {{  data.globalTiktokTotalLeads ? data.globalTiktokTotalLeads.toFixed(2) : '0.00' }}</p>
                    </div>
                </div >
                <div class="tw-text-xl tw-items-center tw-font-semibold tw-text-blue-400 tw-border-2 tw-border-blue-400 tw-rounded-lg tw-flex tw-justify-center tw-my-2 ">
                    Total: {{ totalLeads }} <icon icon="material-symbols:leaderboard" class="tw-text-xl tw-ml-1 tw-text-blue-400" />
                </div>   
         </div>
        </div>
            <div class="tw-shadow-lg tw-p-4  tw-flex-wrap tw-bg-[#ffffff] tw-rounded-xl">
            <h1 class="tw-text-lg tw-font-semibold tw-mb-2 ">Cost Per Lead: </h1>
            <div class="tw-flex-wrap">
                <div class="tw-flex tw-flex-wrap">
                    <div class="tw-w-1/2">       
                        <p class="tw-text-white tw-mr-2 tw-bg-blue-800 tw-text-center tw-text-lg tw-rounded-lg tw-p-2">Facebook: {{ globalFacebookCostPerLead }}</p>
                    </div>
                    <div class="tw-w-1/2">       
                        <p class="tw-text-white tw-bg-[#f60457] tw-text-center tw-text-lg tw-rounded-lg tw-p-2">Tiktok: {{ globalTiktokCostPerLead }}</p>
                    </div>
                </div >
                <div class="tw-text-xl tw-items-center tw-font-semibold tw-text-purple-500 tw-border-2 tw-border-purple-500 tw-rounded-lg tw-flex tw-justify-center tw-my-2 ">
                    Average: {{ averageCostPerLead }} <icon icon="hugeicons:chart-average" class="tw-text-xl tw-ml-1 tw-text-purple-500" />
                </div>   
         </div>
        </div>
    </div>
    <div v-else class=" tw-h-[100px] tw-my-auto tw-flex tw-items-center tw-justify-center">
        <Loading/>
    </div>
</template>

<script setup>
import { ref, watch, defineProps,computed } from 'vue';
// import { currency } from '@/config/config';
import Dashboard from '@/api/Dashboard';
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      dateRange: {
        startDate: null,
        endDate: null,
      },
      selectedMarketerId: null,
      selectedSeries: null,
    }),
  },
});
const data = ref({});
const loading = ref(false);
const getData = async (date_avant = null, date_apres = null, marketer_id = null, product_id = null) => {
//   const cacheKey = `CardsStats-${date_avant}-${date_apres}-${marketer_id}-${product_id}`;

  loading.value = true;
  await Dashboard.stats(date_avant, date_apres, marketer_id, product_id)
    .then(res => {
      if (res.data.code === 'SUCCESS') {
        data.value = res.data.data;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(
  () => props.filters,
  (newFilters) => {
    const { dateRange, filter } = newFilters || {};
    const { startDate, endDate } = dateRange || {};
    const { selectedMarketerId, selectedSeries } = filter || {};
    getData(startDate, endDate, selectedMarketerId, selectedSeries);
  },
  { immediate: true } // Add this line
);
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