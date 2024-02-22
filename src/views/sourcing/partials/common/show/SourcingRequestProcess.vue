<template>
    <div>
        <div class="tw-p-3 tw-border-b tw-border-solid tw-border-neutral-200 tw-text-sm">
            <p><span class="tw-font-bold">Request No:</span> {{ route.params.id }}</p>
            <p><span class="tw-font-bold">Requested at:</span> {{ moment(sourcing.created_at).format("YYYY-MM-DD HH:mm:ss") }}</p>
        </div>


        <div class="tw-p-5">
            <div class="tw-grid tw-grid-cols-5">
                <div class="tw-relative tw-flex tw-items-center tw-justify-center tw-h-[100px]">
                    <div 
                    :class="[(sourcing_status.step >= 1) ? 'tw-bg-orange-500' : 'tw-bg-neutral-200']"
                    class="tw-h-1 tw-w-full "></div>
                    <div 
                    :class="[(sourcing_status.step >= 1) ? 'tw-bg-orange-500 tw-text-white' : 'tw-bg-neutral-200 tw-text-neutral-700']"
                    class="lg:tw-h-[50px] lg:tw-w-[50px] md:tw-h-[30px] md:tw-w-[30px] tw-h-[40px] tw-w-[40px] tw-rounded-full tw-z-10 tw-aspect-square tw-absolute  tw-flex tw-items-center tw-justify-center">
                        <icon icon="solar:document-add-bold" class="lg:tw-text-2xl tw-text-xl"/>
                    </div>
                    <span class="tw-absolute -tw-bottom-[5px] tw-text-sm tw-hidden md:tw-block">Placed</span>
                </div>

                <div class="tw-relative tw-flex tw-items-center tw-justify-center tw-h-[100px]">
                    <div 
                    :class="[(sourcing_status.step >= 2 && quotation_status.value == 'confirmed') ? 'tw-bg-orange-500' : 'tw-bg-neutral-200']"
                    class="tw-h-1 tw-w-full "></div>
                    <div 
                    :class="[(sourcing_status.step >= 2 && quotation_status.value == 'confirmed') ? 'tw-bg-orange-500 tw-text-white' : 'tw-bg-neutral-200 tw-text-neutral-700']"
                    class="lg:tw-h-[50px] lg:tw-w-[50px] md:tw-h-[30px] md:tw-w-[30px] tw-h-[40px] tw-w-[40px] tw-rounded-full tw-z-10 tw-aspect-square tw-absolute  tw-flex tw-items-center tw-justify-center">
                        <icon icon="solar:settings-bold" class="lg:tw-text-2xl tw-text-xl"/>
                    </div>
                    <span class="tw-absolute -tw-bottom-[5px] tw-text-sm tw-hidden md:tw-block">Processing</span>
                </div>

                <div class="tw-relative tw-flex tw-items-center tw-justify-center tw-h-[100px]">
                    <div 
                    :class="[(sourcing_status.step >= 3 && quotation_status.value == 'confirmed') ? 'tw-bg-orange-500' : 'tw-bg-neutral-200']"
                    class="tw-h-1 tw-w-full "></div>
                    <div 
                    :class="[(sourcing_status.step >= 3 && quotation_status.value == 'confirmed') ? 'tw-bg-orange-500 tw-text-white' : 'tw-bg-neutral-200 tw-text-neutral-700']"
                    class="lg:tw-h-[50px] lg:tw-w-[50px] md:tw-h-[30px] md:tw-w-[30px] tw-h-[40px] tw-w-[40px] tw-rounded-full tw-z-10 tw-aspect-square tw-absolute  tw-flex tw-items-center tw-justify-center">
                        <icon icon="solar:box-minimalistic-bold" class="lg:tw-text-2xl tw-text-xl"/>
                    </div>
                    <span class="tw-absolute -tw-bottom-[5px] tw-text-sm tw-hidden md:tw-block">Packing</span>
                </div>

                <div class="tw-relative tw-flex tw-items-center tw-justify-center tw-h-[100px]">
                    <div
                    :class="[(sourcing_status.step >= 4 && quotation_status.value == 'confirmed') ? 'tw-bg-orange-500' : 'tw-bg-neutral-200']"
                    class="tw-h-1 tw-w-full "></div>
                    <div 
                    :class="[(sourcing_status.step >= 4 && quotation_status.value == 'confirmed') ? 'tw-bg-orange-500 tw-text-white' : 'tw-bg-neutral-200 tw-text-neutral-700']"
                    class="lg:tw-h-[50px] lg:tw-w-[50px] md:tw-h-[30px] md:tw-w-[30px] tw-h-[40px] tw-w-[40px] tw-rounded-full tw-z-10 tw-aspect-square tw-absolute  tw-flex tw-items-center tw-justify-center">
                        <icon icon="solar:routing-2-bold" class="lg:tw-text-2xl tw-text-xl"/>
                    </div>
                    <span class="tw-absolute -tw-bottom-[5px] tw-text-sm tw-hidden md:tw-block">Shipped</span>
                </div>

                <div class="tw-relative tw-flex tw-items-center tw-justify-center tw-h-[100px]">
                    <div 
                    :class="[(sourcing_status.step >= 5 && quotation_status.value == 'confirmed') ? 'tw-bg-orange-500' : 'tw-bg-neutral-200']"
                    class="tw-h-1 tw-w-full "></div>
                    <div 
                    :class="[(sourcing_status.step >= 5 && quotation_status.value == 'confirmed') ? 'tw-bg-orange-500 tw-text-white' : 'tw-bg-neutral-200 tw-text-neutral-700']"
                    class="lg:tw-h-[50px] lg:tw-w-[50px] md:tw-h-[30px] md:tw-w-[30px] tw-h-[40px] tw-w-[40px] tw-rounded-full tw-z-10 tw-aspect-square tw-absolute  tw-flex tw-items-center tw-justify-center">
                        <icon icon="solar:garage-bold" class="lg:tw-text-2xl tw-text-xl"/>
                    </div>
                    <span class="tw-absolute -tw-bottom-[5px] tw-text-sm tw-hidden md:tw-block">Delivered</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { defineProps, toRef, computed } from 'vue';
import { sourcing_statuses, quotation_statuses } from '@/config/sourcing'
import moment from 'moment'



const route = useRoute();
const props = defineProps(['sourcing']);
const sourcing = toRef(props, 'sourcing');

const quotation_status = computed(() => quotation_statuses.find(s => s.value == sourcing.value.quotation_status));
const sourcing_status = computed(() => sourcing_statuses.find(s => s.value == sourcing.value.sourcing_status));
</script>

<style>

</style>