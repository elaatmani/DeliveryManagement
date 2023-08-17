<template>
  <div class="tw-bg-white">
    <div class="tw-flex tw-items-center tw-gap-2 tw-bg-gray-50 tw-p-2 tw-pt-0 tw-rounded-b tw-w-fit">
        <button 
        @click="active = 1"
        :class="[active == 1 ? 'tw-bg-white tw-shadow-orange-300' : 'tw-bg-gray-100 hover:tw-bg-white']"
        class="tw-px-5 tw-py-2.5  tw-duration-300 tw-font-medium tw-shadow tw-rounded tw-text-gray-600"
        >
            Confirmations
        </button>

        <button 
        @click="active = 2"
        :class="[active == 2 ? 'tw-bg-white tw-shadow-orange-300' : 'tw-bg-gray-100 hover:tw-bg-white']"
        class="tw-px-5 tw-py-2.5 tw-duration-300 tw-font-medium  tw-shadow tw-rounded tw-text-gray-600"
        >
            Delivery
        </button>

    </div>

    <div class="tw-p-5">
        <template v-if="active == 1">
            <ConfirmationTab :statistics="statistics" :fetching="fetching" />
        </template>

        <template v-if="active == 2">
            <DeliveryTab :statistics="statistics" :fetching="fetching" />
        </template>
    </div>
  </div>
</template>

<script>
import ConfirmationTab from '@/views/newdashboards/admin/partials/statistics/components/ConfirmationTab'
import DeliveryTab from '@/views/newdashboards/admin/partials/statistics/components/DeliveryTab'

export default {
    components: { ConfirmationTab, DeliveryTab },

    props: {
        statistics: {
            required: true,
        },
        fetching: {
            required: true,
        }
    },

    data() {
        return {
            active: 1
        }
    }
};
</script>

<style>
</style>