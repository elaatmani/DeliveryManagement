<template>
    <div class="tw-bg-white tw-p-2 tw-border tw-border-solid tw-border-gray-200">
        <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-flex tw-items-center tw-gap-2">
                <p class="tw-p-2 tw-font-bold tw-text-lg">Products</p>
                <p v-if="loading" class="tw-px-1 tw-bg-black tw-text-white tw-text-sm tw-rounded">
                    <icon icon="eos-icons:three-dots-loading" class="tw-text-xl" />
                </p>
                <p v-else class="tw-px-1 tw-bg-black tw-text-white tw-text-sm tw-rounded">{{ new
                    Intl.NumberFormat().format(total)
                    }}</p>

                <div>
                    <div role="button" @click="onExcludeAds" class="tw-inline-flex tw-items-center tw-cursor-pointer">
                        <label class="tw-relative tw-flex tw-cursor-pointer tw-items-center tw-rounded-full tw-p-3"
                            for="checkbox" data-ripple-dark="true">
                            <input type="checkbox" :checked="excludeAds"
                                class="before:tw-content[''] tw-border-solid tw-bg-white tw-peer tw-relative tw-h-5 tw-w-5 tw-cursor-pointer tw-appearance-none tw-rounded-md tw-border tw-border-blue-gray-200 tw-transition-all before:tw-absolute before:tw-top-2/4 before:tw-left-2/4 before:tw-block before:tw-h-8 before:tw-w-8 before:-tw-translate-y-2/4 before:-tw-translate-x-2/4 before:tw-rounded-full before:tw-bg-blue-gray-500 before:tw-opacity-0 before:tw-transition-opacity checked:tw-border-orange-500 checked:tw-bg-orange-500 checked:before:tw-bg-orange-500 hover:before:tw-opacity-10" />
                            <div
                                class="tw-pointer-events-none tw-absolute tw-top-2/4 tw-left-2/4 -tw-translate-y-2/4 -tw-translate-x-2/4 tw-text-white tw-opacity-0 tw-transition-opacity peer-checked:tw-opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-3.5 tw-w-3.5" viewBox="0 0 20 20"
                                    fill="currentColor" stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </label>

                        <p class="tw-text-sm tw-whitespace-nowrap">Exclude ADS</p>
                    </div>
                </div>
            </div>

            <div class="tw-flex tw-items-center tw-gap-2">

                <div class="tw-flex tw-items-center tw-gap-2">
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
                    <ProfitPerProductRow v-for="(item, index) in data" :page="options.current_page"
                        :exclude-ads="excludeAds" :key="item" :item="item" :index="index" />
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

        <div class="tw-flex tw-items-center tw-gap-2 tw-justify-end tw-mt-4">
            <button @click="onPrev" :disabled="!options.prev_page_url"
                :class="[!options.prev_page_url && 'tw-bg-gray-50 tw-cursor-not-allowed tw-text-gray-300 tw-border-gray-100 hover:!tw-bg-gray-50']"
                class="tw-w-[120px] tw-py-2 tw-border tw-border-solid tw-border-gray-200 hover:tw-bg-gray-100 tw-duration-200">Previous</button>

            <button @click="onNext" :disabled="!options.next_page_url"
                :class="[!options.next_page_url && 'tw-bg-gray-50 tw-cursor-not-allowed tw-text-gray-300 tw-border-gray-100 hover:!tw-bg-gray-50']"
                class="tw-w-[120px] tw-py-2 tw-border tw-border-solid tw-border-gray-200 hover:tw-bg-gray-100 tw-duration-200">Next</button>
        </div>
    </div>

</template>


<script setup>
import Analytics from '@/api/Analytics';
import { ref, defineEmits } from 'vue';
import ProfitPerProductRow from './ProfitPerProductRow.vue';

const emit = defineEmits(['register'])
const sorting = ref({
    net_profit: 'desc'
});

const excludeAds = ref(false);
const order_by = ref('high');
const options = ref({ per_page: 10 });
const loading = ref(true);
const total = ref(0);
const data = ref([]);

const onExcludeAds = () => excludeAds.value = !excludeAds.value;

let columns = [
    { name: 'name', label: 'Product', sortable: false, classes: ['tw-w-[260px]'] },
    { name: 'total_orders', label: 'Orders', sortable: true, classes: ['tw-w-[150px] !tw-text-center'] },
    { name: 'total_quantity', label: 'Quantity', sortable: true, classes: ['tw-w-[150px] !tw-text-center'] },
    { name: 'total_sales', label: 'Sales', sortable: true, classes: ['tw-w-[150px] !tw-text-center'] },
    { name: 'product_cost', label: 'Product Cost', sortable: true, classes: ['tw-w-[100px] !tw-text-center'] },
    { name: 'shipping_fees', label: 'Shipping', sortable: true, classes: ['tw-w-[120px] !tw-text-center'] },
    { name: 'total_spent', label: 'Ads', sortable: true, classes: ['tw-w-[120px] !tw-text-center'] },
    { name: 'net_profit', label: 'Net Profit', sortable: true, classes: ['tw-w-[120px] !tw-text-center'] },
]

const getData = async (filters, per_page = options.value.per_page, page = 1) => {
    loading.value = true;

    await Analytics.getProductsByProfit({ ...filters, per_page: per_page, page, order_by: order_by.value, sort: sorting.value })
        .then(
            res => {
                data.value = res.data.data;
                options.value = res.data;
                total.value = options.value.total;
                if (res.data.code == 'SUCCESS') {
                    // handleData(res.data.data.data);
                }
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

        getData(options.value.per_page, 1);
    }

}

// const handleData = response => {
//     series.value[0].data = response.map(i => i.total_orders)
//     series.value[1].data = response.map(i => i.total_quantity)
//     series.value[2].data = response.map(i => parseFloat(i.net_profit).toFixed(2))
//     chartOptions.value.xaxis.categories = response.map(i => i.name)
// };

const onNext = () => {
    getData(options.value.per_page, options.value.current_page + 1);
}

const onPrev = () => {
    getData(options.value.per_page, options.value.current_page - 1);
}

// getData();
emit('register', getData)


// const fakeData = [
//     {
//         "name": "منشار الحطب الكهربائي",
//         "product_id": 48,
//         "total_orders": 953,
//         "total_quantity": 960,
//         "total_sales": 46785.91,
//         "product_cost": 5760,
//         "inside_beirut_cost": "306.0",
//         "outside_beirut_cost": "2035.8",
//         "total_spent": 206.59,
//         "net_profit": 38477.5199999999
//     },
//     {
//         "name": "مضخة غسيل السيارات",
//         "product_id": 76,
//         "total_orders": 677,
//         "total_quantity": 679,
//         "total_sales": 34066.92,
//         "product_cost": 6790,
//         "inside_beirut_cost": "322.2",
//         "outside_beirut_cost": "1294.8",
//         "total_spent": 110.42,
//         "net_profit": 25549.500000000393
//     },
//     {
//         "name": "مزيل  التجاعيد",
//         "product_id": 117,
//         "total_orders": 841,
//         "total_quantity": 1268,
//         "total_sales": 26173.93,
//         "product_cost": 2536,
//         "inside_beirut_cost": "498.6",
//         "outside_beirut_cost": "1466.4",
//         "total_spent": 0,
//         "net_profit": 21672.930000000175
//     },
//     {
//         "name": "مسدس مسامير  متعدد الاستخدامات",
//         "product_id": 128,
//         "total_orders": 820,
//         "total_quantity": 855,
//         "total_sales": 32339.45,
//         "product_cost": 8550,
//         "inside_beirut_cost": "367.2",
//         "outside_beirut_cost": "1601.6",
//         "total_spent": 1511.81,
//         "net_profit": 20308.840000000484
//     },
//     {
//         "name": "منظار أحادي العدسة",
//         "product_id": 170,
//         "total_orders": 701,
//         "total_quantity": 705,
//         "total_sales": 21098.13,
//         "product_cost": 2375.849999999958,
//         "inside_beirut_cost": "271.8",
//         "outside_beirut_cost": "1430.0",
//         "total_spent": 1512.34,
//         "net_profit": 15508.140000000185
//     }]
//     fakeData
// handleData(fakeData)
</script>

<style></style>