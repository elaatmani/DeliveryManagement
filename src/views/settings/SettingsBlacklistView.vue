<template>
    <div class="tw-bg-white tw-p-5 tw-border tw-border-solid tw-rounded-md">
        <div class="mb-5 tw-flex tw-w-full tw-justify-between">
            <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">
                Blacklist
            </h1>
            <BlacklistAdd />
        </div>

        <div class="tw-mt-5"></div>

        <BlacklistTable @page-change="handlePageChange" :data="data" :loading="loading" :options="options" />

    </div>
</template>
<script setup>
import { reactive, ref, provide } from 'vue';
import Blacklist from '@/api/Blacklist';
import BlacklistAdd from './partials/BlacklistAdd';
import BlacklistTable from './partials/BlacklistTable';

const options = reactive({});
const data = ref([]);
const loading = ref(false);

const getData = async () => {
    loading.value = true;
    await Blacklist.all(options)
    .then(
        res => {
            data.value = res.data.data;
            delete res.data.data;
            Object.assign(options, res.data);
        }
    )
    loading.value = false;
}

const deleteItem = (id) => {
    data.value = data.value.filter(i =>i.id != id);
}

const handlePageChange = n => {
    options.page = n;
    getData();
}

const addItem = (item) => {
    data.value.unshift(item)
}

provide('blacklist', {
    getData,
    deleteItem,
    addItem
})
getData();
</script>