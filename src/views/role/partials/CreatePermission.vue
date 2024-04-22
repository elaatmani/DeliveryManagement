<template>
    <div>
        <v-btn @click="togglePopUp(true)" color="primary-color" variant="flat" class="text-capitalize">
            <v-icon icon="mdi-plus" class="mr-2 text-white"></v-icon>
            <span class="text-white">
                Permission
            </span>
        </v-btn>

        <popup-new :visible="props.visible">
            <div class="tw-w-full tw-max-w-[600px] tw-mx-auto tw-p-2">
                <div class="tw-w-full tw-h-fit tw-bg-white tw-rounded-md tw-border tw-border-solid tw-shadow-md">
                    <h1
                        class="tw-text-lg tw-font-medium tw-text-gray-600 tw-bg-gray-100 tw-border-b tw-border-solid tw-p-4">
                        Add permission
                    </h1>
                    <div class="tw-p-5">

                        <div class="">
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Name</label>
                            <input v-model="form.name" @input="errors.name = null" type="text"
                                :class="[errors.name && '!tw-border-red-400']"
                                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                placeholder="Enter permission name" required />
                            <label v-if="errors.name"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    errors.name }}</label>
                        </div>

                    </div>
                    <div
                        class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-100 tw-border-t tw-border-solid">
                        <button @click="togglePopUp(false)" :disabled="loading"
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
import User from "@/api/User";
import { useAlert } from "@/composables/useAlert";
import { ref, defineEmits, defineProps } from "vue";
import store from '@/store'

const emit = defineEmits(['update:visible'])
const props = defineProps(['visible'])
const loading = ref(false);
const errors = ref({});
const form = ref({ name: '' });

const togglePopUp = (value) => {
    emit("update:visible", value)
}

const create = async () => {
    if(!form.value.name) {
        errors.value.name = 'Name is required';
        return false;
    } else {
        errors.value.name = '';
    }
    loading.value = true;

    await User.createPermission(form.value.name)
    .then((res) => {
        if(res.data.code == 'SUCCESS') {
            const permissions = store.getters['user/permissions'];
            permissions.push(res.data.permission.name);
            useAlert('Permission added successfully');
            togglePopUp(false)
        }
    })
    .catch(err => {
        useAlert('Something went wrong!', 'danger');
        console.log(err)
    })

    loading.value = false;
}
</script>