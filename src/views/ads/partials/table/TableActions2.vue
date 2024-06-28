<template>
    <div class="tw-h-full">
        <div class="tw-flex tw-items-center tw-gap-2 tw-justify-end tw-w-full">
            <button @click="popup = true" class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-orange-500/20 hover:tw-bg-orange-500/10 hover:tw-border-orange-500/70 tw-duration-300 tw-text-orange-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
                <v-icon size="x-small" >mdi-pencil-outline</v-icon>
            </button>
            <button @click="UpdateApprouval" class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-green-500/20 hover:tw-bg-green-500/10 hover:tw-border-green-500/70 tw-duration-300 tw-text-green-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
                <v-icon size="x-small" >mdi-check</v-icon>
            </button>
        </div>
        <div v-if="popup">
            <UpdatePopup @update="newItem => $emit('update', newItem)" v-model:visible="popup" :item="item" />
        </div>
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
