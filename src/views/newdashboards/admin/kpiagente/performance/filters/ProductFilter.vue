<template>
    <div class="tw-absolute tw-top-full tw-z-10 tw-pt-2 tw-right-0">
        <div
            class="tw-flex tw-flex-col tw-w-[400px] tw-h-[380px]x tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-shadow tw-overflow-hidden">
            <div class="tw-grid tw-grid-cols-12 tw-h-full">
                <div class="tw-col-span-12 tw-w-full  tw-p-2">
                    <input v-model="search" placeholder="Search..." class="tw-w-full tw-h-[35px] tw-rounded tw-px-2 tw-outline-none focus:tw-border-orange-500 tw-border tw-border-solid tw-border-gray-200" />
                </div>
                <div v-if="products.length" class="tw-col-span-12 tw-grid tw-grid-cols-1 tw-p-2 tw-gap-2 tw-h-fit tw-max-h-[200px] tw-overflow-auto">
                    <div v-for="s in products" :key="s.id" 
                    :title="s.name"
                    @click="onClick(s.id)"
                    :class="[filters.products.includes(s.id) && '!tw-bg-orange-500 tw-text-white']"
                    class="tw-cursor-pointer tw-p-2 tw-border tw-border-solid tw-border-gray-200 tw-rounded tw-h-fit hover:tw-bg-gray-50 tw-duration-200">{{ s.name }}</div>
                </div>
                <div v-else class="tw-col-span-12 tw-p-4">
                    <p class="tw-text-center tw-font-medium">No results</p>
                </div>
                <div class="tw-col-span-12 tw-bg-white tw-h-[50px] tw-border-t tw-border-solid tw-border-gray-200">
                    <div class="tw-flex tw-items-center tw-justify-end tw-gap-2 tw-h-full tw-px-2">
                        <button @click="emit('close')"
                            class="tw-px-4 tw-py-0.5 tw-rounded tw-bg-gray-50 tw-text-gray-500">Close</button>
                        <button @click="onFilter"
                            class="tw-px-4 tw-py-0.5 tw-rounded tw-bg-orange-400 tw-text-white">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineEmits, inject, ref } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(['close']);
const filters = inject('filters');
const filter = inject('filter');
const search = ref('');
const store = useStore();
//const products = computed(() => store.getters['user/users'].filter(u => u.role_name == 'agent'))
const products = computed(() => store.getters['product/products'].filter(p => p.name.toLowerCase().includes(search.value.toLowerCase())));

const onClick = id => {
    if(filters.value.products.includes(id)) {
        filters.value.products = filters.value.products.filter(s => s != id)
    } else {
        filters.value.products.push(id)
    }

}

const onFilter = () => {
    emit('close')
    filter//();
}
</script>

<style></style>