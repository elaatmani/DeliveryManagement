<template>
    <div class="tw-h-full">
        <div class="tw-flex tw-items-center tw-gap-2 tw-justify-end tw-w-full">
            <button @click="popup = true" class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-orange-500/20 hover:tw-bg-orange-500/10 hover:tw-border-orange-500/70 tw-duration-300 tw-text-orange-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
                <v-icon size="x-small" >mdi-pencil-outline</v-icon>
            </button>
            <button @click="visible = true" class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-green-500/20 hover:tw-bg-green-500/10 hover:tw-border-green-500/70 tw-duration-300 tw-text-green-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
                <v-icon size="x-small" >mdi-check</v-icon>
            </button>
        </div>
        <div v-if="popup">
            <UpdatePopup @update="newItem => $emit('update', newItem)" v-model:visible="popup" :item="item" />
        </div>
        <popup-new :visible="visible" @cancel="visible = false" :closeable="!isLoading">
            <div class="tw-relative tw-max-w-[450px] tw-w-full tw-bg-white tw-overflow-hidden tw-rounded-md tw-mx-auto tw-border tw-border-solid tw-border-gray-400">
                <h1 class="tw-text-lg tw-font-semibold tw-p-5 tw-bg-gray-100">Are you sure you want to confirm it ?</h1>

                <div class="tw-flex tw-justify-end tw-items-center tw-col-span-12 tw-gap-2 tw-p-5 ">
                    <button
                    @click="visible = false"
                    :disabled="isLoading"
                    type="button"
                    class="tw-border-solid tw-duration-200 tw-text-gray-900 tw-bg-white tw-border tw-border-gray-300 focus:tw-outline-none hover:tw-bg-gray-100 focus:tw-ring-4 focus:tw-ring-gray-200 tw-font-medium tw-rounded-lg tw-text-sm tw-px-8 w-fit h-fit tw-py-2.5 dark:tw-bg-gray-800 dark:tw-text-white dark:tw-border-gray-600 dark:hover:tw-bg-gray-700 dark:hover:tw-border-gray-600 dark:focus:tw-ring-gray-700"
                    >
                    Annuler
                    </button>
                    <button
                    @click="UpdateApprouval"
                    :disabled="isLoading"
                    type="button"
                    :class="[isLoading && '!bg-green-400 tw-cursor-not-allowed']"
                    class="tw-relative tw-flex tw-gap-2 tw-items-center tw-justify-center dura tw-text-white tw-bg-green-500 hover:tw-bg-green-600 tw-shadow-md hover:tw-shadow-lg tw-duration-200 focus:tw-ring-4 focus:tw-ring-green-300 tw-font-medium tw-rounded-md tw-text-sm tw-px-8 w-fit tw-py-2.5 dark:tw-bg-green-600 dark:hover:tw-bg-green-700 focus:tw-outline-none dark:focus:tw-ring-green-800"
                    >

                    <v-icon v-if="isLoading" class="tw-absolute tw-animate-spin " name="loading" >mdi-loading</v-icon>
                    <span :class="[isLoading && '!tw-invisible']">Confirmer</span>
                    </button>
                </div>
            </div>
        </popup-new>
    </div>
</template>

<script>
import UpdatePopup from '@/views/ads/partials/components/UpdatePopup'
import Ads from '@/api/Ads';
import { useAlert } from "@/composables/useAlert";

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
            visible:false
        }
    },
    methods: {
        async UpdateApprouval() {
            const adId = this.item.id;
            this.isLoading = true;
            await Ads.updateApprouval(adId)
                .then(
                    res => {
                        if(res.data.code == 'SUCCESS') {
                            useAlert('Ad has been confirmed');
                            this.$emit('adApproved', adId);
                        }
                    },
                    err => {
                        if (err.response.status == 422) {
                            for (let e in err.response.data.errors) {
                                this.errors[e] = err.response.data.errors[e][0]
                            }
                        }
                    }
                )
            this.isLoading = false;
        }
    }
}
</script>
