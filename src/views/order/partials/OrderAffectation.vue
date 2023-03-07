<template>
  <div v-click-outside="close" class="tw-relative tw-w-[100px]">
    <button
        @click="toggle"
        
      class=" focus:tw-ring-4 tw-ring-neutral-200 tw-bg-neutral-600/10 tw-text-neutral-800 focus:tw-outline-none  tw-font-medium tw-rounded-lg tw-text-sm tw-px-2 tw-py-1 tw-text-center tw-inline-flex tw-items-center"
      type="button"
    >
      {{ selected.name }} 
      
      <v-icon>{{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
    </button>
    <!-- Dropdown menu -->
    <div
      :class="{'tw-hidden': !isOpen}"
      class="tw-z-[20] tw-bg-white tw-absolute tw-top-full tw-left-0 tw-divide-y tw-divide-gray-100 tw-rounded-lg tw-shadow tw-w-44"
    >
      <ul
        class="tw-py-2 tw-space-y-1 tw-text-sm tw-text-gray-700"
      >
        <li v-click-outside="closeSte" class="tw-relative">
          <button @click="toggleSte" type="button" class="tw-flex tw-items-center tw-justify-between tw-w-full tw-px-4 tw-py-2 hover:tw-bg-gray-100">
            Ste Livraison
            <v-icon>{{ isSteOpen ? 'mdi-chevron-left' : 'mdi-chevron-right'}}</v-icon>
          </button>
          <div :class="{'tw-hidden': !isSteOpen}" class="tw-absolute tw-left-full tw-top-0 tw-z-10 tw-bg-white tw-divide-y tw-divide-gray-100 tw-rounded-lg tw-shadow w-44 ">
                <ul class="tw-py-2 tw-text-sm tw-text-gray-700 dark:text-gray-200" >
                    <li>
                        <a href="#" class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100 ">Amana</a>
                    </li>
                    <li>
                        <a href="#" class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100 ">Other</a>
                    </li>
                </ul>
            </div>
        </li>
        <li v-click-outside="closeDelivery" class="tw-relative">
          <button @click="toggleDelivery" type="button" class="tw-flex tw-items-center tw-justify-between tw-w-full tw-px-4 tw-py-2 hover:tw-bg-gray-100">
            Delivery
            <v-icon>{{ isDeliveryOpen ? 'mdi-chevron-left' : 'mdi-chevron-right'}}</v-icon>
          </button>
          <div :class="{'tw-hidden': !isDeliveryOpen}" class="tw-absolute tw-left-full tw-top-0 tw-z-10 tw-bg-white tw-divide-y tw-divide-gray-100 tw-rounded-lg tw-shadow w-44 ">
                <ul class="tw-py-2 tw-text-sm tw-text-gray-700 dark:text-gray-200" >
                    <li>
                        <a href="#" class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100 ">Ahmed Kech</a>
                    </li>
                    <li>
                        <a href="#" class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100 ">Karim Casa</a>
                    </li>
                    <li>
                        <a href="#" class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100 ">Adil</a>
                    </li>
                </ul>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
            isSteOpen: false,
            isDeliveryOpen: false,
            selected: { id: 1, name: 'Ahmed Kech' },
            allOptions: [
                { id: 1, name: 'Yes', text: 'tw-text-green-500', bg: 'tw-bg-green-500/10', ring: 'tw-ring-green-300' },
                { id: 2, name: 'No', text: 'tw-text-pink-500', bg: 'tw-bg-pink-500/10', ring: 'tw-ring-pink-300' },
            ]
        }
    },
    computed: {
        options() {
            return this.allOptions.filter(i => i.id !== this.selected.id)
        }
    },
    methods: {
        close() {
            this.isOpen = false
        },
        toggle() {
            this.isOpen = !this.isOpen
        },
        toggleSte() {
            this.isSteOpen = !this.isSteOpen
        },
        closeSte() {
            this.isSteOpen = false
        },
        toggleDelivery() {
            this.isDeliveryOpen = !this.isDeliveryOpen
        },
        closeDelivery() {
            this.isDeliveryOpen = false
        },
        handleChange(option) {
            this.selected = option
            this.close()
        }
    }
};
</script>

<style>
</style>