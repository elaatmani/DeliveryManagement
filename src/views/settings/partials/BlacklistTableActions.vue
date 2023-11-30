<template>
    <div class="tw-px-4">
        <div class="tw-flex tw-items-center tw-justify-end tw-gap-2">

                <!-- <button class="tw-bg-whites tw-shadow-sm tw-px-2 tw-py-1 tw-w-[30px] tw-h-[30px] tw-border tw-border-solid tw-border-orange-500/20 hover:tw-bg-orange-600 tw-bg-orange-500 hover:tw-border-orange-500/70 tw-duration-300 tw-text-white tw-rounded-md tw-flex tw-items-center tw-justify-center">
                    <v-icon size="x-small" >mdi-pencil-outline</v-icon>
                </button> -->
                
                <BlacklistTableActionsDelete :item="props.item" />
        </div>
    </div>
</template>
<script setup>
import BlacklistTableActionsDelete from './BlacklistTableActionsDelete'
import { defineProps } from 'vue';

const props = defineProps(['item']);
</script>