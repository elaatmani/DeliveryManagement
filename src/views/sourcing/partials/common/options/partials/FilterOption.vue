<template>
  <div>
    <div class="tw-grid tw-grid-cols-12 tw-gap-5 tw-pb-4">
      <div class="md:tw-col-span-4 tw-col-span-12" v-if="['admin'].includes($user.role)"><FilterByQuotation /></div>
      <div class="md:tw-col-span-4 tw-col-span-12" v-if="['admin'].includes($user.role)"><FilterBySourcing /></div>
      <div class="tw-col-span-12 tw-flex tw-justify-end" >
        <button
              @click="ioptions.getData()"
              class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white"
          >
              <span>Filter</span>
          </button>
          </div>
    </div>
  </div>
</template>

<script setup>
import { inject, toRef } from 'vue';
import { FilterByQuotation, FilterBySourcing } from './filters'; 

const ioptions = inject('options');
const options = toRef(ioptions, 'options');
options


</script>

<style>

</style>