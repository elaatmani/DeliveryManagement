<template>
    <div class="tw-bg-white tw-p-2 tw-border tw-border-solid tw-border-gray-200">
        <div class="tw-flex tw-items-center tw-gap-2">
            <p class="tw-p-2 tw-font-bold tw-text-lg">Products</p>
            <p v-if="loading" class="tw-px-1 tw-bg-black tw-text-white tw-text-sm tw-rounded">
                <icon icon="eos-icons:three-dots-loading" class="tw-text-xl" />
            </p>
            <p v-else class="tw-px-1 tw-bg-black tw-text-white tw-text-sm tw-rounded">{{ new
            Intl.NumberFormat().format(total)
            }}</p>
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
                                <icon :class="[c.name in sorting && (sorting[c.name] == 'high' ? '!tw-text-gray-800' : '!tw-text-gray-800 !tw-rotate-180')]" icon="ic:round-sort" class="tw-text-lg tw-text-gray-200" />
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
                
                <tbody v-if="!loading">
                    <ProfitPerProductRow v-for="(item, index) in data" :key="item" :item="item" :index="index" />
                </tbody>
            </table>
        </div>
    </div>

</template>


<script setup>
import Analytics from '@/api/Analytics';
import { ref, watch, defineEmits, defineProps, toRef } from 'vue';
import ProfitPerProductRow from './ProfitPerProductRow.vue';

const props = defineProps(['register', 'filters'])
const emit = defineEmits(['register'])
const filters = toRef(props, 'filters');
const sorting = ref({});

const order_by = ref('high');
// const options = ref({});
const loading = ref(true);
const total = ref(0);
const data = ref([]);

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

watch(() => order_by.value, () => {
    getData();
})

const getData = async (per_page = 10, page = 1) => {
    loading.value = true;

    await Analytics.getProductsByProfit({ ...filters.value, per_page, page, order_by: order_by.value, sort: sorting.value })
        .then(
            res => {
                data.value = res.data.data;
                if (res.data.code == 'SUCCESS') {
                    // handleData(res.data.data.data);
                    // options.value = res.data.data;
                    // total.value = options.value.total;
                }
            },
            err => {
                console.log(err);
            }
        );
    loading.value = false;
};

const onSortClick = (column) => {
    if(column.sortable) {

        const field = sorting.value[column.name];
        if(field == undefined) {
            sorting.value[column.name] = 'desc'
        } else if(field == 'high') {
            sorting.value[column.name] = 'asc'
        } else {
            delete sorting.value[column.name]
        }

        getData();
    }

}

// const handleData = response => {
//     series.value[0].data = response.map(i => i.total_orders)
//     series.value[1].data = response.map(i => i.total_quantity)
//     series.value[2].data = response.map(i => parseFloat(i.net_profit).toFixed(2))
//     chartOptions.value.xaxis.categories = response.map(i => i.name)
// };

// const onNext = () => {
//     getData(options.value.per_page, options.value.current_page + 1);
// }

// const onPrev = () => {
//     getData(options.value.per_page, options.value.current_page - 1);
// }

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