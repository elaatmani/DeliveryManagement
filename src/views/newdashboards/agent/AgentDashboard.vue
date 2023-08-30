<template>
    <div>
      <div class="tw-w-full tw-grid tw-gap-2 lg:tw-grid-cols-4 sm:tw-grid-cols-2 tw-grid-cols-1">
        <template v-if="!fetching">
          <DashCard v-for="item in dashes" :key="item.id" :color="item.color" :icon="item.icon" :title="item.title" :symbol="item.symbol" :percentage="item.percentage" :value="item.value" />
        </template>
  
        <template v-else>
          <div v-for="item in 4" :key="item" class="tw-bg-white tw-animate-pulse tw-shadow-sm tw-rounded-lg tw-p-5 tw-h-[90px]">
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
    </div>
  </template>
  
  <script>
  import DashCard from '@/views/newdashboards/agent/partials/DashCard';
  import Agent from '@/api/Agent';
  
  export default {
    components: { DashCard },
  
    data() {
      return {
        fetching: true,
        dashes: [
          // {
          //   id: 1,
          //   title: 'Orders',
          //   value: 200,
          //   icon: 'mdi-package-variant-closed',
          //   color: '#6b7280'
          // },
          // {
          //   id: 2,
          //   title: 'New',
          //   value: 200,
          //   percentage: 100,
          //   icon: 'mdi-bell',
          //   color: '#ef4444'
          // },
          // {
          //   id: 3,
          //   title: 'Reconfirmed',
          //   value: 200,
          //   percentage: 0,
          //   icon: 'mdi-check-all',
          //   color: '#06b6d4'
          // },
          // {
          //   id: 4,
          //   title: 'Delivered',
          //   value: 0,
          //   percentage: 23.40,
          //   icon: 'mdi-truck-delivery-outline',
          //   color: '#34d399'
          // },
  
        ]
      }
    },
  
    mounted() {
      Agent.statistics()
      .then(res => {
        this.dashes = res.data.data.statistics;
        this.fetching = false
      })
      // setTimeout(() => {
      // }, 3000);
    }
  }
  </script>
  
  <style>
  
  </style>