<template>
  <div v-if="!loading" class="tw-bg-orange-400 tw-text-white tw-p-4 tw-rounded-lg tw-w-full tw-h-full tw-shadow-lg">
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-4xl tw-font-extrabold tw-tracking-tight">
        {{ percentage.toFixed(2) }}<span class="tw-text-2xl"> %</span>
      </div>
      <div class="tw-text-sm tw-bg-white tw-text-orange-600 tw-py-1 tw-px-3 tw-rounded-full tw-shadow-md">
        Progress for {{ currentMonth }}
      </div>
    </div>
    <div class="tw-mt-8 tw-relative tw-h-6 tw-rounded-full tw-overflow-hiddenx">
            <div class="tw-bg-white tw-h-full tw-rounded-full tw-relative">
                <div class="tw-bg-orange-600 tw-h-full tw-rounded-full" :style="{width: `${percentage}%`}"></div>
                <div class="tw-whitespace-nowrap tw-font-semibold tw-translate-x-1/2 tw-absolute tw-inset-y-0 tw-left-0 -tw-translate-y-[25px] tw-text-xs tw-flex tw-items-center tw-justify-center" :style="{width: `${percentage}%`}">
                    {{ currentLeads }} Lead
                </div>
            </div>
            <div class="tw-absolute tw-inset-y-0 tw-left-1 tw-flex tw-items-center tw-justify-center tw-text-sm">
                0
            </div>
            <div class="tw-absolute tw-inset-y-0 tw-right-1 tw-flex tw-items-center tw-text-orange-600 tw-justify-center tw-text-sm">
                {{ goal }}
            </div>
        </div>
  </div>
  <div v-if="loading" class="tw-bg-orange-400 tw-text-white tw-p-4 tw-rounded-lg tw-w-full tw-h-full tw-shadow-lg tw-flex tw-items-center tw-justify-center">
    <p class="tw-px-1 tw-bg-orange-600 tw-text-white tw-text-sm tw-rounded">
        <icon icon="eos-icons:three-dots-loading" class="tw-text-xl" />
    </p>
    </div>
</template>

<script>
import Analytics from '@/api/Analytics'

export default {
  data() {
      return {
          percentage: 0,
          currentLeads: 0,
          goal: 0,
          loading: true,
          currentMonth: new Date().toLocaleString('en-US', { month: 'long' }),

      }
  },
  async created() {
      this.loading = true;
      const response = await Analytics.goalprogressionmarketer()
      if (response.data.code === 'SUCCESS') {
          const leadsPerMonth = response.data.data.leads_per_month
          if (leadsPerMonth.length > 0) {
              const leads = leadsPerMonth[0].leads
              const goal = leadsPerMonth[0].goal
              this.percentage = (leads / goal) * 100
              this.currentLeads = leads
              this.goal = goal 
          }
          this.loading = false;

      }
  },
}
</script>
