<template>
  <div class="tw-flex tw-items-center tw-gap-1">
    <v-btn
      @click="showUpdatePopup = true"
      v-if="$can(`update_warehouse`)"
      class="mr-2 !tw-px-0 !tw-py-0"
      min-height="25px"
      min-width="30"
      color="orange"
      variant="flat"
      density="comfortable"
      :ripple="false"
      size="small"
    >
      <v-icon color="white">mdi-pencil-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Edit</span> -->
    </v-btn>
    <!-- <v-btn :to="'/warehouses/' + warehouse.id"  v-if="$can(`view_warehouse`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon> -->
    <!-- <span class="text-white text-capitalize">View</span> -->
    <!-- </v-btn> -->
    <v-btn
      @click="showPopup = true"
      v-if="$can(`delete_warehouse`)"
      class="mr-2 !tw-px-0 !tw-py-0"
      min-height="25px"
      min-width="30"
      color="red"
      variant="flat"
      density="comfortable"
      :ripple="false"
      size="small"
    >
      <v-icon color="white">mdi-delete-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Delete</span> -->
    </v-btn>

    <UpdateWarehouse
      :visible="showUpdatePopup"
      @cancel="showUpdatePopup = false"
      :key="warehouse.id"
      :warehouse="warehouse"
    />

    <popup
      type="warning"
      title="Warning"
      body="<p>Are you sure you want to delete this warehouse?</p> You won't be able to revert this!"
      :loading="isLoading"
      :visible="showPopup"
      @resolved="handleResolved"
    />
  </div>
</template>
<script>
import Warehouse from "@/api/Warehouse";
import UpdateWarehouse from "./UpdateWarehouse";
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  components: { UpdateWarehouse },
  props: ["rowIndex", "warehouse"],
  name: "warehouseActions",
  data() {
    return {
      showPopup: false,
      isLoading: false,
      showUpdatePopup: false,
    };
  },
  methods: {
    handleResolved(response) {
      if (response) {
        this.isLoading = true;
        Warehouse.delete(this.warehouse.id)
          .then((res) => {
            if (res.data.code == "WAREHOUSE_DELETED") {
              this.isLoading = false;
              this.$alert({
                type: "success",
                title: "Warehouse Deleted Successfully",
              });
              this.$store.dispatch("warehouse/delete", this.warehouse.id);
            }
            // Warehouse.all().then(res => {
            //   if(res.data.code == 'SUCCESS') {
            //     this.$store.dispatch('warehouse/setWarehouses', res.data.data.warehouses)
            //   }
            // }).catch(this.$handleApiError)
          })
          .catch(this.$handleApiError)
          .finally(() => {
            this.isLoading = false;
            this.showPopup = false;
          });
      } else {
        this.showPopup = false;
      }
    },
  },
};
</script>
