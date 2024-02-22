<template>
  <div>
    <div class="tw-flex tw-items-center tw-justify-end tw-px-4 tw-gap-2">
      <router-link v-if="$user.role == 'seller'" :to="{ name: 'sourcings.show', params: { id: item.id } }" class="tw-text-lg tw-p-1.5 tw-rounded tw-border tw-border-solid tw-border-blue-300 tw-text-blue-500 tw-duration-200 hover:tw-bg-blue-500 hover:tw-text-white">
        <icon icon="solar:eye-bold" />
      </router-link>

      <router-link v-if="$user.role == 'admin'" :to="{ name: 'sourcings.show', params: { id: item.id } }" class="tw-text-lg tw-p-1.5 tw-rounded tw-border tw-border-solid tw-border-emerald-300 tw-text-emerald-500 tw-duration-200 hover:tw-bg-emerald-500 hover:tw-text-white">
        <icon icon="clarity:edit-solid" />
      </router-link>

      <button v-if="$user.role == 'admin'" @click="visible.history = true"  class="tw-text-lg tw-p-1.5 tw-rounded tw-border tw-border-solid tw-border-purple-300 tw-text-purple-500 tw-duration-200 hover:tw-bg-purple-500 hover:tw-text-white">
        <icon icon="iconamoon:history" />
      </button>

    </div>
    <TableActionsHistory v-if="($user.role == 'admin') && visible.history" v-model:visible="visible.history" :sourcing="item" />
  </div>
</template>

<script setup>
import { defineProps, reactive, toRef } from 'vue';
import TableActionsHistory from './TableActionsHistory';

const props = defineProps({ item: { type: Object, required: true } });
const visible = reactive({ history: false })
const item = toRef(props, 'item');
</script>

<style>

</style>