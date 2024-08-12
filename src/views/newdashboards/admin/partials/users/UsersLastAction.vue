<template>
    <div>
        <popup-new :visible="true" @cancel="$emit('cancel')">
            <div
                class="tw-mx-auto tw-w-[95%] md:tw-max-w-[700px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg">
                <div
                    class="tw-py-2 tw-px-4 tw-text-lg tw-flex tw-items-center tw-justify-between tw-border-b tw-border-solid tw-font-medium dark:tw-text-neutral-400 tw-text-neutral-500 tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50">
                    <span>Users</span>
                    <button @click="$emit('cancel')" class="tw-flex tw-items-center tw-justify-center tw-p-1 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 hover:tw-bg-gray-100 tw-duration-200">
                        <icon icon="ic:round-close" class="tw-text-lg tw-text-gray-700" />
                    </button>
                </div>

                <div class="tw-bg-white tw-p-4">
                    <input v-model="search" type="text" placeholder="Search" class="tw-bg-white tw-outline-none tw-px-4 tw-py-2 tw-w-[250px] tw-rounded tw-border tw-border-solid tw-border-gray-200">

                    <div v-if="loading" class="tw-mt-5">
                        <div class=" tw-p-4 tw-bg-gray-100 tw-rounded"></div>
                        <div class=" tw-p-4 tw-bg-gray-100 tw-mt-2 tw-rounded"></div>
                        <div class=" tw-p-4 tw-bg-gray-100 tw-mt-2 tw-rounded"></div>
                        <div class=" tw-p-4 tw-bg-gray-100 tw-mt-2 tw-rounded"></div>
                    </div>

                    <div v-else class="tw-w-full tw-mt-5">
                        <table class="tw-w-full tw-border tw-border-solid tw-border-gray-200 tw-rounded">
                            <thead class=" tw-bg-gray-100 tw-border tw-border-solid tw-border-gray-200">
                                <tr>
                                    <th class="tw-p-2 tw-text-xs tw-w-[70px] tw-text-start">ID</th>
                                    <th class="tw-p-2 tw-text-xs  tw-text-start">NAME</th>
                                    <th class="tw-p-2 tw-text-xs tw-w-[150px] tw-text-start">LAST ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="u in filteredUsers" :key="u.id" class="hover:tw-bg-gray-100 tw-duration-200">
                                    <td class="tw-p-2 ">{{ u.id }}</td>
                                    <td class="tw-p-2">
                                        <div class="tw-flex tw-items-center tw-gap-2">
                                            <div :class="[u.is_online && '!tw-bg-emerald-400']" class="tw-w-2 tw-h-2 tw-rounded tw-bg-gray-300"></div>
                                            <p>{{ u.firstname }} {{ u.lastname }}</p>
                                        </div>
                                    </td>
                                    <td class="tw-p-2 tw-font-semibold tw-">
                                        <div v-if="u.last_action">{{ moment(u.last_action).fromNow() }}</div>
                                        <div v-if="!u.last_action"> - </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </popup-new>
    </div>
</template>

<script setup>
import User from '@/api/User';
import moment from 'moment';
import { computed } from 'vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const search = ref('');
const loading = ref(false);
const users = ref([]);
const user = computed(() => store.getters['user/user']);
const online = computed(() => store.getters['online/users']);

const filteredUsers = computed(() => {
    return users.value.map(u => ({...u, is_online: online.value.some(p => p.id == u.id)})).filter(i => i.id != user.value.id).filter(o => o.firstname.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) || o.lastname.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()));
});

const getData = async () => {
    loading.value = true;
    await User.lastAction()
    .then(res => {
        if(res.data.code == 'SUCCESS') {
            users.value = res.data.users;
        }
    })
    loading.value = false;
}

getData();

</script>

<style></style>