<template>
  <div class="tw-mb-4">
    <div class="tw-grid tw-grid-cols-12 tw-gap-4">
      <div v-for="(s, i) in visible" :key="i" class="md:tw-col-span-3 tw-col-span-12">
        <div 
        class="tw-h-full tw-w-full tw-p-3 tw-rounded tw-space-y-2 tw-border tw-border-solid">
          <p class="tw-text-sm tw-font-bold tw-w-fit tw-h-fit tw-px-2 tw-rounded" :class="[getConfirmation(s.confirmation).textLight, getConfirmation(s.confirmation).bgLight]">{{ s.name }}</p>
          <div class="tw-flex tw-items-center tw-justify-between">
            <span class="tw-text-xl tw-font-bold tw-text-gray-900">{{ s.total }}</span>
            <span class="tw-px-2 tw-py-1 tw-font-medium tw-text-sm tw-rounded tw-bg-white tw-text-gray-900">{{ s.percent }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { confirmationsFollowup } from '@/config/orders'
export default {
  props: {
    statistics: {
      required: true
    }
  },

  computed: {
    visible() {
      if(this.statistics.show.includes('*')) return this.statistics.data;
      return this.statistics.data.filter(s => this.statistics.show.includes(s.followup_confirmation))
    }
  },

  methods: {
    getConfirmation(value) {
      return confirmationsFollowup.find(c => c.value == value)
    }
  }
}
</script>

<style>

</style>