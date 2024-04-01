<template>
    <tr>
        <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
            {{ item.id }}
        </td>

        <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
            {{ moment(item.created_at).format('YYYY-MM-DD HH:mm:ss') }}
        </td>

        <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
            <p class="tw-w-[70px] tw-truncate">
                {{ item.type }}
            </p>
        </td>

        <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
            <p class="tw-w-[80px] tw-truncate">
                {{ item.to }}
            </p>
        </td>

        <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
            <p class="tw-w-[100px] tw-truncate">
                {{ item.content }}
            </p>
        </td>

        <td>
            <div class="tw-p-2">
                <TableActions :item="item" />
            </div>
        </td>
    </tr>

</template>

<script setup>
import { defineProps } from 'vue';
import TableActions from './TableActions'
import moment from 'moment'

const props = defineProps(['item']);
props
</script>

<style></style>