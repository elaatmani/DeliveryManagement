<template>
    <div class="tw-bg-white tw-p-2 tw-border tw-border-solid tw-border-gray-200">
        <div class="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <div class="tw-flex tw-items-center tw-gap-2">
                <p class="tw-p-2 tw-font-bold tw-text-lg">Performance</p>
                <p v-if="loading" class="tw-px-1 tw-bg-black tw-text-white tw-text-sm tw-rounded">
                    <icon icon="eos-icons:three-dots-loading" class="tw-text-xl" />
                </p>

            </div>

            <div class="tw-flex tw-items-center tw-gap-2 tw-ml-auto">
                <div>
                    <VueDatePicker class="tw-w-[280px]" v-model="filters.dates" range :enable-time-picker="false" />
                </div>

                <div>
                    <div class="tw-relative">
                        <button @click="visible.agents = !visible.agents"
                            class="tw-px-4 tw-py-2 tw-rounded tw-flex tw-items-center tw-gap-2 tw-bg-white tw-border tw-border-solid tw-border-gray-200 hover:tw-shadow tw-duration-200">
                            <icon icon="mage:user" class="tw-text-xl tw-text-gray-700" />
                            <p class="tw-text-sm tw-font-medium tw-text-gray-800">All Agents</p>
                        </button>
                        <AgentFilter v-show="visible.agents" @close="visible.agents = false" />
                    </div>
                </div>

                <div>
                    <div class="tw-relative">
                        <button @click="visible.products = !visible.products"
                            class="tw-px-4 tw-py-2 tw-rounded tw-flex tw-items-center tw-gap-2 tw-bg-white tw-border tw-border-solid tw-border-gray-200 hover:tw-shadow tw-duration-200">
                            <icon icon="mage:user" class="tw-text-xl tw-text-gray-700" />
                            <p class="tw-text-sm tw-font-medium tw-text-gray-800">All Products</p>
                        </button>
                        <ProductFilter v-show="visible.products" @close="visible.products = false" />
                    </div>
                </div>

                <div>
                    <button @click="getData"
                            class="tw-h-[37px] tw-px-4 tw-py-0.5 tw-rounded tw-bg-orange-400 tw-text-white">Filter</button>
                </div>
            </div>



        </div>
        <div class="tw-roundedx tw-border tw-border-solid tw-border-gray-100 tw-overflow-auto">
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
                    <AgentPerformanceRow v-for="(item, index) in data" :page="options.current_page" :key="item"
                        :item="item" :index="index" />
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

        <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-flex tw-items-center tw-gap-2">

                <div v-if="false"  class="tw-flex tw-items-center tw-gap-2">
                    <p class="tw-font-semibold tw-text-gray-600 tw-uppercase tw-tracking-wider tw-text-xs">Show: </p>
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
            </div>

            <div class="tw-flex tw-items-center tw-gap-2 tw-justify-end tw-mt-4">
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
import { ref, defineEmits, provide } from 'vue';
import AgentPerformanceRow from './AgentPerformanceRow.vue';
import AgentFilter from './filters/AgentFilter.vue';
import ProductFilter from './filters/ProductFilter.vue';
import Dashboard from '@/api/Dashboard';

const emit = defineEmits(['register'])
//const props = defineProps(['filters'])
const visible = ref({ agents: false })
const filters = ref({ agents: [], dates: [], products: [] })
const sorting = ref({
    confirmation_rate: 'desc'
});
provide('filters', filters)

const options = ref({ per_page: 10 });
const loading = ref(true);
const total = ref(0);
const data = ref([
    // {
    //     "id": 11,
    //     "firstname": "Rahaf",
    //     "lastname": "Rahaf",
    //     "treated": 7845,
    //     "confirmed": 3884,
    //     "delivered": 2343,
    //     "confirmation_rate": 49.51,
    //     "delivery_rate": 60.32
    // },
    // {
    //     "id": 12,
    //     "firstname": "Aya",
    //     "lastname": "Aya",
    //     "treated": 14793,
    //     "confirmed": 8053,
    //     "delivered": 4766,
    //     "confirmation_rate": 54.44,
    //     "delivery_rate": 59.18
    // },
    // {
    //     "id": 18,
    //     "firstname": "Rania",
    //     "lastname": "Rania",
    //     "treated": 12512,
    //     "confirmed": 7452,
    //     "delivered": 3974,
    //     "confirmation_rate": 59.56,
    //     "delivery_rate": 53.33
    // },
    // {
    //     "id": 32,
    //     "firstname": "AICHA",
    //     "lastname": "AICHA",
    //     "treated": 19420,
    //     "confirmed": 11316,
    //     "delivered": 6759,
    //     "confirmation_rate": 58.27,
    //     "delivery_rate": 59.73
    // },
    // {
    //     "id": 33,
    //     "firstname": "Hana",
    //     "lastname": "hana",
    //     "treated": 23977,
    //     "confirmed": 13968,
    //     "delivered": 8466,
    //     "confirmation_rate": 58.26,
    //     "delivery_rate": 60.61
    // },
    // {
    //     "id": 76,
    //     "firstname": "amani1",
    //     "lastname": "amani1",
    //     "treated": 775,
    //     "confirmed": 296,
    //     "delivered": 151,
    //     "confirmation_rate": 38.19,
    //     "delivery_rate": 51.01
    // }
]);


let columns = [
    { name: 'name', label: 'Name', sortable: false, classes: ['tw-w-[260px]'] },
    { name: 'treated', label: 'Orders', sortable: true, classes: ['tw-w-[100px] !tw-text-center'] },
    { name: 'confirmed', label: 'Confirmed', sortable: true, classes: ['tw-w-[100px] !tw-text-center'] },
    { name: 'confirmation_rate', label: 'Confirmation Rate', sortable: true, classes: ['tw-w-[150px] !tw-text-center'] },
    { name: 'delivered', label: 'Delivered', sortable: true, classes: ['tw-w-[100px] !tw-text-center'] },
    { name: 'delivery_rate', label: 'Delivery Rate', sortable: true, classes: ['tw-w-[120px] !tw-text-center'] }
]

const getData = async () => {
    loading.value = true;

    await Dashboard.agentsPerformanceByTime({ ...filters.value })
        .then(
            res => {
                data.value = res.data.data;
                options.value = res.data;
                total.value = options.value.total;
            },
            err => {
                console.log(err);
            }
        );
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
        // Handle sorting logic
        const sortKey = column.name;
        const sortOrder = sorting.value[sortKey];
        console.log(column);

        if (sortOrder) {
            console.log('inside sorting');
            data.value = [...data.value].sort((a, b) => {
                if (a[sortKey] === null || a[sortKey] === undefined) return 1;
                if (b[sortKey] === null || b[sortKey] === undefined) return -1;

                if (typeof a[sortKey] === 'string' && typeof b[sortKey] === 'string') {
                    return sortOrder === 'asc'
                        ? a[sortKey].localeCompare(b[sortKey])
                        : b[sortKey].localeCompare(a[sortKey]);
                } else {
                    return sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
                }
            });
        }
    }

}
// getData(filters.value, options.value.per_page, 1);


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

const filter = () => {
    getData()
}

provide('filter', filter)

</script>

<style></style>