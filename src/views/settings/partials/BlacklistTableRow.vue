<template>
    <tr>
        <td class="tw-px-4 tw-py-2">

        </td>
        <td class="tw-px-4 tw-py-2 tw-truncate">
            <p>{{ field.name }}</p>
        </td>
        <td class="tw-px-4 tw-py-2 tw-truncate">
            <p>{{ item.value }}</p>
        </td>
        <td class="tw-px-4 tw-py-2">
            <p>{{ moment(item.created_at).format("DD[/]MM[/]YY") }}</p>
        </td>
        <td>
            <BlacklistTableActions :item="item" />
        </td>
    </tr>
</template>
<script setup>
import BlacklistTableActions from './BlacklistTableActions';
import moment from 'moment';
import { fields } from '@/config/blacklist';
import { defineProps, toRef, computed } from 'vue'

const props = defineProps(['item']);
const item = toRef(props, 'item');
const field = computed(() => fields.find(f => f.key == item.value.field))

</script>
<style lang="">
    
</style>