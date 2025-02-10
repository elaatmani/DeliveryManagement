<template>
  <div v-if="!loading" class="tw-bg-gray-900 tw-text-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-w-full tw-h-full">
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-lg tw-font-bold">YOU ARE HERE !</div>
      <div class="tw-text-sm tw-bg-gray-700 tw-text-white tw-py-1 tw-px-3 tw-rounded-full tw-shadow-md">
        Progress for {{ currentMonth }}
      </div>
    </div>

    <div class="tw-mt-6 tw-relative tw-h-6 tw-rounded-full tw-overflow-hidden tw-bg-gray-700">
  
  <div 
    class="tw-h-full tw-rounded-full tw-relative tw-bg-blue-500 tw-transition-all tw-duration-500"
    :style="{ width: percentage + '%' }">
  </div>
  
  <div 
    class="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-justify-center tw-text-sm tw-text-white tw-transition-all tw-duration-500"
    :style="{ width: percentage + '%' }">
    {{ currentLeads }}
  </div>

  <div 
    class="tw-absolute tw-inset-y-0 tw-flex tw-items-center  tw-justify-center tw-text-lg tw-transition-all tw-duration-500"
    :style="{ left: `calc(${percentage}% - 10px)` }">
    <span class="tw-bg-gray-800 tw-px-2 tw-py-1 tw-rounded-full">🔥</span>
  </div>
  
</div>

    
    <div class="tw-flex tw-justify-between tw-mt-4">
      <div v-for="(milestone, index) in milestones" :key="index" class="tw-flex tw-flex-col tw-items-center">
        <div class="tw-text-sm tw-font-bold" :class="milestone.color">
          {{ milestone.label }}
        </div>
        <div class="tw-text-xs tw-text-gray-400">{{ milestone.value }}</div>
        <div class="tw-flex">
          <div v-for="star in index + 1" :key="star" class="tw-text-yellow-400">
                ⭐
            </div>
        </div>


      </div>
    </div>
  </div>

  <div v-if="loading" class="tw-bg-gray-900 tw-h-full tw-text-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-flex tw-items-center tw-justify-center">
    <p class="tw-bg-gray-700 tw-text-white tw-text-sm tw-px-3 tw-py-1 tw-rounded">
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
      milestones: []
    }
  },
  async created() {
    this.loading = true
    const response = await Analytics.goalprogressionmarketer()
    
    if (response.data.code === 'SUCCESS') {
      const leadsPerMonth = response.data.data.leads_per_month
      
      if (leadsPerMonth.length > 0) {
        const leads = leadsPerMonth[0].leads
        const goal = leadsPerMonth[0].goal

        this.percentage = (leads / goal) * 100
        this.currentLeads = leads
        this.goal = goal 
        
        this.calculateMilestones(goal)
      }
    }
    
    this.loading = false
  },
  methods: {
    calculateMilestones(goal) {
      this.milestones = [
        { label: "Beginner", value: "0 Lead", color: "tw-text-gray-400" },
        { label: "Rookie", value: `${Math.round(goal * 0.2)} Lead`, color: "tw-text-blue-400" },
        { label: "Elite", value: `${Math.round(goal * 0.6)} Lead`, color: "tw-text-orange-400" },
        { label: "Champion", value: `${goal} Lead`, color: "tw-text-yellow-400" }
      ]
    }
  }
}
</script>
