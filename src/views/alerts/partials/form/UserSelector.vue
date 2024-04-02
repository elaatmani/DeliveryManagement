<template>
  <div>
    <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">User</label>
    <vue-select class="tw-min-w-[200px]" append-to-body :reduce="(o) => o.id" @option:selected="(e) => handleUserChange(e)" :clearable="false"
        placeholder="Choose User" v-model="user" :options="options" label="name">
    </vue-select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import store from '@/store'
import vueSelect from 'vue-select';

const props = defineProps(['target']);
const emit = defineEmits(['update:target']);
const users = computed(() => store.getters['user/users'])


const user = ref(null)

const options = ref([
    {id: null, name: 'Choose User'},
    ...users.value.map(u => ({id: u.id, name: u.firstname + ' ' + u.lastname}))
]);

const handleUserChange = e => {
    emit('update:target', e.id)
}

props
emit

</script>

<style>
@import "vue-select/dist/vue-select.css";

.vs__dropdown-menu {
    z-index: 1000000;
}
</style>