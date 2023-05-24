<template>
    <div>
        <span class="tw-text-sm tw-text-neutral-600">Upsell</span>
        <div class="tw-relative">
            <select v-model="value"
            class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
            <option value="all">Select</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
            </select>
            <v-icon
            class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
        </div>
    </div>
</template>
<script>
export default {
    
    data() {
        return {
            value: 'all'
        }
    },

    watch: {
        value(v) {
            this.$emit('update:filter', v);
        }
    }

    
}
</script>
<style>
    
</style>