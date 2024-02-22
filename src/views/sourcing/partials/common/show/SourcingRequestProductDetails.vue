<template>
  <div class="tw-w-full">
    <table class="tw-w-full">
        <thead>
            <tr>
                <th class="tw-text-start tw-border-b tw-pb-2 tw-border-solid">
                    Product details
                </th>
                <th class="tw-text-start tw-border-b tw-pb-2 tw-border-solid">
                    Quantity
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="tw-pt-2">
                    <a :href="sourcing.product_url" class="tw-truncate tw-text-blue-500 tw-cursor-pointer hover:tw-underline">{{ sourcing.product_name }}</a>
                </td>
                <td class="tw-pt-2">
                    {{ sourcing.estimated_quantity }}
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, toRef } from 'vue';

const props = defineProps(['sourcing']);
const sourcing = toRef(props, 'sourcing');
</script>

<style>

</style>