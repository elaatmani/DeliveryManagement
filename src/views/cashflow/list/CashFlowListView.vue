<template>
  <h1 class="tw-text-lg tw-font-semibold">List</h1>

  <div class="tw-p-4 tw-rounded-md tw-bg-white tw-border tw-border-solid tw-border-gray-200 tw-mt-2">
    <div class="tw-w-full tw-flex tw-items-center tw-justify-between">
        <div>
            <input type="text" class="tw-w-[250px] tw-p-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-md focus:tw-outline-orange-400" placeholder="Search" />

        </div>
        
        <div class="tw-flex tw-items-center tw-gap-2">
            
            <button @click="handleShowAll" :class="[showAll ? '!tw-bg-orange-400 !tw-text-white' : '']" class="tw-p-2 tw-bg-gray-100 tw-text-gray-600 tw-duration-200 hover:tw-bg-gray-200 tw-border tw-border-gray-300 tw-border-solid tw-rounded-md tw-flex tw-items-center tw-gap-2 tw-pr-4">
                <icon icon="heroicons:user-group-16-solid" class="tw-text-2xl" />
                <span>Show All</span>
            </button>

            <button @click="openCategoriesPopup" class="tw-p-2 tw-bg-gray-100 tw-text-gray-600 tw-duration-200 hover:tw-bg-gray-200 tw-border tw-border-gray-300 tw-border-solid tw-rounded-md tw-flex tw-items-center tw-gap-2 tw-pr-4">
                <icon icon="iconamoon:category-fill" class="tw-text-2xl" />
                <span>Categories</span>
            </button>
            <button @click="openCreatePopup" class="tw-p-2 tw-bg-orange-400 tw-duration-200 hover:tw-bg-orange-500 tw-text-white tw-rounded-md tw-flex tw-items-center tw-gap-2 tw-pr-4">
                <icon icon="jam:plus" class="tw-text-2xl" />
                <span>Deposit</span>
            </button>
        </div>
    </div>

    <div class="tw-mt-4">
        <IndexTable :all="showAll" />
    </div>

    <CreatePopup v-model:visible="visible.create" :categories="categories" />
    <CategoriesPopup v-model:visible="visible.categories" v-model:categories="categories" />
  </div>
</template>

<script setup>
import IndexTable from './partials/table/IndexTable.vue';
import CreatePopup from './partials/CreatePopup.vue';
import CategoriesPopup from './partials/CategoriesPopup.vue';
import CashFlowCategories from '@/api/CashFlowCategories';

import { ref, provide } from 'vue';
const showAll = ref(false);
const visible = ref({
    create: false,
    categories: false
});
const categories = ref([]);

const openCreatePopup = () => visible.value.create = true;
const openCategoriesPopup = () => visible.value.categories = true;

const handleShowAll = () => {
    showAll.value = !showAll.value
};


const getCategories = async () => {
    const { data } = await CashFlowCategories.all();
    categories.value = data.categories;
}


provide('categories', categories);
getCategories();
</script>

<style>

</style>