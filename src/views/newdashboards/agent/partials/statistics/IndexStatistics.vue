<template>
    <div class="tw-w-full tw-grid tw-gap-2 lg:tw-grid-cols-4 sm:tw-grid-cols-2 tw-grid-cols-1 tw-py-2">
        <template v-if="!fetching">
          <DashCard v-for="item in statistics" :key="item.id" :color="item.color" :icon="item.icon" :title="item.title" :symbol="item.symbol" :percentage="item.percentage" :value="item.value" />
        </template>
  
        <template v-else>
          <div v-for="item in 9" :key="item" class="tw-bg-white tw-animate-pulse tw-shadow-sm tw-rounded-lg tw-p-5 tw-h-[90px]">
            <div class="tw-flex tw-justify-between tw-w-full">
                <div>
                <div class="tw-flex tw-w-full tw-items-center tw-gap-2">
                    <div class="tw-h-2.5 tw-bg-gray-200 tw-rounded-full tw-w-[50px] tw-mb-4"></div>
                </div>
                <div class="tw-flex tw-w-full tw-items-center tw-gap-2">
                    <div class="tw-h-4 tw-bg-gray-200 tw-rounded-full tw-w-[30px] tw-mb-4"></div>
                </div>
                </div>
                <div class="tw-p-2 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[50px] tw-h-[50px] tw-bg-gray-200 tw-text-white">
                    
                    <div class="tw-bg-white tw-w-[25px] tw-h-[25px] tw-rounded">
  
                    </div>
                </div>
            </div>
          </div>
        </template>
  
      </div>
</template>

<script>
import DashCard from '@/views/newdashboards/agent/partials/statistics/components/DashCard';

export default {
    components: { DashCard },

    props: {
        statistics: {
            required: true,
        },
        fetching: {
            required: true,
        }
    },

};
</script>
