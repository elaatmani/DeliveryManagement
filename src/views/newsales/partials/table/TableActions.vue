<template>
  <div class="tw-h-full">
    <div class="tw-flex tw-items-center tw-gap-2">
    <a target="_blank" :href="'https://api.whatsapp.com/send?phone=' + item.phone.replace('+', '').replace('-', '').replace(' ', '')" class="tw-bg-whites tw-shadow-sm tw-px-2 tw-py-1 tw-w-[30px] tw-h-[30px] tw-border tw-border-solid tw-border-green-500/20 hover:tw-bg-green-500/10 hover:tw-border-green-500/70 tw-duration-300 tw-text-green-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-whatsapp</v-icon>
    </a>
    <button @click="update = true" class="tw-bg-whites tw-shadow-sm tw-px-2 tw-py-1 tw-w-[30px] tw-h-[30px] tw-border tw-border-solid tw-border-orange-500/20 hover:tw-bg-orange-500/10 hover:tw-border-orange-500/70 tw-duration-300 tw-text-orange-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-pencil-outline</v-icon>
    </button>
    <button @click="history = true" class="tw-bg-whites tw-shadow-sm tw-px-2 tw-py-1 tw-w-[30px] tw-h-[30px] tw-border tw-border-solid tw-border-purple-500/20 hover:tw-bg-purple-500/10 hover:tw-border-purple-500/70 tw-duration-300 tw-text-purple-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-sort-clock-descending</v-icon>
    </button>
    </div>

    <div v-if="update">
        <UpdatePopup @update="newItem => $emit('update', newItem)" v-model:visible="update" :item="item" />
    </div>

    <div v-if="history">
        <HistoryPopup v-model:visible="history" :item="item"  />
    </div>

  </div>
</template>

<script>
import UpdatePopup from '@/views/newsales/partials/components/UpdatePopup'
import HistoryPopup from '@/views/newsales/partials/components/HistoryPopup'

export default {
    components: { UpdatePopup, HistoryPopup },

    props: {
        item: {
            required: true
        }
    },

    data() {
        return {
        update: false,
        history: false,
        isLoading: false,

        }
    },

    methods: {
        handle() {
        }
    }
}
</script>

<style>

</style>