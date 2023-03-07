<template>
  <div v-click-outside="close" class="tw-relative tw-w-[100px]">
    <button
        @click="toggle"
        :class="[selected.text, selected.bg, selected.ring]"
      class=" focus:tw-ring-4 focus:tw-outline-none  tw-font-medium tw-rounded-lg tw-text-sm tw-px-2 tw-py-1 tw-text-center tw-inline-flex tw-items-center"
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
export default {
    data() {
        return {
            isOpen: false,
            selected: { id: 1, name: 'Reconfirmer', text: 'tw-text-indigo-500', bg: 'tw-bg-indigo-500/10', ring: 'tw-ring-indigo-300' },
            allOptions: [
                { id: 1, name: 'Reconfirmer', text: 'tw-text-indigo-500', bg: 'tw-bg-indigo-500/10', ring: 'tw-ring-indigo-300' },
                { id: 2, name: 'Livré', text: 'tw-text-green-500', bg: 'tw-bg-green-500/10', ring: 'tw-ring-green-300' },
                { id: 4, name: 'Reporter', text: 'tw-text-orange-500', bg: 'tw-bg-orange-500/10', ring: 'tw-ring-orange-300' },
                { id: 6, name: 'Refuser', text: 'tw-text-pink-500', bg: 'tw-bg-pink-500/10', ring: 'tw-ring-pink-300' },
                { id: 5, name: 'Annuler', text: 'tw-text-red-500', bg: 'tw-bg-red-500/10', ring: 'tw-ring-red-300' },
                { id: 7, name: 'Hors zone', text: 'tw-text-blue-500', bg: 'tw-bg-blue-500/10', ring: 'tw-ring-blue-300' },
                { id: 3, name: 'Pas de reponse', text: 'tw-text-yellow-500', bg: 'tw-bg-yellow-500/10', ring: 'tw-ring-yellow-300' },
                { id: 8, name: 'Retourné', text: 'tw-text-purple-500', bg: 'tw-bg-purple-500/10', ring: 'tw-ring-purple-300' }
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
            this.close()
        }
    }
};
</script>

<style>
</style>