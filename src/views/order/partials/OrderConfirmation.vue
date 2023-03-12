<template>
  <div v-click-outside="close" class="tw-relative tw-min-w-[100px]">
    <button
        @click="toggle"
        :class="[selected.text, selected.bg, selected.ring]"
      class=" focus:tw-ring-4 tw-min-w-[100px] focus:tw-outline-none  tw-font-medium tw-rounded-lg tw-text-sm tw-px-2 tw-py-1 tw-text-center tw-inline-flex tw-items-center tw-justify-between"
      type="button"
    >
      {{ selected.name }} 
      
      <v-icon v-if="!isLoading" class="tw-ml-1">{{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
      <v-icon v-if="isLoading" class="tw-animate-spin tw-ml-1">mdi-loading</v-icon>
    </button>
    <!-- Dropdown menu -->
    <div
      :class="{'tw-hidden': !isOpen}"
      class="tw-z-[20] tw-bg-white tw-absolute tw-top-full tw-left-0 tw-divide-y tw-divide-gray-100 tw-rounded-lg tw-shadow tw-w-44"
    >
      <ul
        class="tw-py-2 tw-space-y-1 tw-text-sm tw-text-gray-700 tw-max-h-[250px] tw-overflow-y-auto"
      >
        <li @click="handleChange(option)" v-for="option in options" :key="option.id">
          <a
            href="#"
            class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100"
            :class="[option.text, option.bg]"
            >{{ option.name }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Sale from '@/api/Sale';
export default {
    props: ['confirmation', 'id'],
    data() {
        return {
            isLoading: false,
            isOpen: false,
            selected: { id: 0, value: null, name: 'Select', text: 'tw-text-gray-500', bg: 'tw-bg-gray-500/10', ring: 'tw-ring-gray-300' },
            allOptions: [
                { id: 0, value: null , name: 'Select', text: 'tw-text-gray-500', bg: 'tw-bg-gray-500/10', ring: 'tw-ring-gray-300' },
                { id: 1, value: 'day-one-call-one' , name: 'Day-1 / 1ér appel', text: 'tw-text-rose-500', bg: 'tw-bg-rose-200/10', ring: 'tw-ring-rose-200' },
                { id: 2, value: 'day-one-call-two' , name: 'Day-1 / 2éme appel', text: 'tw-text-rose-500', bg: 'tw-bg-rose-400/10', ring: 'tw-ring-rose-300' },
                { id: 3, value: 'day-one-call-three' , name: 'Day-1 / 3éme appel', text: 'tw-text-rose-500', bg: 'tw-bg-rose-600/10', ring: 'tw-ring-rose-400' },
                { id: 4, value: 'day-two-call-one' , name: 'Day-2 / 1ér appel', text: 'tw-text-indigo-500', bg: 'tw-bg-indigo-200/10', ring: 'tw-ring-indigo-200' },
                { id: 5, value: 'day-two-call-two' , name: 'Day-2 / 2éme appel', text: 'tw-text-indigo-500', bg: 'tw-bg-indigo-400/10', ring: 'tw-ring-indigo-300' },
                { id: 6, value: 'day-two-call-three' , name: 'Day-2 / 3éme appel', text: 'tw-text-indigo-500', bg: 'tw-bg-indigo-600/10', ring: 'tw-ring-indigo-400' },
                { id: 7, value: 'day-three-call-one' , name: 'Day-3 / 1ér appel', text: 'tw-text-blue-500', bg: 'tw-bg-blue-200/10', ring: 'tw-ring-blue-200' },
                { id: 8, value: 'day-three-call-two' , name: 'Day-3 / 2éme appel', text: 'tw-text-blue-500', bg: 'tw-bg-blue-400/10', ring: 'tw-ring-blue-300' },
                { id: 9, value: 'day-three-call-three' , name: 'Day-3 / 3éme appel', text: 'tw-text-blue-500', bg: 'tw-bg-blue-600/10', ring: 'tw-ring-blue-400' },
                { id: 10, value: 'reporter' , name: 'Reporter', text: 'tw-text-teal-500', bg: 'tw-bg-teal-500/10', ring: 'tw-ring-teal-300' },
                { id: 11, value: 'annuler' , name: 'Annuler', text: 'tw-text-red-500', bg: 'tw-bg-red-500/10', ring: 'tw-ring-red-300' },
                { id: 12, value: 'expidier' , name: 'Expidier', text: 'tw-text-fuchsia-500', bg: 'tw-bg-fuchsia-500/10', ring: 'tw-ring-fuchsia-300' },
                { id: 13, value: 'livre' , name: 'Livré', text: 'tw-text-green-500', bg: 'tw-bg-green-500/10', ring: 'tw-ring-green-300' },
                { id: 14, value: 'confirmer' , name: 'Confirmer', text: 'tw-text-blue-500', bg: 'tw-bg-blue-500/10', ring: 'tw-ring-blue-300' },
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
        handleChange(option) {
            this.selected = option

            this.isLoading = true
            this.updateOrder();
            this.close()
        },
        updateOrder() {
          Sale.agenteUpdateConfirmation(this.id, this.selected.value)
          .then(
            res => {
              if (res.data.code === 'SUCCESS') {
                this.$alert({
                  type: 'success',
                  title: res.data.data
                })
                this.isLoading = false
              }
            },
            err => this.$handleApiError(err)
          )
        }
    },
    mounted() {
      if(this.confirmation == null) {
        this.selected = { id: 0, value: null, name: 'Select', text: 'tw-text-gray-500', bg: 'tw-bg-gray-500/10', ring: 'tw-ring-gray-300' };
      } else {
        this.options.forEach(option => {
          if(option.value === this.confirmation) {
            this.selected = option
          }
        });
      }
    }
};
</script>

<style>
</style>