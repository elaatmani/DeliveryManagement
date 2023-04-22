<template>
  <div :key="movement.id" class="tw-flex tw-items-center ">
    <v-btn @click="confirmPopup = true"  v-if="['delivery', 'admin'].includes(user.role)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-checkbox-marked-outline</v-icon>
      <!-- <span class="text-white text-capitalize">View</span> -->
    </v-btn>
    <v-btn :to="'/inventories/update/'+ movement.id"  v-if="false && $can(`update_inventory_movement`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Edit</span> -->
    </v-btn>
    <v-btn @click="detailsPopup = true" v-if="$can(`view_inventory_movement`) || true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
      <!-- <span class="text-white text-capitalize">View</span> -->
    </v-btn>
    <v-btn @click="showPopup = true" v-if="$can(`delete_inventory_movement`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Delete</span> -->
    </v-btn>

    <popup-full v-if="$can(`confirmation_inventory_movement`)" :visible="confirmPopup" @cancel="confirmPopup = false">
      <div class="md:tw-w-[50%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5">
            <h1 class="tw-text-lg tw-font-medium tw-text-blue-500">Confirmation</h1>

              <div class="mt-3">
                <h2 class="mb-2">Received</h2>
                <v-switch density="compact" :hide-details="true" v-model="isConfirmed"  color="blue"></v-switch>
              </div>

            <div class="tw-mt-3">
              <h2 class="tw-text-md mb-1">Add note</h2>
              <textarea v-model="note" cols="30" rows="3" class="tw-rounded-lg tw-px-3 tw-py-1 tw-outline-none tw-w-full tw-border tw-border-solid tw-border-neutral-600 focus:tw-border-orange-500">

              </textarea>
            </div>
            <div  class="tw-flex tw-gap-2 mt-3 tw-justify-end">
              <v-btn @click="confirmPopup = false" color="grey-darken-2" variant="flat" class="text-capitalize">
                    <span class="text-white">
                        Cancel
                    </span>
                </v-btn>
                <v-btn :loading="isLoading" @click="updateMovement" color="blue" variant="flat" class="text-capitalize">
                    <span class="text-white">
                        Update
                    </span>
                </v-btn>
            </div>
      </div>
    </popup-full>

    <popup-full :visible="detailsPopup" @cancel="detailsPopup = false">
      <MovementDetails @cancel="detailsPopup = false" v-if="detailsPopup" :movement="movement" />
    </popup-full>

    <popup type="warning" title="Warning" 
    body="<p>Are you sure you want to delete this movement?</p> You won't be able to revert this!" 
    :loading="isLoading" :visible="showPopup" @resolved="handleResolved" />

  </div>
</template>
<script>
import Inventory from '@/api/Inventory';
import MovementDetails from './MovementDetails.vue';
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "movement"],
  components: {MovementDetails},
  name: "inventoryActions",
  data() {
    return {
      showPopup: false,
      confirmPopup: false,
      detailsPopup: false,
      isConfirmed: false,
      note: '',
      isLoading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    }
  },

  methods: {
    handleResolved(response) {
      if(response) {
        this.isLoading = true

        Inventory.delete(this.movement.id)
        .then((res) => {
          if (res.data.code == 'SUCCESS') {
            this.isLoading = false
            this.$alert({
              type: 'success',
              title: 'Inventory Movement Deleted Successfully'
            })
          }

          this.getMovements()

        })
        .catch(this.$handleApiError)
        .finally(() => {
          this.isLoading = false
          this.showPopup = false
        });
      } else {
        this.showPopup = false
      }
    },
    updateMovement() {
      this.isLoading = true
      Inventory.deliveryUpdateMovement(this.movement.id, this.isConfirmed ? 1 : 0, this.note)
      .then(
        res => {
          if (res.data.code == 'SUCCESS') {
            this.$alert({
              type: 'success',
              title: 'Inventory Movement Updated Successfully'
            })

            this.getMovements()
          }
        },
        this.$handleApiError
      )
      .finally(
        () => {
          this.isLoading = false
          this.confirmPopup = false
        }
      )
    },
    getMovements() {
      Inventory.inventoryMovements().then(res => {
            if (res.data.code == 'SHOW_ALL_INVENTORY_MOVEMENTS') {
                    const movements = res.data.data
                    this.$store.dispatch('inventory/setInventoryMovements', movements)
            }
          }).catch(this.$handleApiError)
    }
  },

  mounted() {
    this.note = this.movement.note
    this.isConfirmed = this.movement.is_received == 1;
  }
};
</script>