<template>
    <div>
        <button @click="show" type="button"
            class="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-white tw-bg-orange-400 hover:tw-bg-orange-500 tw-duration-200 focus:tw-ring-4 focus:tw-ring-orange-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-me-2 tw-mb-2 dark:tw-bg-orange-600 dark:hover:tw-bg-orange-700 focus:tw-outline-none dark:focus:tw-ring-orange-800">
            <v-icon size="small">mdi-plus</v-icon>
            <span>New</span>
        </button>

        <popup-new :visible="visible" :closeable="true" @cancel="cancel">
            <div class="tw-w-full tw-max-w-[500px] tw-mx-auto tw-p-2">
                <div class="tw-w-full tw-h-fit tw-bg-white tw-rounded-md tw-border tw-border-solid tw-shadow-md tw-overflow-hidden">
                    <h1
                        class="tw-text-lg tw-font-medium tw-text-gray-600 tw-bg-gray-100 tw-border-b tw-border-solid tw-p-4">
                        Add new keyword
                    </h1>

                    <div class="tw-p-5 tw-my-2">
                        <div class="">
                            <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Field</label>
                            <div class="tw-relative">
                                <select 
                                @change="errors.field = null"
                                v-model="form.blacklist.field" :class="[errors.field && '!tw-border-red-400']"
                                    class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 tw-pr-7">
                                    <option disabled value="no-value-selected">
                                        Select a field
                                    </option>
                                    <option :class="[f.name]" v-for="f in fields" :value="f.key" :key="f.key">
                                        {{ f.name }}
                                    </option>
                                </select>

                                <div
                                    class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                                    <svg class="tw-fill-current tw-h-4 tw-w-4" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            <label v-if="errors.field"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">
                                {{ errors.field }}
                            </label>
                        </div>

                        <div class="tw-mt-5">
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Keyword</label>
                            <input v-model="form.blacklist.value" @input="errors.value = null" type="text"
                                :class="[errors.value && '!tw-border-red-400']"
                                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                placeholder="Enter a keyword to be banned" required />
                            <label v-if="errors.value"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    errors.value }}</label>
                        </div>
                    </div>

                    <div
                        class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-100 tw-border-t tw-border-solid">
                        <button @click="cancel"
                            class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
                            Cancel
                        </button>
                        <button @click="create" :disabled="loading"
                            class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                            <v-icon size="small"
                                class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                                :class="[loading && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                            <span>Add</span>
                        </button>
                    </div>
                </div>
            </div>
        </popup-new>
    </div>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import Blacklist from '@/api/Blacklist'
import { fields } from "@/config/blacklist";
import { useAlert } from '@/composables/useAlert';

const blacklist = inject('blacklist')
const visible = ref(false);
const loading = ref(false);

const errors = reactive({});
const form = reactive({
    blacklist: {
        field: "no-value-selected",
        value: "",
    },
});

const cancel = () => {
    visible.value = false;
};


const show = () => {
    form.blacklist = {
        field: "no-value-selected",
        value: "",
    };
    visible.value = true;
} 

const create = async () => {
    loading.value = true;
    await Blacklist.create(form.blacklist)
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                blacklist.addItem(res.data.blacklist);
                visible.value = false;
                useAlert('Blacklist added successfully');
            }
        },
        err => {
            if(err.response?.status == 500 && err.response?.data?.code == 'ERROR') {
                useAlert(err?.response?.data?.message, 'danger')
            }

            if(err?.response?.status == 422) {
                for(let e in err?.response?.data?.errors) {
                    errors[e] = err?.response?.data?.errors[e][0]
                }
            }
        }
    )
    loading.value = false;
}
</script>