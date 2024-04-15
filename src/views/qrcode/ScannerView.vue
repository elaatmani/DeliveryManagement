<template>
    <div>
        <ScanPopup v-model:visible="showPopupShow" @detect="handleDetect" />
    </div>
    <div class="tw-p-5 tw-border tw-min-h-[calc(100vh-135px)] tw-flex tw-flex-col tw-bg-white tw-w-full tw-rounded-md tw-mb-5" >
        <div class="tw-grid tw-grid-cols-12 tw-h-full tw-flex-1">
            <div class="lg:tw-col-span-6 tw-col-span-12 tw-flex tw-flex-col">
                <div>
                    <h1 class="tw-text-lg">Target</h1>

                    <div class="tw-flex tw-items-center tw-gap-5 tw-mt-2">
                        <button @click="target = 'in'" :class="[target == 'in' && '!tw-bg-orange-500 !tw-text-white']" class="tw-px-4 tw-py-2 tw-border tw-border-solid tw-flex tw-items-center tw-gap-2 tw-rounded-lg">
                            <icon icon="tabler:transfer-in" class="tw-text-2xl" :class="[target == 'in' ? 'tw-text-white' : 'tw-text-neutral-500']" />
                            <span style="line-height: 10px" :class="[target == 'in' ? 'tw-text-white' : 'tw-text-neutral-500']">In Warehouse</span>
                        </button>

                        <button @click="target = 'out'" :class="[target == 'out' && '!tw-bg-orange-500 !tw-text-white']" class="tw-px-4 tw-py-2 tw-border tw-border-solid tw-flex tw-items-center tw-gap-2 tw-rounded-lg">
                            <icon icon="tabler:transfer-out" class="tw-text-2xl" :class="[target == 'out' ? 'tw-text-white' : 'tw-text-neutral-500']" />
                            <span style="line-height: 10px" :class="[target == 'out' ? 'tw-text-white' : 'tw-text-neutral-500']">Out Of Warehouse</span>
                        </button>
                    </div>
                </div>
                <div class="tw-grid tw-px-2 tw-grid-cols-12 tw-justify-center tw-mt-5 tw-flex-1">
                    <div class="lg:tw-col-span-12 tw-col-span-12 tw-flex tw-flex-col tw-items-center tw-justify-center">
                        <p class="tw-text-xl tw-font-semibold tw-py-4">Scan the order reference ID.</p>
                        <div class="tw-h-[150px] tw-w-[150px] tw-border-2 tw-rounded-3xl tw-flex tw-items-center tw-justify-center">
                            <!-- <AnimateCheck v-if="check && !loading" /> -->
                            <icon class="tw-w-[150px] tw-h-[150px] tw-border-2 tw-rounded-3xl" icon="fluent:scan-dash-28-regular"/>
                            <!-- <icon v-if="loading" class="tw-text-4xl tw-text-orange-400 tw-animate-spin" icon="mingcute:loading-line"/> -->
                        </div>
                        <div class="tw-flex tw-items-center tw-py-5"> 
                            <hr class="tw-flex-grow tw-border-t tw-border-gray-600 lg:tw-w-[60px] tw-w-[20px]  "> 
                            <span class="tw-px-3 tw-text-gray-500"> 
                                Or enter the code manually
                            </span> 
                            <hr class="tw-flex-grow tw-border-t tw-border-gray-600 lg:tw-w-[60px] tw-w-[20px]"> 
                        </div>    
                        <div class="tw-grid tw-grid-cols-8 col-span-12 tw-gap-2 tw-w-full tw-max-w-[23rem]">
                            <input id="code" type="text" v-model="id"  class="tw-bg-gray-50 border tw-col-span-6 tw-rounded-lg focus:tw-ring-gray-500 focus:tw-border-gray-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-gray-400 dark:tw-focus:tw-ring-blue-500 dark:focus:tw-border-blue-500">
                            <button @click='Copy' class="tw-col-span-2 tw-text-white tw-bg-gray-700 tw-hover:bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-gray-300 tw-font-medium tw-rounded-lg tw-text-sm w-full sm:tw-w-auto tw-py-2.5 tw-text-center dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800 tw-items-center tw-inline-flex tw-justify-center">
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
        
                        </div>

                    <!-- <div class="tw-bg-orange-400 tw-rounded-xl lg:tw-col-span-4 tw-flex tw-items-center tw-justify-center">
                    
                    </div> -->
                </div>
            </div>

            <div class="lg:tw-col-span-6 tw-col-span-12 tw-flex tw-flex-col">
                <div class="tw-min-h-[600px] tw-flex-1 tw-w-full tw-bg-gray-100 tw-rounded-md tw-p-2 tw-space-y-2 tw-shadow-inner">
                    <transition-group
                        enter-from-class="tw-translate-y-[10px]  tw-opacity-0"
                        leave-to-class="-tw-translate-y-[10px]  tw-opacity-0"
                        >
                        <OrderRow v-for="order in orders" @update="handleUpdate" :order="order" :key="order.id" />
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue";
import ScanPopup from "./ScanPopUp";
// import AnimateCheck from "./AnimateCheck";
import OrderRow from "./OrderRow";

const showPopupShow = ref(false);
const orders = ref([ {id: 1, loading: true, check: false, target: 'in'} ]);
const id = ref("");
const prefix = ref("");
const target = ref("in");

const handleDetect = (v, p) => { 
    id.value = v;
    orders.value.unshift({id: v, loading: true, check: false, target: target.value});
    prefix.value = p;
}
const Copy = () => { 
    var copyText = document.getElementById("code");
    copyText.select();
    navigator.clipboard.writeText(copyText.value)
}

const handleUpdate = (id, newValue) => {
    orders.value = orders.value.map(i => i.id == id ? newValue : i);
}

</script>
<style lang="">
    
</style>