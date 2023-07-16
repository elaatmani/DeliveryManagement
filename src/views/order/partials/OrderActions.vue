<template>
  <div v-if="order">
    <v-btn v-if="only.includes('whatsapp')" link target="_blank" :href="'https://api.whatsapp.com/send?phone=' + order.phone.replace('+', '').replace('-', '').replace(' ', '')" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-whatsapp</v-icon>
    </v-btn>
    <v-btn v-if="only.includes('update')"  @click="showUpdatePopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>

    <div v-if="double">
      <UpdateDoubleOrder @update-order="o => $emit('updateOrder', o)" v-model:visible="showUpdatePopup" v-if="showUpdatePopup" :order="order" />
    </div>
    <div v-else>
      <UpdateOrder v-model:visible="showUpdatePopup" v-if="showUpdatePopup" :order="order" />
    </div>
    <!-- <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this sale?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" /> -->
  </div>
</template>
<script>
import UpdateOrder from '@/views/order/partials/UpdateOrder'
import UpdateDoubleOrder from '@/views/order/partials/UpdateDoubleOrder'


// your vue component
export default {
  emits: ['updateOrder'],
  // access any cell properties here
  components: {UpdateOrder, UpdateDoubleOrder},
  // props: [ "order", 'only'],
  props:{
    order: {
      required: true
    },
    only:{
      required: false,
      default: ['update', 'whatsapp']
    },
    double: {
      required: false,
      default: false
    }
  },
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