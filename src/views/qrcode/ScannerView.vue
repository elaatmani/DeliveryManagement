<template>
    <div class="lg:tw-p-6">
        <div>
            <ScanPopup v-model:visible="showPopupShow" @detect="handleDetect" />
        </div>
        <div class="tw-p-5 lg:tw-border tw-min-h-[calc(100vh-135px)] tw-flex tw-flex-col tw-bg-white tw-w-full lg:tw-rounded-md tw-mb-5" >
            <div class="tw-grid tw-grid-cols-12 tw-h-full tw-flex-1 tw-gap-5">
                <div class="lg:tw-col-span-6 tw-col-span-12 tw-flex tw-flex-col">
                    <div>
                        <h1 class="tw-text-lg">Target</h1>

                        <div class="tw-grid tw-grid-cols-2 tw-gap-5 tw-mt-2">
                            <button @click="target = 'in'" :class="[target == 'in' && '!tw-bg-orange-500 !tw-text-white']" class="tw-px-4 tw-py-2 tw-border tw-justify-center tw-border-solid tw-flex tw-items-center tw-gap-2 tw-rounded-lg">
                                <icon icon="iconamoon:sign-plus" class="tw-text-2xl" :class="[target == 'in' ? 'tw-text-white' : 'tw-text-neutral-500']" />
                                <span style="line-height: 10px" :class="[target == 'in' ? 'tw-text-white' : 'tw-text-neutral-500']">IN</span>
                            </button>

                            <button @click="target = 'out'" :class="[target == 'out' && '!tw-bg-orange-500 !tw-text-white']" class="tw-px-4 tw-py-2 tw-border tw-justify-center tw-border-solid tw-flex tw-items-center tw-gap-2 tw-rounded-lg">
                                <icon icon="iconamoon:sign-minus" class="tw-text-2xl" :class="[target == 'out' ? 'tw-text-white' : 'tw-text-neutral-500']" />
                                <span style="line-height: 10px" :class="[target == 'out' ? 'tw-text-white' : 'tw-text-neutral-500']">OUT</span>
                            </button>
                        </div>
                    </div>
                    <div class="tw-grid tw-px-2 tw-grid-cols-12 tw-justify-center tw-mt-10">
                        <form @submit.prevent="handleConfirm" class="lg:tw-col-span-12 tw-col-span-12 tw-flex tw-flex-col tw-items-center tw-justify-center">
                            <p class="tw-text-xl tw-font-semibold tw-py-4">Scan the order reference ID.</p>
                            <div @click="showPopupShow = true" :class="[isOrderIDInvalid && 'tw-border-rose-400 tw-ring tw-ring-rose-400']" class="tw-relative hover:tw-scale-110 tw-duration-300 tw-cursor-pointer tw-h-[150px] tw-w-[150px] tw-border-2 tw-rounded-3xl tw-mt-10 tw-flex tw-items-center tw-justify-center">
                                <!-- <AnimateCheck v-if="check && !loading" /> -->
                                <icon class="tw-w-[150px] tw-h-[150px] tw-border-2 tw-rounded-3xl" icon="fluent:scan-dash-28-regular"/>
                                <div :class="[isOrderIDInvalid && '!tw-opacity-100']" class="tw-opacity-0 tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-w-full tw-h-[30px] tw-bg-rose-500 tw-flex tw-items-center tw-justify-center tw-font-medium tw-text-sm tw-text-white">
                                    ID NOT VALID
                                </div>
                                <!-- <icon v-if="loading" class="tw-text-4xl tw-text-orange-400 tw-animate-spin" icon="mingcute:loading-line"/> -->
                            </div>
                            <div v-if="false" class="tw-flex tw-items-center tw-py-5"> 
                                <hr class="tw-flex-grow tw-border-t tw-border-gray-600 lg:tw-w-[60px] tw-w-[20px]  "> 
                                <span class="tw-px-3 tw-text-gray-500"> 
                                    Or enter the code manually
                                </span> 
                                <hr class="tw-flex-grow tw-border-t tw-border-gray-600 lg:tw-w-[60px] tw-w-[20px]"> 
                            </div>
                            <div class="tw-grid tw-grid-cols-8 tw-mt-16 col-span-12 tw-gap-2 tw-w-full tw-max-w-[23rem]">
                                <input placeholder="Reference ID" id="code" type="text" v-model="detected"  class="tw-bg-gray-50 border tw-col-span-6 tw-rounded-lg tw-outline-none focus:tw-ring-gray-500 focus:tw-border-gray-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-gray-400 dark:tw-focus:tw-ring-blue-500 dark:focus:tw-border-blue-500">
                                
                                <button type="button" @click='Copy' class="tw-col-span-2 tw-text-white tw-bg-gray-700 tw-hover:bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-gray-300 tw-font-medium tw-rounded-lg tw-text-sm w-full sm:tw-w-auto tw-py-2.5 tw-text-center dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800 tw-items-center tw-inline-flex tw-justify-center">
                                    <span id="success-message" class="tw-inline-flex tw-items-center">
                                        <icon icon="mdi:content-copy"/>
                                    </span>
                                </button>
                            </div>
                            <div class="tw-grid tw-grid-cols-8 tw-py-5 tw-gap-2 tw-w-full tw-max-w-[23rem]">
                                <button class="tw-col-span-8 tw-text-white tw-bg-gray-700 tw-hover:bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-gray-300 tw-font-medium tw-rounded-lg tw-text-sm w-full sm:tw-w-auto tw-py-2.5 tw-text-center dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800 tw-items-center tw-inline-flex tw-justify-center">
                                    <span id="success-message" class="tw-inline-flex tw-items-center">
                                        Confirm
                                    </span>
                                </button>
                            </div>
            
                        </form>

                        <!-- <div class="tw-bg-orange-400 tw-rounded-xl lg:tw-col-span-4 tw-flex tw-items-center tw-justify-center">
                        
                        </div> -->
                    </div>
                </div>

                <div class="lg:tw-col-span-6 tw-col-span-12 tw-flex tw-flex-col">
                    <div class="tw-min-h-[600px] tw-flex-1 tw-w-full tw-bg-gray-100 tw-rounded-md tw-p-2 tw-space-y-2 tw-shadow-inner">
                        <transition-group
                            enter-from-class="tw-translate-y-[10px] tw-opacity-0"
                            
                            >
                            <OrderRow v-for="order in orders" @update="handleUpdate" :order="order" :key="order.scan_id" />
                        </transition-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from "vue";
import ScanPopup from "./ScanPopUp";
// import AnimateCheck from "./AnimateCheck";
import { prefix } from '@/config/config'
import OrderRow from "./OrderRow";
import { useAlert } from "@/composables/useAlert";

const showPopupShow = ref(false);
// const orders = ref([ {scanned: 'vld123', id: 1, loading: true, check: false, target: 'in'} ]);
const orders = ref([]);
const detected = ref('');
const target = ref("in");

const isOrderIDInvalid = computed(() => {
    if(detected.value == '') return false;

    const scannedPrefix = detected.value.replace(/[^a-zA-Z]/g, '').toLocaleLowerCase();
    const id = detected.value.replace(/[^0-9]/g, '');
    return scannedPrefix != prefix || !id
});

const handleDetect = (v) => { 
    detected.value = v
    handleConfirm()
}
const Copy = () => { 
    var copyText = document.getElementById("code");
    copyText.select();
    navigator.clipboard.writeText(copyText.value)
}

const handleUpdate = (scan_id, newValue) => {
    orders.value = orders.value.map(i => (i.scan_id == scan_id) ? newValue : i);

}

const checkAlreadyScanned = (qr) => {
    return orders.value.some(o => (o.scanned == qr))
}

const generateRandomId = () => {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
  const randomNum = Math.random().toString(36).substr(2, 5); // Generate random string and take a substring

  return timestamp + randomNum;
}

const handleConfirm = () => {
    const order = {scan_id: generateRandomId(), scanned: detected.value, loading: true, check: false, target: target.value}

    if(detected.value == '') {
        useAlert('Reference ID is not valid', 'warning')
        return false;
    }
    
    if(checkAlreadyScanned(detected.value)) {
        // useAlert('Already scanned or change target', 'info')
        order.already_scanned = true;
    }

    if(!isOrderIDInvalid.value && detected.value != '') {
        orders.value.unshift(order);
        detected.value = '';
    } 
    
}

</script>
<style>
    
</style>