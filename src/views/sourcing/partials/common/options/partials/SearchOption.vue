<template>
    <div class="tw-relative tw-h-[40px] tw-flex tw-items-center tw-mt-4 md:tw-mt-0">
        <select @change="handleFieldChange" :value="field"
            class="tw-block tw-h-[40px] !tw-w-fit tw-py-1.5  tw-pl-5 tw-text-gray-700 tw-bg-white tw-border tw-border-solid tw-border-gray-200 tw-rounded-r-none tw-rounded-lg md:tw-w-80 placeholder-gray-400/70 tw-pr-11 rtl:tw-pr-11 rtl:tw-pl-5 darkx:tw-bg-gray-900 darkx:tw-text-gray-300 darkx:tw-border-gray-600 focus:tw-border-orange-400 darkx:focus:tw-border-orange-300 focus:tw-ring-orange-300 focus:tw-outline-none focus:tw-ring focus:tw-ring-opacity-40">
            <option :value="f.field" v-for="f in fields" :key="f.field">{{ f.name }}</option>
        </select>
        <input type="text" placeholder="Search" :value="search" @input="handleSerchChange"
            @keyup.enter="handleFilter"
            class="tw-block tw-h-[40px] tw-w-full tw-py-1.5  tw-pl-5 tw-text-gray-700 tw-bg-white tw-border tw-border-solid tw-border-gray-200 tw-border-l-0 tw-rounded-r-lg md:tw-w-80 placeholder-gray-400/70 tw-pr-11 rtl:tw-pr-11 rtl:tw-pl-5 darkx:tw-bg-gray-900 darkx:tw-text-gray-300 darkx:tw-border-gray-600 focus:tw-border-orange-400 darkx:focus:tw-border-orange-300 focus:tw-ring-orange-300 focus:tw-outline-none focus:tw-ring focus:tw-ring-opacity-40" />

        <button @click="handleFilter"
            class="tw-absolute tw-h-[40px] tw-right-0 tw-px-2 tw-py-1 tw-w-[38px] tw-border-solid tw-rounded-r-lg  tw-border-l tw-text-orange-500/80  tw-border-orange-500/20 hover:tw-bg-orange-500/10 hover:tw-border-orange-500/70 tw-duration-300 tw-flex tw-items-center tw-justify-center">
            <v-icon size="small">mdi-magnify</v-icon>
        </button>
    </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';
const emit = defineEmits(['update:search-by-field', 'update:search', 'filter']);

const fields = ref([
    { field: 'all', name: 'All' },
    { field: 'id', name: 'ID' }
])
const field = ref('all');
const search = ref('');


const handleFieldChange = ($e) => {
    emit('update:search-by-field', $e.target.value)
}

const handleSerchChange = ($e) => {
    emit('update:search', $e.target.value);
}

const handleFilter = () => {
    emit('filter');
}

</script>

<style></style>