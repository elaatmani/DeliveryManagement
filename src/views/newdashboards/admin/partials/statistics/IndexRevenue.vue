<template>
  <div v-if="!fetching && statistics.revenue?.length > 0">
    <div class="tw-bg-white tw-p-5 tw-grid tw-grid-cols-4 tw-gap-5">
        <RevenueCard v-for="r in statistics.revenue" :key="r.id" :icon="r.icon" :title="r.title" :value="r.value"  :color="r.color" />
    </div>
  </div>
</template>

<script>
import RevenueCard from '@/views/newdashboards/admin/partials/statistics/components/RevenueCard'

export default {
    components: { RevenueCard },

    props: {
        statistics: {
            required: true,
        },
        fetching: {
            required: true,
        }
    },
}
</script>

<style>

</style>