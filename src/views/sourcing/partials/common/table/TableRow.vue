<template>
  <tr>
    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
        {{ item.id }}
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
        {{ moment(item.created_at).format('YYYY-MM-DD HH:mm:ss') }}
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
        {{ item.product_name }}
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap">
        {{ item.estimated_quantity }}
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap tw-capitalize">
        {{ item.destination_country }}
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap tw-capitalize">
            <div class="tw-px-4">
                <div :class="quotation_status.class" class="tw-rounded tw-px-4 tw-py-1 tw-text-center">
                    {{ quotation_status.name }}
                </div>
            </div>
    </td>

    <td class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap tw-capitalize">
            <div class="tw-px-4">
                <div :class="sourcing_status.class" class="tw-rounded tw-px-4 tw-py-1 tw-text-center">
                    {{ sourcing_status.name }}
                </div>
            </div>
    </td>


    <td :admin="user">
        <div>
            <TableActions :item="item" />
        </div>
    </td>
  </tr>
</template>

<script setup>
import { computed, ref, defineProps, toRef } from 'vue';
import moment from 'moment';
import { useStore } from 'vuex';
import { quotation_statuses, sourcing_statuses } from '@/config/sourcing'
import TableActions from './actions/TableActions';

const store = useStore();
const user = computed(() => store.getters['user/user']);
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
const item = toRef(props, 'item');
const quotation_status = ref(quotation_statuses.find((s) => s.value == item.value.quotation_status));
const sourcing_status = ref(sourcing_statuses.find((s) => s.value == item.value.sourcing_status));


</script>

<style>

</style>