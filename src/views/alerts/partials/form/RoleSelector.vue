<template>
    <div>
        <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Role</label>
        <vue-select :loading="loading" append-to-body :reduce="(o) => o.id" @option:selected="(e) => handleUserChange(e, 2)" :clearable="false"
            class="tw-min-w-[200px]" placeholder="Choose Role" v-model="user" :options="options" label="name">
            <template #open-indicator="{ attributes }">
                <icon icon="octicon:chevron-down-24" v-bind="attributes" class="tw-text-xl" />
            </template>
        </vue-select>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import store from '@/store'
import User from '@/api/User';
import vueSelect from 'vue-select';

const props = defineProps(['target']);
const emit = defineEmits(['update:target']);
const roles = computed(() => store.getters['user/roles'])

const user = ref(null)
const loading = ref(false);

const options = ref([
    { id: null, name: 'Choose Role' },
    ...roles.value.map(u => ({id: u.id, name: u.name.toLocaleUpperCase()}))
]);

const setRoles = roles => {
    options.value = [
        { id: null, name: 'Choose Role' },
        ...roles.map(u => ({id: u.id, name: u.name.toLocaleUpperCase()}))
    ]
}

const getRoles = async () => {
    if(store.getters['user/fetchedRoles']) return false;

    loading.value = true;

    await User.roles()
    .then(res => {
        if(res.data.code == 'SUCCESS') {
            store.dispatch('user/setRoles', res.data.data.roles)
            store.dispatch('user/setFetchedRoles', true)
            setRoles(roles.value)
        }
    });

    loading.value = false;
}



const handleUserChange = e => {
    console.log(e)
    emit('update:target', e.name)
}

getRoles();

props
emit

</script>

<style>
@import "vue-select/dist/vue-select.css";
</style>