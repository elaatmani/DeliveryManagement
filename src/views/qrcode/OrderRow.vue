<template>
    <div class="tw-translate-y-0 tw-opacity-100 tw-w-full tw-p-2 tw-min-h-[60px] tw-bg-white tw-duration-300 tw-rounded tw-shadow-md">
        <div class="tw-flex tw-justify-between tw-items-center">
            <div class="tw-space-y-2">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <icon icon="solar:qr-code-bold-duotone" class="tw-text-lg tw-text-gray-500" />
                    <span style="line-height: 10px" class="tw-text-sm tw-font-medium">{{ props.order.scanned }}</span>
                </div>

                <div class="tw-flex tw-items-center tw-gap-5">
                    <div v-if="props.order.loading" class="tw-flex tw-items-center">
                        <div class="tw-w-[30px] tw-bg-gray-100 tw-h-[25px] tw-rounded-md tw-animate-pulse"></div>
                        <div class="tw-w-[70px] tw-bg-gray-100 tw-h-[25px] tw-rounded-md tw-animate-pulse tw-ml-2"></div>
                        <div class="tw-w-[30px] tw-bg-gray-100 tw-h-[25px] tw-rounded-md tw-animate-pulse tw-ml-5"></div>
                        <div class="tw-w-[100px] tw-bg-gray-100 tw-h-[25px] tw-rounded-md tw-animate-pulse tw-ml-2"></div>
                    </div>
                    
                    <div v-if="!props.order.loading && props.order.check" class="tw-flex tw-items-center tw-gap-2">
                        <icon  icon="solar:hashtag-square-bold-duotone" class="tw-text-lg tw-text-gray-500" />
                        <span v-if="props.order.id" style="line-height: 10px" class="tw-text-sm tw-font-medium">{{ props.order.id }}</span>
                    </div>

                    <div v-if="!props.order.loading && props.order.check"  class="tw-flex tw-items-center tw-gap-2">
                        <icon  icon="solar:user-id-bold-duotone" class="tw-text-lg tw-text-gray-500" />
                        <span v-if="props.order.fullname" style="line-height: 10px" class="tw-text-sm tw-font-medium tw-max-w-[120px] tw-truncate">{{ props.order.fullname }}</span>
                    </div>
                    <div v-if="!props.order.loading && !props.order.check" class="tw-w-fit tw-px-2 tw-bg-rose-100 tw-text-rose-500 tw-text-sm tw-uppercase tw-h-[25px] tw-rounded-md tw-flex tw-items-center tw-justify-center">Not Found</div>
                </div>

            </div>
            <div class="tw-h-full tw-space-y-2 tw-flex-col tw-flex tw-items-end tw-justify-between">
                <div>
                    <AnimateCheck v-if="!props.order.loading && props.order.check" />
                    <icon v-if="props.order.loading" class="tw-text-lg tw-text-orange-400 tw-animate-spin" icon="mingcute:loading-line"/>
                    <icon v-if="!props.order.loading && !props.order.check" class="tw-text-2xl tw-text-rose-500 " icon="material-symbols-light:error-outline"/>
                </div>
                <div class="tw-uppercase">
                    {{ props.order.target }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import AnimateCheck from './AnimateCheck';
import Sale from '@/api/Sale'

const props = defineProps(['order']);
const emit = defineEmits(['update']);

const handleOrder = () => {
    const id = props.order.scanned.replace(/[^0-9]/g, '');
    Sale.get(id)
    .then(
        res => {
            if(res.data.code == 'SUCCESS' && res.data.data.length) {
                const order = {...props.order, ...res.data.data[0], loading: false, check: true}
                emit('update', {scanned: props.order.scanned, target: props.order.target},  order)
                console.log(props.order)
            } else {
                emit('update', {scanned: props.order.scanned, target: props.order.target}, {...props.order, loading: false, check: false})
            }
        },
        err => {
            emit('update', {scanned: props.order.scanned, target: props.order.target}, {...props.order, loading: false, check: false})
            console.log(err)
        }
    )
}

handleOrder();

// setTimeout(() => {
//     emit('update', props.order.id, {...props.order, loading: false})
//     console.log('updated')
//     console.log(props.order)
// }, 2000);




</script>

<style>

</style>