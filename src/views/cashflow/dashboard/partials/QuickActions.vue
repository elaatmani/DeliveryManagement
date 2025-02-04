<template>
    <div class="tw-bg-white tw-p-4 tw-h-full">
        <h2  class="tw-text-lg tw-font-semibold tw-mb-2">Quick Actions</h2>

        <div  class="tw-grid tw-grid-cols-4 tw-gap-4">
            <button class="tw-w-full tw-aspect-square tw-rounded tw-border-2 tw-text-gray-600 hover:tw-bg-gray-100 tw-duration-200 tw-border-solid tw-border-gray-200 tw-flex tw-items-center tw-justify-center tw-flex-col tw-gap-">
                <icon icon="jam:plus" class="tw-text-4xl " />
                <span class="tw-text-lg ">Deposit</span>
            </button>

            <button class="tw-w-full tw-aspect-square tw-rounded tw-border-2 tw-text-gray-600 hover:tw-bg-gray-100 tw-duration-200 tw-border-solid tw-border-gray-200 tw-flex tw-items-center tw-justify-center tw-flex-col tw-gap-">
                <icon icon="tabler:minus" class="tw-text-4xl " />
                <span class="tw-text-lg ">Withdraw</span>
            </button>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
/* Tailwind styles are already applied via tw- prefixes */
</style>