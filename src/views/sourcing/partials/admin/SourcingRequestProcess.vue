<template>
    <div>
        <div class="tw-p-3 tw-border-b tw-border-solid tw-border-neutral-200 tw-text-sm">
            <p><span class="tw-font-bold">Request No:</span> {{ route.params.id }}</p>
            <p><span class="tw-font-bold">Requested at:</span> {{ moment(sourcing.created_at).format("YYYY-MM-DD HH:mm:ss") }}</p>
        </div>

        <div class="tw-p-3 tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5 tw-border-b tw-border-solid tw-border-neutral-200">
            <div>
                <label class="tw-flex tw-items-center tw-gap-2 tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">
                    Quotation Status
                    <icon v-if="isLoading.quotation_status" icon="eos-icons:loading" class="tw-text-lg tw-text-orange-500" />
                    <!-- <loading :class="[isLoading.quotation_status ? 'tw-visible' : 'tw-invisible']" class="tw-scale-50 tw-text-orange-500" /> -->
                </label>
                <div v-click-outside="() => visible.quotation_status = false" class="tw-relative tw-z-40">
                    <input 
                        :class="[false && '!tw-border-red-400']" :disabled="isLoading.quotation_status" @click="visible.quotation_status = !visible.quotation_status" type="button"
                        class="tw-bg-gray-50 tw-text-start tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                        :value="quotation_status.name" readonly required />
                    <div
                        class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                        <svg class="tw-fill-current tw-h-4 tw-w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>

                    <transition
                    class="tw-duration-200"
                    enter-from-class="tw-translate-y-[10px]  tw-opacity-0"
                    leave-to-class="tw-translate-y-[10px]  tw-opacity-0"
                    >
                        <div v-if="visible.quotation_status" class="">
                            <div class="tw-absolute tw-bg-white tw-bottom-1.5 tw-shadow-md tw-rounded-b-lg tw-z-30 tw-overflow-hidden tw-w-full tw-border tw-border-solid tw-border-gray-300 tw-left-0 tw-translate-y-full">
                                <div class="tw-space-y-1 tw-py-1">
                                    <button 
                                            v-for="s in quotation_statuses" :key="s.value"
                                            @click="handleStatusChange('quotation_status', s)"
                                            class="tw-w-full tw-p-2"
                                            :class="[s.class]"
                                        >{{ s.name }}</button>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                
                <label v-if="false"
                    class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                        false }}</label>
            </div>

            <div>
                <label class="tw-flex tw-items-center tw-gap-2 tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">
                    Sourcing Status
                    <icon v-if="isLoading.sourcing_status" icon="eos-icons:loading" class="tw-text-lg tw-text-orange-500" />
                    <!-- <loading :class="[isLoading.sourcing_status ? 'tw-visible' : 'tw-invisible']" class="tw-scale-50 tw-text-orange-500" /> -->
                </label>
                <div v-click-outside="() => visible.sourcing_status = false" class="tw-relative tw-z-30">
                    <input 
                        :class="[false && '!tw-border-red-400']" :disabled="isLoading.sourcing_status" @click="visible.sourcing_status = !visible.sourcing_status" type="button"
                        class="tw-bg-gray-50 tw-border tw-text-start tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                        :value="sourcing_status.name" readonly required />
                    <div
                        class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                        <svg class="tw-fill-current tw-h-4 tw-w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>

                    <transition
                    class="tw-duration-200"
                    enter-from-class="tw-translate-y-[10px]  tw-opacity-0"
                    leave-to-class="tw-translate-y-[10px]  tw-opacity-0"
                    >
                        <div v-if="visible.sourcing_status" class="">
                            <div class="tw-absolute tw-bg-white tw-bottom-1.5 tw-shadow-md tw-rounded-b-lg tw-z-30 tw-overflow-hidden tw-w-full tw-border tw-border-solid tw-border-gray-300 tw-left-0 tw-translate-y-full">
                                <div class="tw-space-y-1 tw-py-1">
                                    <button 
                                            v-for="s in sourcing_statuses" :key="s.value"
                                            @click="handleStatusChange('sourcing_status', s)"
                                            class="tw-w-full tw-p-2"
                                            :class="[s.class]"
                                        >{{ s.name }}</button>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <label v-if="false"
                    class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                        false }}</label>
            </div>
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
import { defineProps, toRef, reactive, inject, computed } from 'vue';
import { quotation_statuses, sourcing_statuses } from '@/config/sourcing'
import moment from 'moment';
import Sourcing from "@/api/Sourcing";

const route = useRoute();
const props = defineProps(['sourcing']);
const sourcing = toRef(props, 'sourcing');
const sourcingOptions = inject('sourcing')
const visible = reactive({
    quotation_status: false,
    sourcing_status: false
});

const isLoading = reactive({
    quotation_status: false,
    sourcing_status: false
});

const quotation_status = computed(() => quotation_statuses.find(s => s.value == sourcing.value.quotation_status));
const sourcing_status = computed(() => sourcing_statuses.find(s => s.value == sourcing.value.sourcing_status));


const handleStatusChange = async (field, status) => {
    visible[field] = false;
    if(sourcing.value[field] == status.value) return false;
    isLoading[field] = true;
    await Sourcing.update(sourcing.value.id, {...sourcing.value, [field]: status.value})
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                sourcingOptions.updateSourcing(res.data.sourcing);
            }
        }
    )
    isLoading[field] = false;
}

</script>

<style>

</style>