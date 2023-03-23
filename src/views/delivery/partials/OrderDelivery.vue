<template>
  <div :key="delivery" v-click-outside="close" class="tw-relative tw-min-w-[100px]">
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
            class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100"
            :class="[option.text, option.bg]"
            >{{ option.name }}</a
          >
        </li>
      </ul>
    </div>
    <!-- <popup type="info" title="Add Note" @resolved="handleResolved" :loading="isLoading" :visible="showPopup">
      <div class="tw-min-w-[300px]">
        <p>Enter note</p>
        <v-textarea v-model="note" variant="outlined" class="rounded-md" color="primary-color">

        </v-textarea>
      </div>
    </popup> -->
    
  </div>
</template>

<script>
import Sale from '@/api/Sale';
import { deliveryStatus } from '@/config/orders';
export default {
    props: ['delivery', 'id'],
    data() {
        return {
            isLoading: false,
            isOpen: false,
            showPopup: false,
            nextOption: null,
            note: '',
            selectedId: 0,
            allOptions: deliveryStatus
        }
    },
    computed: {
        options() {
            return this.allOptions.filter(i => i.id !== this.selectedId)
        },
        selected() {
          return this.allOptions.filter((item) => item.id == this.selectedId)[0]
        },
        availableOptions() {
          return this.allOptions.map(i => i.value)
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

          if (option.id === this.selectedId) return false;
          
            this.selectedId = option.id
            this.updateOrder()
            this.close()
        },
        async updateOrder() {
          this.isLoading = true
          return Sale.deliveryUpdateDelivery(this.id, this.selected.value)
          .then(
            res => {
              if (res.data.code === 'SUCCESS') {
                this.$alert({
                  type: 'success',
                  title: res.data.data
                })
                this.updateDelivery(this.id, this.selected.value)
                this.isLoading = false
              }
            },
            err => this.$handleApiError(err)
          )
          .then(
            () => this.$emit('update', this.selected.value)
          );
        },

        updateDelivery(id, delivery) {
            this.$store.dispatch('order/updateDelivery', {id, delivery})
        },
        
    },
    mounted() {
      if (this.availableOptions.includes(this.delivery)) {
        this.selectedId = this.allOptions.find(option => option.value == this.delivery).id;
      } else {
        this.selectedId = 0;
      }
    }
};
</script>

<style>
</style>