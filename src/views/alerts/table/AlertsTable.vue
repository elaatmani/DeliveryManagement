<template>
    <div>
        <div class="tw-overflow-x-auto">
            <div class="tw-inline-block tw-min-w-full tw-align-middle">
                <div class="tw-border tw-overflow-auto tw-border-gray-200 darkx:tw-border-gray-700 md:tw-rounded-lg">
                    <table class="tw-min-w-full tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700">
                        <thead class="tw-bg-gray-50 darkx:tw-bg-gray-800">
                            <tr>
                                <th v-for="col in cols" :key="col.field"
                                :class="col.class"
                                    class="tw-py-3.5 tw-whitespace-nowrap tw-px-4 tw-text-sm tw-font-normal tw-text-left rtl:tw-text-right tw-text-gray-500 darkx:tw-text-gray-400">
                                    <span>{{ col.name }}</span>
                                </th>
                            </tr>
                        </thead>

                        <template v-if="!loading">
                            <tbody
                                v-if="rows.length"
                                class="tw-bg-white tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700 darkx:tw-bg-gray-900">
                                <table-row v-for="row in rows" :key="row.id" :item="row" />
                            </tbody>

                            <tbody v-if="!rows.length"
                                class="tw-bg-white tw-divide-y tw-divide-gray-200 darkx:tw-divide-gray-700 darkx:tw-bg-gray-900">
                                <tr>
                                    <td :colspan="cols.length">
                                        <div class="tw-p-5 tw-text-center tw-text-gray-600 tw-font-medium">
                                            No alert was found !
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </template>

                        <table-loading v-else :columns="cols.length" :rows="10" />

                    </table>
            </div>
        </div>
    </div>
</div></template>

<script setup>
import { defineProps, toRef } from 'vue';
import TableLoading from '@/components/TableLoading';
import TableRow from './TableRow';

const props = defineProps(['loading', 'data'])
const loading = toRef(props, 'loading');

const cols = [
    { field: 'id', name: 'ID', class: 'tw-w-[60px]' },
    { field: 'created', name: 'Added at', class: 'tw-w-[100px]' },
    { field: 'type', name: 'Type', class: 'tw-w-[70px] tw-truncate' },
    { field: 'to', name: 'To', class: 'tw-w-[70px] tw-truncate' },
    { field: 'content', name: 'Content', class: 'tw-max-w-[150px] tw-truncate' },
    { field: 'actions', name: 'Actions', class: 'tw-w-[100px]' }
];



const rows = toRef(props, 'data');
</script>

<style></style>