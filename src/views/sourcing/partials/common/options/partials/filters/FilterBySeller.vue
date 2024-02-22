<template>
    <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Seller</label
        >

        <select
          @change="e=> emit('update', {...filters, user_id: e.target.value})"
          
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
          <option value="all"  >All</option>
          <option :value="d.id" class="tw-capitalize" v-for="d in sellers" :key="d.id">
            {{ d.firstname }} {{ d.lastname }}
          </option>
        </select>
      </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, defineProps, defineEmits, toRef } from 'vue';

const store = useStore();
const props = defineProps(['filters']);
const emit = defineEmits(['update']);
const filters = toRef(props, 'filters');
const fetched = computed(() => store.getters['user/fetched']);
const users = computed(() => store.getters['user/users']);
const sellers = computed(() => fetched.value ? users.value.filter(u => u.role.name == 'seller') : []);

</script>

<style>

</style>