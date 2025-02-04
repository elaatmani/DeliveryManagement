<template>
    <div v-click-outside="handleClickOutside" class="tw-relative">
        <!-- Trigger Button -->
        <button @click="isOpen = !isOpen"
            class="tw-w-[150px] tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-h-[40px] tw-flex tw-items-center tw-gap-2 tw-p-2 tw-duration-200 hover:tw-bg-gray-100 tw-cursor-pointer">
            <icon icon="solar:user-linear" class="tw-text-gray-600 tw-text-xl" />
            <span v-if="!selectedUsers.length" class="tw-text-sm tw-font-semibold">Only me</span>
            <span v-else class="tw-text-sm tw-font-semibold">{{ selectedUsers.length }} User{{ selectedUsers.length > 1 ? 's' : '' }}</span>
        </button>

        <!-- Dropdown Menu -->
        <transition name="fade">
            <div v-if="isOpen"
                class="tw-absolute tw-top-full tw-w-[300px] tw-max-h-[400px] tw-pb-[55px]x tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-shadow-lg tw-z-10 tw-right-1/2 tw-translate-y-2 tw-overflow-y-auto">
                <!-- Header -->
                <div class="tw-p-2 tw-border-b tw-border-solid tw-border-gray-200">
                    <h3 class="tw-text-lg tw-font-semibold tw-text-gray-600">Select User</h3>
                </div>

                <!-- User List -->
                <div class="tw-p-2 tw-h-full">
                    <div v-for="user in users" :key="user.id"
                        @click="toggleUserSelection(user.id)"
                        :class="[
                            'tw-flex tw-items-center tw-gap-2 tw-p-2 tw-rounded tw-cursor-pointer tw-duration-200',
                            selectedUsers.includes(user.id) ? 'tw-bg-blue-50' : 'hover:tw-bg-gray-100'
                        ]">
                        <icon icon="solar:user-linear" class="tw-text-gray-600 tw-text-xl" />
                        <span class="tw-text-sm tw-font-medium">{{ user.firstname }} {{ user.lastname }}</span>
                        <span v-if="selectedUsers.includes(user.id)" class="tw-ml-auto tw-text-blue-500">
                            <icon icon="solar:check-read-linear" class="tw-text-xl" />
                        </span>
                    </div>
                </div>

                <div class="tw-sticky tw-bottom-0 tw-p-2 tw-h-fit tw-flex tw-justify-end tw-items-center tw-w-full tw-bg-white tw-border-t tw-border-solid tw-border-gray-200">
                    <button v-if="true" @click="onFilter"
                                class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                                <span>Apply</span>
                            </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import CashFlowDashboard from '@/api/CashFlowDashboard';
import { ref, inject } from 'vue';

// Dropdown state
const isOpen = ref(false);
const filters = inject('filters');

// Example user data
const users = ref([
    { id: 1, firstname: 'John Doe' },
    { id: 2, firstname: 'Jane Smith' },
    { id: 3, firstname: 'Alice Johnson' },
    { id: 4, firstname: 'Bob Brown' },
]);

// Selected users
const selectedUsers = ref([]);

const handleClickOutside = () => {
    isOpen.value = false;
};

// Toggle user selection
const toggleUserSelection = (userId) => {
    if (selectedUsers.value.includes(userId)) {
        selectedUsers.value = selectedUsers.value.filter(id => id !== userId);
    } else {
        selectedUsers.value.push(userId);
    }

    filters.value.user_ids = selectedUsers.value;
};

const onFilter = () => {
    isOpen.value = false;

    filters.value.count++;
};

const getData = async () => {
    // Fetch data
    CashFlowDashboard.users()
        .then((res) => {
            if (res.data.code == 'SUCCESS') {
                users.value = res.data.data;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

getData();

</script>

<style scoped>
/* Fade animation for dropdown */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>