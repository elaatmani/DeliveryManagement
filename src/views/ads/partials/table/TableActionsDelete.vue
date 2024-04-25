<template>
    <div>
        <button @click="visible = true" class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-rose-500/20 hover:tw-bg-rose-500/10 hover:tw-border-rose-500/70 tw-duration-300 tw-text-rose-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
            <v-icon size="x-small" >mdi-trash-can</v-icon>
        </button>

        <popup-new :visible="visible" @cancel="visible = false" :closeable="!loading">
            <div class="tw-relative tw-max-w-[450px] tw-w-full tw-bg-white tw-overflow-hidden tw-rounded-md tw-mx-auto tw-border tw-border-solid tw-border-gray-400">
                <h1 class="tw-text-lg tw-font-semibold tw-p-5 tw-bg-gray-100">Are you sure you want to delete this ?</h1>

                <div class="tw-flex tw-justify-end tw-items-center tw-col-span-12 tw-gap-2 tw-p-5 ">
                    <button
                    @click="visible = false"
                    :disabled="loading"
                    type="button"
                    class="tw-border-solid tw-duration-200 tw-text-gray-900 tw-bg-white tw-border tw-border-gray-300 focus:tw-outline-none hover:tw-bg-gray-100 focus:tw-ring-4 focus:tw-ring-gray-200 tw-font-medium tw-rounded-lg tw-text-sm tw-px-8 w-fit h-fit tw-py-2.5 dark:tw-bg-gray-800 dark:tw-text-white dark:tw-border-gray-600 dark:hover:tw-bg-gray-700 dark:hover:tw-border-gray-600 dark:focus:tw-ring-gray-700"
                    >
                    Annuler
                    </button>
                    <button
                    @click="deleteItem"
                    :disabled="loading"
                    type="button"
                    :class="[loading && '!bg-red-400 tw-cursor-not-allowed']"
                    class="tw-relative tw-flex tw-gap-2 tw-items-center tw-justify-center dura tw-text-white tw-bg-red-500 hover:tw-bg-red-600 tw-shadow-md hover:tw-shadow-lg tw-duration-200 focus:tw-ring-4 focus:tw-ring-red-300 tw-font-medium tw-rounded-md tw-text-sm tw-px-8 w-fit tw-py-2.5 dark:tw-bg-red-600 dark:hover:tw-bg-red-700 focus:tw-outline-none dark:focus:tw-ring-red-800"
                    >

                    <v-icon v-if="loading" class="tw-absolute tw-animate-spin " name="loading" >mdi-loading</v-icon>
                    <span :class="[loading && '!tw-invisible']">Supprimer</span>
                    </button>
                </div>
            </div>
        </popup-new>
    </div>
</template>
<script setup>
import Ads from '@/api/Ads';
import { useAlert } from '@/composables/useAlert';
import { ref, defineEmits, defineProps } from 'vue';

const visible = ref(false);
const loading = ref(false);
const props = defineProps(['item']);
const emit = defineEmits(['delete']);

const deleteItem = async () => {
    loading.value = true;
    await Ads.delete(props.item.id)
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                useAlert('Deleted Successfully');
                visible.value = false;
                emit('delete', props.item.id)
            }
        },
        (err) => {
            console.log(err);
            useAlert('Something went wrong', 'danger');
        }
    )
    loading.value = false;
}
deleteItem

</script>