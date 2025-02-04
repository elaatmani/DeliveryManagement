<template>
    <div class="x">

        <div class="tw-roundedx tw-border tw-border-solid tw-border-gray-100 tw-overflow-auto tw-rounded">
            <table class="tw-min-w-full tw-leading-normal tw-w-full">
                <thead class="">
                    <tr>
                        <th v-for="c in columns" :key="c.name" :class="c.classes"
                            class="tw-px-5 tw-text-[10px] last:tw-border-e-0 tw-whitespace-nowrap tw-border-e tw-py-3 tw-border-b tw-borderx tw-border-gray-100 tw-bg-gray-50 tw-text-start tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider">
                            <div role="button" @click="loading ? null : onSortClick(c)" v-if="c.sortable"
                                class="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-cursor-pointer">
                                <p>{{ c.label }}</p>
                                <icon
                                    :class="[c.name in sorting && (sorting[c.name] == 'desc' ? '!tw-text-gray-800' : '!tw-text-gray-800 !tw-rotate-180')]"
                                    icon="ic:round-sort" class="tw-text-lg tw-text-gray-200" />
                            </div>
                            <p v-else>{{ c.label }}</p>
                        </th>
                    </tr>
                </thead>

                <tbody v-if="loading">
                    <tr class="tw-border-b tw-border-solid tw-border-gray-100 last:tw-border-b-0 tw-group even:tw-bg-gray-50/50"
                        v-for="i in 10" :key="i">
                        <td v-for="c in columns" :key="c.name" class="tw-px-2 tw-py-3">
                            <div
                                class="tw-w-full tw-py-3 tw-bg-gray-50 group-even:tw-bg-white  tw-rounded tw-min-w-[30px] tw-animate-pulse">

                            </div>
                        </td>
                    </tr>
                </tbody>

                <tbody v-if="!loading && data.length">
                    <TableRow v-for="(item, index) in data" :page="options.current_page"
                        :key="item" :item="item" :index="index" />
                </tbody>

                <tbody v-if="!loading && !data.length">
                    <tr
                        class="tw-border-b tw-border-solid tw-border-gray-100 last:tw-border-b-0 tw-group even:tw-bg-gray-50/50">
                        <td :colspan="columns.length">
                            <p class="tw-p-2 tw-py-5 tw-text-center">
                                No data found
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-mt-4">

                <div class="tw-flex tw-items-center tw-gap-2">
                    <select v-model.number="options.per_page" @change="() => getData()"
                        class="tw-w-[100px] tw-outline-none tw-bg-white tw-text-black tw-border tw-border-solid tw-border-gray-200 tw-rounded tw-px-2 tw-py-1">
                        <option :value="5">5</option>
                        <option :value="10">10</option>
                        <option :value="20">20</option>
                        <option :value="50">50</option>
                        <option :value="100">100</option>
                        <option :value="250">250</option>
                        <option :value="500">500</option>
                    </select>
                </div>


                <div class="tw-flex tw-items-center tw-gap-2 tw-justify-end">
                    <button @click="onPrev" :disabled="!options.prev_page_url"
                        :class="[!options.prev_page_url && 'tw-bg-gray-50 tw-cursor-not-allowed tw-text-gray-300 tw-border-gray-100 hover:!tw-bg-gray-50']"
                        class="tw-w-[120px] tw-py-2 tw-border tw-border-solid tw-border-gray-200 hover:tw-bg-gray-100 tw-duration-200">Previous</button>
        
                    <button @click="onNext" :disabled="!options.next_page_url"
                        :class="[!options.next_page_url && 'tw-bg-gray-50 tw-cursor-not-allowed tw-text-gray-300 tw-border-gray-100 hover:!tw-bg-gray-50']"
                        class="tw-w-[120px] tw-py-2 tw-border tw-border-solid tw-border-gray-200 hover:tw-bg-gray-100 tw-duration-200">Next</button>
                </div>
            </div>

    </div>

</template>


<script setup>
import CashFlow from '@/api/CashFlow';
import { ref, defineEmits, defineProps, computed } from 'vue';
import TableRow from './TableRow.vue';
import { toRef, watch } from 'vue';

const emit = defineEmits(['register'])
const props = defineProps(['filters', 'all'])
const filters = computed(() => props.filters)
const sorting = ref({
    id: 'desc'
});

const showAll = toRef(props, 'all');
const order_by = ref('high');
const options = ref({ per_page: 10 });
const loading = ref(true);
const total = ref(0);
const data = ref([]);

watch([showAll], () => {
    getData(filters.value, options.value.per_page, 1);
})


let columns = [
    { name: 'id', label: 'ID', sortable: true, classes: ['tw-w-[50px]'] },
    { name: 'spent_at', label: 'Date', sortable: true, classes: ['tw-w-[60px]'] },
    { name: 'user_id', label: 'By', sortable: false, classes: ['tw-w-[150px] !tw-text-center'] },
    { name: 'type', label: 'Type', sortable: true, classes: ['tw-w-[150px] !tw-text-center'] },
    { name: 'amount', label: 'Amount', sortable: true, classes: ['tw-w-[100px] !tw-text-center'] },
    { name: 'category', label: 'Category', sortable: false, classes: ['tw-w-[150px] !tw-text-center'] },
    { name: 'description', label: 'Description', sortable: false, classes: ['!tw-text-center'] },
    { name: 'actions', label: '', sortable: false, classes: ['tw-w-[100px] !tw-text-center'] },

]

const getData = async (filters, per_page = options.value.per_page, page = 1) => {
    loading.value = true;

    await CashFlow.all({ filters: filters, sort: sorting.value, per_page, page, order_by: order_by.value, all: showAll.value })
        .then((res) => {
            data.value = res.data.data;
            total.value = res.data.total;
            options.value = { ...options.value, ...res.data.meta };
        })
        .catch((err) => {
            console.log(err);
        });
    loading.value = false;
};

const onSortClick = (column) => {
    if (column.sortable) {

        const field = sorting.value[column.name];
        if (field == undefined) {
            sorting.value[column.name] = 'desc'
        } else if (field == 'desc') {
            sorting.value[column.name] = 'asc'
        } else {
            delete sorting.value[column.name]
        }

        getData(filters.value, options.value.per_page, 1);
    }

}


const onNext = () => {
    getData(filters.value, options.value.per_page, options.value.current_page + 1);
}

const onPrev = () => {
    getData(filters.value, options.value.per_page, options.value.current_page - 1);
}

getData();
emit('register', (f) => {
    getData(f, options.value.per_page, 1);
})


</script>

<style></style>