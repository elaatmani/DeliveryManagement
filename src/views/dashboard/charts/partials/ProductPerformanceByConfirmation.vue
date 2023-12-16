<template>
    <div class="tw-p-5">
        <div v-if="!loading">
            <apexchart :height="500" :series="options.series" :chart="options.chart" :options="options"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
</template>

<script setup>
import Dashboard from '@/api/Dashboard';
import { computed, ref } from 'vue';


const data = ref([]);
const loading = ref(true);
const noAnswerStatuses = ['day-one-call-one', 'day-one-call-two', 'day-one-call-three', 'day-two-call-one', 'day-two-call-two', 'day-two-call-three', 'day-three-call-one', 'day-three-call-two', 'day-three-call-three'];
const products = computed(() => loading.value ? null : data.value.map(getStatuses))

const getStatuses = product => {
    const statuses = {
        confirmer: 0,
        annuler: 0,
        noAnswer: 0,
        new: 0,
        double: 0,
        others: 0
    };

    Object.keys(product.confirmation_counts)
    .forEach(k => {
        const status = product.confirmation_counts[k];

        if(!k) {
            statuses.new += status;
            return;
        }
        if(k in statuses) {
            statuses[k] += status;
            return;
        }

        if(noAnswerStatuses.includes(k)) {
            statuses.noAnswer += status;
            return;
        }

        statuses.others += status;
    });
    return statuses;
}

const getData = async () => {
    loading.value = true;
    await Dashboard.productPerformanceByConfirmation()
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                data.value = res.data.data.sort((a, b) => {
                    const getCount = (obj) => Object.values(obj).reduce((acc, curr) => acc + curr, 0);

                    const totalA = getCount(a.confirmation_counts);
                    const totalB = getCount(b.confirmation_counts);

                    return totalB - totalA; // Sort in descending order
                });
            }
        }
    );
    loading.value = false;
}

getData();

var options = computed(() => loading.value ? null : ({
    series: [
        {
            name: 'New',
            group: 'actual',
            data: products.value.map(p => p.new)
        },
        {
            name: 'Confirmed',
            group: 'actual',
            data: products.value.map(p => p.confirmer)
        },
        {
            name: 'Cancelled',
            group: 'actual',
            data: products.value.map(p => p.annuler)
        },
        {
            name: 'No Answer',
            group: 'actual',
            data: products.value.map(p => p.noAnswer)
        },
        {
            name: 'Double',
            group: 'actual',
            data: products.value.map(p => p.double)
        },
        {
            name: 'Others',
            group: 'actual',
            data: products.value.map(p => p.others)
        }
    ],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    dataLabels: {
        formatter: () => {
            return ''
        }
    },
    plotOptions: {
        bar: {
            horizontal: false
        }
    },
    xaxis: {
        categories: data.value.map(p => p.ref),
        labels: {
            // formatter: (val) => {
            //     return val / 1000 + 'K'
            // }
        }
    },
    fill: {
        opacity: 1,
    },
    // colors: ['#22c55e', '#f43f5e'],
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    }
}));
</script>

<style></style>