<template>
  <div>
    <div class="tw-grid tw-grid-cols-12 tw-gap-5 tw-pb-4">
      <div class="md:tw-col-span-4 tw-col-span-12" v-if="['admin'].includes($user.role)"><FilterBySeller /></div>
      <div class="md:tw-col-span-4 tw-col-span-12" v-if="['admin'].includes($user.role)"><FilterByQuotation /></div>
      <div class="md:tw-col-span-4 tw-col-span-12" v-if="['admin'].includes($user.role)"><FilterBySourcing /></div>
    </div>
  </div>
</template>

<script setup>
import { inject, toRef } from 'vue';
import { FilterByQuotation, FilterBySeller, FilterBySourcing } from './filters'; 

const ioptions = inject('options');
const options = toRef(ioptions, 'options');
options


</script>

<style>

</style>