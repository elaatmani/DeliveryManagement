<template>
    <div class="tw-bg-white tw-p-4 tw-rounded tw-border tw-border-solid tw-border-gray-200">
        <div class="tw-flex tw-items-center tw-justify-between">
            <h1 class="tw-font-semibold">Online (test)</h1>
            <div class="tw-flex tw-items-center tw-gap-2">
                <button disabled class="tw-flex tw-items-center tw-justify-center tw-p-1 tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-cursor-not-allowed tw-bg-gray-100 tw-duration-200">
                    <icon icon="ph:user-list" class="tw-text-lg tw-text-gray-700" />
                </button>

                <button @click="visible = !visible" class="tw-flex tw-items-center tw-justify-center tw-p-1 tw-rounded tw-border tw-border-solid tw-border-gray-200 hover:tw-bg-gray-100 tw-duration-200">
                    <icon :icon="visible ? 'ion:chevron-up-outline' : 'ion:chevron-down-outline'" class="tw-text-lg tw-text-gray-700" />
                </button>
            </div>
        </div>
        <div v-if="visible">
            <div v-if="users.length" class="tw-flex tw-gap-2 tw-flex-wrap tw-mt-4">
                <div v-for="user in users" :key="user">
                    <div
                        :class="[!user.left_at ? 'tw-border-t-emerald-500' : 'tw-border-t-gray-200']"
                        class="tw-p-1 tw-px-2 tw-border tw-border-solid tw-border-gray-200 tw-border-t-4 tw-rounded tw-shadow-sm tw-shadow-gray-100">
                        <div class="tw-flex tw-items-center tw-gap-2">
                            <div :class="[!user.left_at ? 'tw-bg-emerald-500' : 'tw-bg-gray-200']" class="tw-w-1.5 tw-h-1.5 tw-rounded-full"></div>
                            <div class="tw-flex tw-items-center tw-gap-1 tw-font-bold">
                                <span>{{ user.firstname }}</span>
                                <span>{{ user.lastname }}</span>
                            </div>
                        </div>
                        <p v-if="!user.left_at" class="tw-uppercasex tw-font-semibold tw-text-xs tw-px-4">Online</p>
                        <p v-if="user.left_at" class="tw-uppercasex tw-font-semibold tw-text-xs tw-px-4">{{ moment(user.left_at).fromNow() }}</p>
                    </div>
                </div>
            </div>
    
            <div v-else class="tw-mt-4 tw-flex tw-items-center tw-justify-center tw-p-4 tw-bg-gray-100 tw-rounded">
                <p>All users are offline now</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';


const visible = ref(true)
const store = useStore();
const users = computed(() => {
    const members = store.getters['online/users'];

    // Separate online and offline users
    const onlineUsers = members.filter(member => !member.left_at);
    const offlineUsers = members
        .filter(member => member.left_at)
        .sort((a, b) => new Date(a.left_at) - new Date(b.left_at));

    // Combine online users first, then offline users
    return [...onlineUsers, ...offlineUsers].filter(u => u.id !== store.getters['user/user']?.id);
});


setTimeout(() => {
    console.log('online: ', store.getters['online/users']);

}, 2000)
</script>

<style></style>