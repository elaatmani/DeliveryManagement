<template>
  <div :key="state.id" class="tw-flex tw-items-center ">
    <v-btn @click="detailsPopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
      <!-- <span class="text-white text-capitalize">View</span> -->
    </v-btn>

    <popup-full :visible="detailsPopup" @cancel="detailsPopup = false">
      <InventoryStateDetails @cancel="detailsPopup = false" v-if="detailsPopup" :state="state" />
    </popup-full>

  </div>
</template>
<script>
import InventoryStateDetails from './InventoryStateDetails.vue';
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "state"],
  components: {InventoryStateDetails},
  name: "inventoryStateActions",
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
  },

  mounted() {
    // this.note = this.state.note
    // this.isConfirmed = this.state.is_received == 1;
  }
};
</script>