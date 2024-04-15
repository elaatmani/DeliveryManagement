<template>
    <div class="md:tw-col-span-12 tw-col-span-12 tw-mb-4">
        <div class="mb-1 text-body-2 tw-text-zinc-700">Marketer</div>
        <select
            v-if="fetched"
            :value="props.userId"
            @change="e => emit('update:user-id', e.target.value)"
            class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
        >
            <option selected value="">Select</option>
            <option v-for="m in marketers" :key="m.id" :value="m.id">{{ m.firstname + ' ' + m.lastname }}</option>
            
        </select>
        <div v-if="!fetched" class="tw-py-2 tw-h-[42.5px] tw-animate-pulse tw-bg-neutral-100 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-200 focus:tw-border-orange-500">

        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import store from '@/store';

const props = defineProps(['userId']);
const emit = defineEmits(['update:user-id']);

const marketers = computed(() => store.getters['user/users'].filter(u => u.role.name == 'marketer'))
const fetched = computed(() => store.getters['user/fetched'])

</script>

<style>

</style>