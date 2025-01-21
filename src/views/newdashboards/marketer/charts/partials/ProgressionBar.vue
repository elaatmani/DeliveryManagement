<template>
  <div class="tw-bg-orange-400 tw-text-white tw-p-4 tw-rounded-lg tw-w-full tw-h-full tw-shadow-lg">
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-4xl tw-font-extrabold tw-tracking-tight">
        {{ percentage }}<span class="tw-text-2xl">%</span>
      </div>
      <div class="tw-text-sm tw-bg-white tw-text-orange-600 tw-py-1 tw-px-3 tw-rounded-full tw-shadow-md">
        Progress for {{ currentMonth }}
      </div>
    </div>
      <div class="tw-mt-8 tw-bg-white tw-h-2 tw-rounded-full tw-overflow-hidden">
          <div class="tw-bg-orange-600 tw-h-full tw-rounded-full" :style="{width: `${percentage}%`}"></div>
      </div>
  </div>
</template>

<script>
import Analytics from '@/api/Analytics'

export default {
  data() {
      return {
          percentage: 0,
          currentMonth: new Date().toLocaleString('en-US', { month: 'long' }),

      }
  },
  async created() {
      const response = await Analytics.goalprogressionmarketer()
      if (response.data.code === 'SUCCESS') {
          const leadsPerMonth = response.data.data.leads_per_month
          if (leadsPerMonth.length > 0) {
              const leads = leadsPerMonth[0].leads
              const goal = leadsPerMonth[0].goal
              this.percentage = (leads / goal) * 100
          }
      }
  },
}
</script>
