<template>
  <div class="tw-flex tw-items-center tw-gap-1">
    <v-btn :to="'/shops/update/' + shop.id" v-if="$can(`update_shop`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Edit</span> -->
    </v-btn>
    <!-- <v-btn :to="'/shops/' + shop.id"  v-if="$can(`view_shop`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon> -->
      <!-- <span class="text-white text-capitalize">View</span> -->
    <!-- </v-btn> -->
    <v-btn @click="showPopup = true" v-if="$can(`delete_shop`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Delete</span> -->
    </v-btn>
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this shop?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" />

  </div>
</template>
<script>
import Shop from '@/api/Shop';
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "shop"],
  name: "shopActions",
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
        Shop.delete(this.shop.id)
        .then((res) => {
          if (res.data.code == 'SHOP_DELETED') {
            this.isLoading = false
            this.$alert({
              type: 'success',
              title: 'Shop Deleted Successfully'
            })
          }
          Shop.all().then(res => {
            if(res.data.code == 'SUCCESS') {
              this.$store.dispatch('shop/setShops', res.data.data.shops)
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