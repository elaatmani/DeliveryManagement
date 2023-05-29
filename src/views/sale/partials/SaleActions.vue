<template>
  <div v-if="sale">
    <v-btn link target="_blank" :href="'https://api.whatsapp.com/send?phone=' + sale.phone.replace('+', '').replace('-', '').replace(' ', '')" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-whatsapp</v-icon>
    </v-btn>
    <v-btn v-if="$can(`update_sale`)" @click="showUpdatePopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>
    <v-btn v-if="$can(`view_sale`) && false" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
    </v-btn>
    <v-btn @click="showPopup = true" v-if="$can(`delete_sale`) && false" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
    </v-btn>
    <v-btn @click="showHistoryPopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="teal" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-sort-clock-ascending-outline</v-icon>
    </v-btn>

    <popup-full :visible="showHistoryPopup" @cancel="showHistoryPopup = false">
      <SaleHistory @cancel="showHistoryPopup = false" v-if="showHistoryPopup" :sale="sale" />
    </popup-full>

    <UpdateSale v-model:visible="showUpdatePopup" :order="sale" />

    <!--  -->
    <!-- <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this sale?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" /> -->
  </div>
</template>
<script>
import SaleHistory from '@/views/sale/partials/SaleHistory'
import UpdateSale from '@/views/sale/partials/UpdateSale'


// your vue component
export default {
  // access any cell properties here
  props: [ "sale"],
  name: "saleActions",
  components: { SaleHistory, UpdateSale },
  data() {
    return {
      showPopup: false,
      showUpdatePopup: false,
      showHistoryPopup: false,
      isLoading: false,


    };
  },
  computed: {
    cities() {
      return this.$store.getters['city/cities']
    }
  },
  methods: {
  },

};
</script>