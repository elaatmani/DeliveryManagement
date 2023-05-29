<template>
  <div v-if="order">
    <v-btn link target="_blank" :href="'https://api.whatsapp.com/send?phone=' + order.phone.replace('+', '').replace('-', '').replace(' ', '')" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-whatsapp</v-icon>
    </v-btn>
    <v-btn  @click="showUpdatePopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>
    <UpdateOrder v-model:visible="showUpdatePopup" v-if="showUpdatePopup" :order="order" />
    <!-- <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this sale?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" /> -->
  </div>
</template>
<script>
import UpdateOrder from '@/views/order/partials/UpdateOrder'


// your vue component
export default {
  // access any cell properties here
  components: {UpdateOrder},
  props: [ "order"],
  name: "orderActions",
  data() {
    return {
      showPopup: false,
      showUpdatePopup: false,
      isLoading: false,

      newOrder: null,


    };
  },
  computed: {
    cities() {
      return this.$store.getters['city/cities']
    }
  },
  methods: {
  },

  mounted() {
  }
};
</script>