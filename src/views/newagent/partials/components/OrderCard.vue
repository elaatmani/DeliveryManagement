<template>
  <div>
    <div class="tw-bg-gray-50 tw-border tw-shadow-sm tw-rounded-lg tw-relative">

        <button @click="popup = true" type="button" class="tw-px-5 tw-absolute tw-right-3 tw-top-3 tw-z-10 tw-py-2 tw-text-sm  tw-gap-2 tw-font-medium tw-text-white tw-inline-flex tw-items-center tw-bg-green-400 hover:tw-bg-green-500 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-green-100 tw-rounded-lg tw-text-center dark:tw-bg-green-600 dark:hover:tw-bg-green-700 dark:focus:tw-ring-green-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" d="M21.455 5.416a.75.75 0 0 1-.096.943l-9.193 9.192a.75.75 0 0 1-.34.195l-3.829 1a.75.75 0 0 1-.915-.915l1-3.828a.778.778 0 0 1 .161-.312L17.47 2.47a.75.75 0 0 1 1.06 0l2.829 2.828a.756.756 0 0 1 .096.118Zm-1.687.412L18 4.061l-8.518 8.518l-.625 2.393l2.393-.625l8.518-8.519Z" clip-rule="evenodd"/><path fill="white" d="M19.641 17.16a44.4 44.4 0 0 0 .261-7.04a.403.403 0 0 1 .117-.3l.984-.984a.198.198 0 0 1 .338.127a45.91 45.91 0 0 1-.21 8.372c-.236 2.022-1.86 3.607-3.873 3.832a47.77 47.77 0 0 1-10.516 0c-2.012-.225-3.637-1.81-3.873-3.832a45.922 45.922 0 0 1 0-10.67c.236-2.022 1.86-3.607 3.873-3.832a47.75 47.75 0 0 1 7.989-.213a.2.2 0 0 1 .128.34l-.993.992a.402.402 0 0 1-.297.117a46.164 46.164 0 0 0-6.66.255a2.89 2.89 0 0 0-2.55 2.516a44.421 44.421 0 0 0 0 10.32a2.89 2.89 0 0 0 2.55 2.516c3.355.375 6.827.375 10.183 0a2.89 2.89 0 0 0 2.55-2.516Z"/></svg>
            Edit
        </button>

        <div class="tw-p-5 tw-flex tw-items-center tw-gap-2">
            <span class="tw-text-xl tw-font-bold tw-text-gray-600"><span class="tw-text-sm tw-text-gray-500"></span>
            ID: {{ order.id }} 
            </span>
            <span
                :class="[confirmation.bgLight, confirmation.textLight]"
                class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded ">{{ (confirmation.name) }}</span>
            <span
                v-if="double"
                class="tw-text-xs tw-font-medium tw-mr-2 tw-px-2.5 tw-py-0.5 tw-rounded tw-bg-purple-100 tw-text-purple-600">Maybe double</span>
        </div>
        
        <div class="tw-grid lg:tw-grid-cols-4 md:tw-grid-cols-2 tw-grid-cols-1  tw-gap-5 tw-divide-x-2">
            <div class="tw-space-y-2 tw-px-5">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <svg class="tw-stroke-orange-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"  stroke-linecap="round" stroke-width="1.5"><path d="M7 18v-1a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v1"/><path stroke-linejoin="round" d="M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/><path stroke-linejoin="round" d="M21 3.6v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6Z"/></g></svg>
                    <span class="tw-font-[cairo] tw-text-sm tw-font-medium tw-text-gray-600">Client Name</span>
                </div>
                <span class="tw-font-[cairo] tw-text-lg tw-font-bold tw-pl-8 tw-text-gray-700">{{ order.fullname }}</span>
            </div>

            <div class="tw-space-y-2 tw-px-5">
                <div class="tw-flex tw-items-center tw-gap-2">
                <svg class="tw-stroke-orange-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.118 14.702L14 15.5c-2.782-1.396-4.5-3-5.5-5.5l.77-4.13L7.815 2H4.064c-1.128 0-2.016.932-1.847 2.047c.42 2.783 1.66 7.83 5.283 11.453c3.805 3.805 9.286 5.456 12.302 6.113c1.165.253 2.198-.655 2.198-1.848v-3.584l-3.882-1.479Z"/></svg>
                    <span class="tw-font-[cairo] tw-text-sm tw-font-medium tw-text-gray-600">Phone Number</span>
                </div>
                <div class="tw-flex tw-items-center tw-gap-2">
                    <span class="tw-font-[cairo] tw-text-lg tw-font-bold tw-pl-8 tw-text-gray-700">{{ order.phone }}</span>
                    <v-btn link target="_blank" :href="'https://api.whatsapp.com/send?phone=' + order.phone.replace('+', '').replace('-', '').replace(' ', '')" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="text" density="comfortable" :ripple="false" size="small">
                        <v-icon color="green">mdi-whatsapp</v-icon>
                    </v-btn>
                </div>
            </div>

            <div class="tw-space-y-2 tw-px-5">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <svg class="tw-stroke-orange-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M3.75 18a.75.75 0 0 0-1.5 0h1.5Zm-1.5-4a.75.75 0 0 0 1.5 0h-1.5ZM7 8.75c.964 0 1.612.002 2.095.067c.461.062.659.169.789.3l1.06-1.062c-.455-.455-1.022-.64-1.65-.725c-.606-.082-1.372-.08-2.294-.08v1.5ZM11.75 12c0-.922.002-1.688-.08-2.294c-.084-.628-.27-1.195-.726-1.65l-1.06 1.06c.13.13.237.328.3.79c.064.482.066 1.13.066 2.094h1.5ZM7 7.25c-.922 0-1.688-.002-2.294.08c-.628.084-1.195.27-1.65.725l1.06 1.061c.13-.13.328-.237.79-.3c.482-.064 1.13-.066 2.094-.066v-1.5ZM3.75 12c0-.964.002-1.612.067-2.095c.062-.461.169-.659.3-.789l-1.062-1.06c-.455.455-.64 1.022-.725 1.65c-.082.606-.08 1.372-.08 2.294h1.5Zm0 10v-4h-1.5v4h1.5Zm0-8v-2h-1.5v2h1.5Z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M7 22v-6c0-1.886 0-2.828.586-3.414C8.172 12 9.114 12 11 12h2c1.886 0 2.828 0 3.414.586c.472.471.564 1.174.582 2.414M17 22v-2.75m4-11.478c0-1.34 0-2.011-.356-2.525c-.356-.514-.984-.75-2.24-1.22c-2.455-.921-3.682-1.381-4.543-.785C13 3.84 13 5.15 13 7.772V12m8 10V12M4 8V6.5c0-.943 0-1.414.293-1.707C4.586 4.5 5.057 4.5 6 4.5h2c.943 0 1.414 0 1.707.293C10 5.086 10 5.557 10 6.5V8M7 4V2m15 20H2m8-7h.5m3.5 0h-1.5M10 18h4"/></g></svg>
                    <span class="tw-font-[cairo] tw-text-sm tw-font-medium tw-text-gray-600">City</span>
                </div>
                <span class="tw-font-[cairo] tw-text-lg tw-font-bold tw-pl-8 tw-text-gray-700">{{ order.city }}</span>
            </div>

            <div class="tw-space-y-2 tw-px-5">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="#f97316" d="m19.799 5.165l-2.375-1.83a1.997 1.997 0 0 0-.521-.237A2.035 2.035 0 0 0 16.336 3H9.5l.801 5h6.035c.164 0 .369-.037.566-.098s.387-.145.521-.236l2.375-1.832c.135-.091.202-.212.202-.334s-.067-.243-.201-.335zM8.5 1h-1a.5.5 0 0 0-.5.5V5H3.664c-.166 0-.37.037-.567.099c-.198.06-.387.143-.521.236L.201 7.165C.066 7.256 0 7.378 0 7.5c0 .121.066.242.201.335l2.375 1.832c.134.091.323.175.521.235c.197.061.401.098.567.098H7v8.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-17a.5.5 0 0 0-.5-.5z"/></svg>
                    <span class="tw-font-[cairo] tw-text-sm tw-font-medium tw-text-gray-600">Address</span>
                </div>
                <span class="tw-font-[cairo] tw-text-lg tw-font-bold tw-pl-8 tw-text-gray-700">{{ order.adresse }}</span>
            </div>

        </div>

        <div class="tw-p-5 tw-py-3 tw-w-full tw-border-t tw-border-solid tw-mt-3">
            <div class="">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048"><path fill="#f97316" d="M1024 1000v959l-64 32l-832-415V536l832-416l832 416v744h-128V680l-640 320zm-64-736L719 384l621 314l245-122l-625-312zm-64 1552v-816L256 680v816l640 320zM335 576l625 312l238-118l-622-314l-241 120zm1073 1216v-128h640v128h-640zm0-384h640v128h-640v-128zm-256 640v-128h128v128h-128zm0-512v-128h128v128h-128zm0 256v-128h128v128h-128zm-128 24h1h-1zm384 232v-128h640v128h-640z"/></svg>
                    <span class="tw-font-[cairo] tw-text-sm tw-font-medium tw-text-gray-600">Product</span>
                </div>

                <ul class="tw-p-3 tw-pl-10 tw-space-y-2">
                    <li class="tw-font-[cairo] tw-flex tw-items-center tw-gap-1" v-for="p in order.items" :key="p.id"> <span class="tw-font-bold tw-text-green-500">{{ p.quantity }} x </span> <span>{{ p.product.name }}</span> <span class="tw-font-bold tw-text-orange-500 tw-bg-orange-100 tw-rounded-lg tw-px-2 tw-text-sm" v-if="!!p.product_variation.color && !['/', '-'].includes(p.product_variation.color)">{{ p.product_variation.color }}</span> <span class="tw-font-bold tw-text-orange-500 tw-bg-orange-100 tw-rounded-lg tw-px-2 tw-text-sm" v-if="!!p.product_variation.size && !['/', '-'].includes(p.product_variation.size)">{{ p.product_variation.size }}</span></li>
                    <li class="tw-font-[cairo] tw-mt-2 tw-flex tw-items-center tw-justify-end tw-gap-1 tw-text-2xl tw-text-green-400 tw-font-bold"><span>{{ currency }}</span><span>{{ price }}</span></li>
                </ul>
            </div>
        </div>

    </div>

    <div v-if="popup">
        <UpdatePopup @update="newItem => $emit('update', newItem)" v-model:visible="popup" :item="order" />
    </div>
  </div>
</template>

<script>
import UpdatePopup from '@/views/newagent/partials/components/UpdatePopup';
import { getPrice } from '@/helpers/methods';
import { currency } from '@/config/config';
import { confirmations } from '@/config/orders';

export default {
    components: { UpdatePopup },

    props: {
        order: {
            required: true
        },
        double: {
            required: false
        }
    },

    data() {
        return {
            currency: currency,
            popup: false
        }
    },

    computed: {
        price() {
            return getPrice(this.order);
        },
        confirmation() {
            return confirmations.find(c => c.value == this.order.confirmation)
        },
    }
}
</script>

<style>

</style>