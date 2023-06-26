<template>
    <v-sheet
        class="tw-rounded-lg"
        :color="dash.color"
        height="70"
    >

        <div class="tw-flex tw-justify-between tw-items-center tw-w-full tw-h-full pa-3 px-4">
            <div class="tw-flex tw-flex-col tw-justify-center tw-w-full tw-h-full tw-text-white">
                <p class="tw-text-xl tw-font-bold">
                    {{ isNaN(dash.pourcentage) ? '0.00%' : dash.pourcentage }} {{ symbol }}
                </p>
                <!-- <v-spacer></v-spacer> -->
                <span class="tw-flex tw-items-center tw-gap-1 tw-w-full tw-h-full tw-text-white">
                    <number
                    v-if="numbers"
                    class="tw-font-bold"
                    ref="number1"
                    :from="0"
                    :to="dash.value"
                    :duration="1"
                    :delay="0"
                    easing="Power.easeOut"/>
                    <p class="tw-text-sm">{{ dash.title }}</p>
                    <!-- <span class="tw-text-sm tw-block tw-font-bold tw-pr-5">100%</span> -->
                </span>
            </div>
            <div class="rounded-circle tw-w-fit tw-mr-3">
                <v-icon color="white" size="large" class="md:tw-scale-[1.8] tw-scale-[1.3]" :icon="dash.icon"></v-icon>
                <!-- <v-img width="18" height="18" :src="localUrl + 'assets/img/icons/dash2.svg'"></v-img> -->
            </div>
        </div>

    </v-sheet>
</template>

<script>
export default {
    props: {
        dash: {
            required: true
        },
        symbol: {
            required: false,
            default: '%'
        },
        numbers : {
            required : false,
            default : true
        }
    }
}
</script>

<style>

</style>