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
                                            No request was found !
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
import { computed, ref, defineProps, toRef } from 'vue';
import { useStore } from 'vuex'
import TableLoading from '@/components/TableLoading';
import TableRow from './TableRow';

const store = useStore();
const user = computed(() => store.getters['user/user']);
const props = defineProps({
    loading: {
        required: true,
        type: Boolean
    },
    sourcings: {
        required: true,
        type: Array
    }
})
const loading = toRef(props, 'loading');

const colsForAdmin = [
    { field: 'id', name: 'ID', class: 'tw-w-[60px]' },
    { field: 'created', name: 'Requested at', class: 'tw-w-[100px]' },
    { field: 'product_name', name: 'Product name', class: '' },
    { field: 'quantity', name: 'Quantity', class: 'tw-w-[100px]' },
    { field: 'country', name: 'Country', class: 'tw-w-[100px]' },
    { field: 'quotation', name: 'Quotation', class: 'tw-w-[100px]' },
    { field: 'sourcing', name: 'Sourcing', class: 'tw-w-[100px]' },
    { field: 'actions', name: 'Actions', class: 'tw-w-[100px]' }
];

const colsForSeller = [
    { field: 'id', name: 'ID', class: 'tw-w-[60px]' },
    { field: 'created', name: 'Requested at', class: 'tw-w-[100px]' },
    { field: 'product_name', name: 'Product name', class: '' },
    { field: 'quantity', name: 'Quantity', class: 'tw-w-[100px]' },
    { field: 'country', name: 'Country', class: 'tw-w-[100px]' },
    { field: 'quotation', name: 'Quotation', class: 'tw-w-[100px]' },
    { field: 'sourcing', name: 'Sourcing', class: 'tw-w-[100px]' },
    { field: 'actions', name: 'Actions', class: 'tw-w-[100px]' }
];

const cols = ref(user.value.role == 'admin' ? colsForAdmin : colsForSeller);

const rows = toRef(props, 'sourcings');
// ref([
//     {
//         id: 1,
//         created_at: '2023-09-08T17:45:06.000000Z',
//         is_new: true,
//         product_name: 'test product 1',
//         product_url: 'https://google.com',
//         estimated_quantity: 50,
//         destination_country: 'Morocco',
//         note: 'nothing important',
//         shipping_method: 'Air Freight',
//         status: 'pending',
//         cost_per_unit: '',
//         total_cost: '',
//     }
// ]);

// loading.value = true;
// setTimeout(() => {
//     loading.value = false;
// }, 3000)
</script>

<style></style>