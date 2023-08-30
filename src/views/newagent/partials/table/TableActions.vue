<template>
  <div class="tw-h-full">
    <div class="tw-flex tw-items-center tw-gap-2">
    <a target="_blank" :href="'https://api.whatsapp.com/send?phone=' + item.phone.replace('+', '').replace('-', '').replace(' ', '')" class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-green-500/20 hover:tw-bg-green-500/10 hover:tw-border-green-500/70 tw-duration-300 tw-text-green-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-whatsapp</v-icon>
    </a>
    <button @click="popup = true" class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-orange-500/20 hover:tw-bg-orange-500/10 hover:tw-border-orange-500/70 tw-duration-300 tw-text-orange-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-pencil-outline</v-icon>
    </button>
    </div>

    <div v-if="popup">
        <UpdatePopup @update="newItem => $emit('update', newItem)" v-model:visible="popup" :item="item" />
    </div>

  </div>
</template>

<script>
import UpdatePopup from '@/views/newagent/partials/components/UpdatePopup'

export default {
    components: { UpdatePopup },

    props: {
        item: {
            required: true
        }
    },

    data() {
        return {
        popup: false,
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