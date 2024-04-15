<template>
    <div class="tw-w-full tw-p-2 tw-min-h-[60px] tw-bg-white tw-duration-300 tw-rounded tw-shadow-md">
        <div class="tw-flex tw-justify-between tw-items-center">
            <div class="tw-space-y-2">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <icon icon="clarity:hashtag-line" class="tw-text-xl tw-text-gray-500" />
                    <span style="line-height: 10px" class="tw-text-sm tw-font-medium">{{ props.order.id }}</span>
                </div>

                <div  class="tw-flex tw-items-center tw-gap-2">
                    <icon  icon="lets-icons:user-box-light" class="tw-text-xl tw-text-gray-500" />
                    <span v-if="props.order.fullname" style="line-height: 10px" class="tw-text-sm tw-font-medium">{{ props.order.fullname }}</span>
                    <div v-if="!props.order.fullname && props.order.loading" class="tw-w-[120px] tw-bg-gray-100 tw-h-[25px] tw-rounded-md tw-animate-pulse"></div>
                    <div v-if="!props.order.fullname && !props.order.loading" class="tw-w-fit tw-px-2 tw-bg-rose-100 tw-text-rose-500 tw-text-sm tw-uppercase tw-h-[25px] tw-rounded-md tw-flex tw-items-center tw-justify-center">Not Found</div>
                </div>
            </div>
            <div class="tw-h-full tw-space-y-2">
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
    Sale.get(props.order.id)
    .then(
        res => {
            if(res.data.code == 'SUCCESS' && res.data.data.length) {
                const order = {...props.order, ...res.data.data[0], loading: false, check: true}
                emit('update', props.order.id, order)
                console.log(props.order)
            } else {
                emit('update', props.order.id, {...props.order, loading: false, check: false})
            }
        },
        err => {
            emit('update', props.order.id, {...props.order, loading: false, check: true})
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