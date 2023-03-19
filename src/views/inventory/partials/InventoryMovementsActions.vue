<template>
  <div class="tw-flex tw-items-center ">
    <v-btn :to="'/inventories/update/'+ movement.id"  v-if="$can(`update_inventory_movement`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Edit</span> -->
    </v-btn>
    <v-btn  v-if="$can(`view_inventory_movement`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
      <!-- <span class="text-white text-capitalize">View</span> -->
    </v-btn>
    <v-btn @click="showPopup = true" v-if="$can(`delete_inventory_movement`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Delete</span> -->
    </v-btn>
    <popup type="warning" title="Warning" 
    body="<p>Are you sure you want to delete this movement?</p> You won't be able to revert this!" 
    :loading="isLoading" :visible="showPopup" @resolved="handleResolved" />

  </div>
</template>
<script>
import Inventory from '@/api/Inventory';
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "movement"],
  name: "inventoryActions",
  data() {
    return {
      showPopup: false,
      isLoading: false
    };
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

          Inventory.inventoryMovements().then(res => {
            if (res.data.code == 'SHOW_ALL_INVENTORY_MOVEMENTS') {
                    const movements = res.data.data
                    this.$store.dispatch('inventory/setInventoryMovements', movements)
            }
          }).catch(this.$handleApiError)

        })
        .catch(this.$handleApiError)
        .finally(() => {
          this.isLoading = false
          this.showPopup = false
        });
      } else {
        this.showPopup = false
      }
    }
  }
};
</script>