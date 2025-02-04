<template>
    <div>
        <popup-new :visible="visible" :closeable="true" @cancel="handleCancel">
            <div
                class="tw-mx-auto tw-w-[95%] md:tw-max-w-[600px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg">
                <div
                    class=" tw-relative tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50">
                    <span>Categories</span>
                    <div class="tw-absolute tw-top-1/2 tw-right-4 -tw-translate-y-1/2">
                        <button @click="handleCancel"
                            class="tw-py-1 tw-px-2 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
                            <v-icon size="small">mdi-close</v-icon>
                        </button>
                    </div>
                </div>

                <div class="tw-bg-white tw-p-4">
                    <div class="tw-grid tw-gap-6 tw-gap-y-5 tw-grid-cols-1 md:tw-grid-cols-2">
                        <div class="tw-col-span-2 md:tw-col-span-2">
                            <div v-if="categories.length == 0" class="tw-p-2 tw-text-center tw-bg-gray-100">
                                <p>No categories found</p>
                            </div>

                            <div v-if="categories.length != 0" class=" tw-flex tw-gap-2 tw-flex-wrap">
                                <button @click="handleEdit(c)" v-for="c in categories" :key="c"
                                    class="hover:tw-bg-gray-100 tw-flex tw-items-center tw-gap-4 tw-p-2 tw-bg-gray-50 tw-border tw-border-solid tw-border-gray-200 tw-rounded">
                                    <span>{{ c.name }}</span>
                                        <button @click="e => {e.stopPropagation(); handleDelete(c)}" class="hover:tw-bg-rose-50 tw-ml-5 tw-bg-white tw-p-1 tw-border tw-border-solid tw-border-gray-200 tw-rounded">
                                            <icon icon="fluent:delete-32-regular" class="tw-text-rose-400 tw-text-xl" />
                                        </button>
                                </button>
                            </div>
                        </div>

                        <div class="tw-col-span-2 md:tw-col-span-2">
                            <label
                                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Name</label>
                            <div class="tw-relative">
                                <input v-model="record.name" @input="errors.name = null" type="text"
                                    :class="[errors.name && '!tw-border-red-400']"
                                    class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                    placeholder="name" required />
                            </div>
                            <label v-if="errors.name"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    errors.name }}</label>
                        </div>

                        <div class="tw-col-span-2 md:tw-col-span-2 tw-flex tw-items-center tw-justify-end tw-gap-2">
                            <button v-if="!record.id" @click="handleCreate" :disabled="isLoading"
                                class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                                <v-icon size="small"
                                    class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                                    :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                                <span>Create</span>
                            </button>

                            <button v-if="record.id"
                                @click="record = {}"
                                class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300"
                            >
                                Cancel
                            </button>

                            <button v-if="record.id" @click="handleUpdate" :disabled="isLoading"
                                class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                                <v-icon size="small"
                                    class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                                    :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                                <span>Update</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </popup-new>
    </div>
</template>

<script setup>
import { toRef, ref, defineProps, defineEmits } from 'vue';
import CashFlowCategories from '@/api/CashFlowCategories';

const props = defineProps(['visible', 'categories']);
const emit = defineEmits(['update:visible', 'update:categories']);
const visible = toRef(props, 'visible');
const categories = toRef(props, 'categories');
const isLoading = ref(false);


const record = ref({
    name: ''
});

const errors = ref({});

const handleCreate = async () => {
    isLoading.value = true;

    await CashFlowCategories.create(record.value)
        .then((res) => {
            if (res.data.code == "SUCCESS") {
                emit('update:categories', [...categories.value, res.data.category]);
                record.value = {};
            }
        })
        .catch((err) => {
            errors.value = err.response.data.errors;
        })

    isLoading.value = false;
};

const handleEdit = (c) => { 
    record.value = c;
};

const handleUpdate = async () => { 
    isLoading.value = true;

    await CashFlowCategories.update(record.value.id, record.value)
        .then((res) => {
            if (res.data.code == "SUCCESS") {
                emit('update:categories', categories.value.map((cat) => cat.id == record.value.id ? record.value : cat));
                record.value = {};
            }
        })
        .catch((err) => {
            errors.value = err.response.data.errors;
        })
    isLoading.value = false;
};
const handleDelete = async (c) => { 
    let confirmed =  confirm('Are you sure you want to delete this category?');

    if(!confirmed) return;
    
    await CashFlowCategories.destroy(c.id)
        .then((res) => {
            if(res.data.code == "SUCCESS") {
                emit('update:categories', categories.value.filter((cat) => cat.id != c.id));
            }
        })
};
const handleCancel = () => emit('update:visible', false);
</script>

<style></style>