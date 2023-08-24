<template>
  <div>
    <div v-if="deliveries.fetched" v-click-outside="handleClickOutside" class="tw-relative tw-inline-block tw-text-left">
        <div>
            <button 
                @click="visible = !visible" type="button" 
                class="tw-inline-flex tw-w-[150px] tw-truncate tw-relative tw-items-center tw-gap-x-1.5 tw-rounded-md tw-bg-white tw-px-3 tw-py-1 tw-text-sm tw-font-semibold tw-text-gray-900 tw-shadow-none hover:tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-200" id="menu-button" aria-expanded="true" aria-haspopup="true">
                <div
                v-if="!!selected.id"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="#4ade80" d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z"/></svg>
                </div>
                <p class="tw-w-full tw-truncate tw-text-start tw-text-gray-500">{{ selected.name }}</p>
                <div>
                    
                    <!-- <svg v-if="!isLoading" class="-tw-mr-1 tw-h-5 tw-w-5 tw-text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg> -->

                    <svg v-if="isLoading" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="#4ade80" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
                </div>
            </button>
            <p v-if="!!errors.affectation" class="tw-text-xs tw-mt-2 tw-max-w-[150px] tw-text-red-400 tw-whitespace-normal">
                {{ errors.affectation }}
            </p>
        </div>

        <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "tw-transition tw-ease-out tw-duration-100"
            From: "tw-transform tw-opacity-0 tw-scale-95"
            To: "tw-transform tw-opacity-100 tw-scale-100"
            Leaving: "tw-transition tw-ease-in tw-duration-75"
            From: "tw-transform tw-opacity-100 tw-scale-100"
            To: "tw-transform tw-opacity-0 tw-scale-95"
        -->
        <v-slide-y-transition>

            <div 
            v-if="visible"
            class="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-56 tw-origin-top-right tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="tw-py-1" role="none">
                <!-- Active: "tw-bg-gray-100 tw-text-gray-900", Not Active: "tw-text-gray-700" -->
                    <button v-for="d in availableDeliveries" @click="handleChange(d.id)" :key="d.id" class="hover:tw-bg-gray-100 tw-items-center tw-w-full tw-text-start hover:tw-text-gray-700 tw-text-gray-700 tw-flex tw-gap-2 tw-px-4 tw-py-2 tw-text-sm" role="menuitem">
                        <span>
                            {{ d.name }}
                        </span>
                    </button>
                </div>
            </div>
        </v-slide-y-transition>
    </div>

    <div v-else>
        <div class="tw-p-2 tw-scale-75">
            <loading />
        </div>
    </div>

  </div>
</template>

<script>
// import Admin from '@/api/Admin';
import { update } from '../lib/update';

export default {
    props: {
        deliveries: {
            required: true
        },
        item: {
            required: true
        }
    },

    data() {
        return {
            visible: false,
            isLoading: false,
            errors: {}
        }
    },

    computed: {
        availableDeliveries() {
            return [ {id: null, name: 'Select' } , ...this.deliveries.items.filter(d => d.has.some(id => this.item.items.some(p =>p.product_id == id)))];
        },

        selected() {
            return this.availableDeliveries.find(i => i.id == this.item.affectation)
        }
    },

    methods: {
        handleClickOutside() {
            if(this.visible) {
                this.visible = false;
            }
        },

        handleChange(id) {
            this.visible = false;
            this.errors = {}
            
            
            const order = { ...this.item, affectation: id };
            update(this, order, false);
        }
    }
}
</script>

<style>

</style>