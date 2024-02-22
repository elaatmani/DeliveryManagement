<template>
    <div class="py-5 px-2 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5">
      <section class="tw-px-3">
        <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
          <div>
            <div class="tw-flex tw-items-center tw-gap-x-3">
              <h2 class="tw-text-lg tw-font-medium tw-text-gray-800 darkx:tw-text-white">
                Requested Products
              </h2>
  
              <span
                class="tw-px-3 tw-py-1 tw-text-xs tw-text-emerald-600 tw-bg-emerald-100 tw-rounded-full darkx:tw-bg-gray-800 darkx:tw-text-orange-400">{{ options.total }}
                request</span>
            </div>
  
            <p class="tw-mt-1 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">
              List of all requested products.
            </p>
          </div>
          <div>
            <router-link
                :to="{name: 'sourcings.new'}"
                class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white"
            >
                <span>Add new sourcing</span>
            </router-link>
          </div>
        </div>
  
        <div>
          <IndexOptions />
        </div>
  
        <div>
          <IndexTable :loading="isLoading" :sourcings="sourcings" />
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import Sourcing from '@/api/Sourcing';
  import IndexOptions from '@/views/sourcing/partials/common/options/IndexOptions';
  import IndexTable from '@/views/sourcing/partials/common/table/IndexTable';
  import { ref, reactive, provide } from 'vue';

  const sourcings = ref([]);
  const options = reactive({
    total: 0,
    filters: {}
  });
  const isLoading = ref(false);

  const getData = async () => {
    isLoading.value = true;
    await Sourcing.paginate()
    .then(
      res => {
        if(res.data.code == 'SUCCESS') {
          sourcings.value = res.data.sourcings.data
          options.total = res.data.sourcings.total
        }
      }
    );
    isLoading.value = false;
  };

  provide('options', {
    options,
    setOptions: v => Object.assign(options, v)
  })
  getData();
  
  </script>
  
  <style></style>