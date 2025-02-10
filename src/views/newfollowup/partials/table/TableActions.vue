<template>
  <div class="tw-h-full">
    <div class="tw-flex tw-items-center tw-gap-2">
    <a target="_blank" :href="'https://api.whatsapp.com/send?phone=' + item.phone.replace('+', '').replace('-', '').replace(' ', '')" class="tw-bg-whites tw-shadow-sm tw-px-2 tw-py-1 tw-w-[30px] tw-h-[30px] tw-border tw-border-solid tw-border-green-500/20 hover:tw-bg-green-500/10 hover:tw-border-green-500/70 tw-duration-300 tw-text-green-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-whatsapp</v-icon>
    </a>
    <button @click="update = true" class="tw-bg-whites tw-shadow-sm tw-px-2 tw-py-1 tw-w-[30px] tw-h-[30px] tw-border tw-border-solid tw-border-orange-500/20 hover:tw-bg-orange-500/10 hover:tw-border-orange-500/70 tw-duration-300 tw-text-orange-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-pencil-outline</v-icon>
    </button>
    <button @click="add = true" class="tw-bg-whites tw-shadow-sm tw-px-2 tw-py-1 tw-w-[30px] tw-h-[30px] tw-border tw-border-solid tw-border-blue-500/20 hover:tw-bg-blue-500/10 hover:tw-border-blue-500/70 tw-duration-300 tw-text-blue-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-plus</v-icon>
    </button>
    </div>

    <div v-if="update">
        <UpdatePopup @update="newItem => $emit('update', newItem)" v-model:visible="update" :item="item" />
    </div>
    <div v-if="add">
        <FollowUpPopUp @update="newItem => $emit('update', newItem)" v-model:visible="add" :item="item" />
    </div>  

  </div>
</template>

<script>
import FollowUpPopUp from '@/views/newsales/partials/components/FollowUpPopUp'
import UpdatePopup from '@/views/newfollowup/partials/components/UpdatePopup'

export default {
    components: {FollowUpPopUp, UpdatePopup },

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
        add: false
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