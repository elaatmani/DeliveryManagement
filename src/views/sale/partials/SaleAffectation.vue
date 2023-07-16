<template>
  <div :key="affectation" v-if="deliveries.length > 0" v-click-outside="close" class="tw-relative tw-min-w-[100px]">
    <button
        @click="toggle"
        
      class="tw-whitespace-nowrap focus:tw-ring-4 tw-ring-neutral-200 tw-bg-neutral-600/10 tw-text-neutral-800 focus:tw-outline-none  tw-font-medium tw-rounded-lg tw-text-sm tw-px-2 tw-py-1 tw-text-center tw-inline-flex tw-items-center"
      type="button"
    >
      {{ selected.firstname }} {{ selected.lastname }}
      
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
            class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100"
            >{{ option.firstname }} {{ option.lastname }}</a
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="tw-relative tw-min-w-[100px] tw-flex tw-items-center" v-else>
    <v-icon class="tw-animate-spin tw-ml-1 tw-text-orange-500">mdi-loading</v-icon>
  </div>
</template>

<script>
import Sale from '@/api/Sale';
export default {
    props: [ 'affectation', 'id' ],
    data() {
        return {
            isOpen: false,
            isLoading: false,
            selectedId: null,
            old: null
        }
    },
    computed: {
        options() {
            return [{ id: null, firstname: 'select', lastname: '' }, ...this.deliveries]
        },
        selected() {
            // Check if the delivery id is exists if not return null
                const ids = [...this.deliveries.map(i => parseInt(i.id))]

            if(this.selectedId == null || !ids.includes(parseInt(this.selectedId))) {
                return { id: null, firstname: 'select', lastname: '' }
            }
            

            return this.options.filter(i => i.id == this.selectedId)[0]
            
        },
        deliveries() {
            return this.$store.getters['user/deliveries']
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
            this.old = this.affectation;
            if(option.id === this.selectedId) return false;
            this.selectedId = option.id
            this.isLoading = true
            this.updateOrder();
            this.close()
        },
        updateOrder() {
            Sale.agenteUpdateAffectaion(this.id, this.selectedId)
          .then(
            res => {
              if (res.data.code === 'SUCCESS') {
                this.$alert({
                  type: 'success',
                  title: res.data.data
                })
                this.updateAffectation(this.id, this.selected.id)
                this.isLoading = false
              }
            },
            err => {
              this.$handleApiError(err);
              this.isLoading = false;
              this.selectedId = this.old;
            }
          )
        },
        updateAffectation(id, affectation) {
          this.$store.dispatch('sale/updateAffectation', {id, affectation})
        }
    },
    mounted() {
        this.selectedId = this.affectation
        // console.log('id: ', this.id, ' affecte: ', this.affectation);
    }
};
</script>

<style>
</style>