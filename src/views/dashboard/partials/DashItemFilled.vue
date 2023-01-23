<template>
    <v-sheet
        class="tw-rounded-lg"
        :color="dash.color"
        height="100"
    >

        <div class="tw-flex tw-justify-between tw-items-center tw-h-full pa-6">
            <div class="tw-flex tw-flex-col tw-h-full tw-text-white">
                <p class="tw-text-xl tw-font-bold">{{ dash.value }}</p>
                <v-spacer></v-spacer>
                <p class="tw-text-md">{{ dash.title }}</p>
            </div>
            <div class="rounded-circle tw-w-fit tw-mr-3">
                <v-icon color="white" size="x-large" class="tw-scale-[1.8]" :icon="dash.icon"></v-icon>
                <!-- <v-img width="18" height="18" :src="localUrl + 'assets/img/icons/dash2.svg'"></v-img> -->
            </div>
        </div>

    </v-sheet>
</template>

<script>
export default {
    props: ['dash']
}
</script>

<style>

</style>