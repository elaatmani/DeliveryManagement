<template>
  <div>
    <v-btn :to="'/products/update/' + model.id" v-if="$can(`${prop}_update`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Edit</span> -->
    </v-btn>
    <v-btn :to="'/products/' + model.id"  v-if="$can(`${prop}_show`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
      <!-- <span class="text-white text-capitalize">View</span> -->
    </v-btn>
    <v-btn @click="showPopup = true" v-if="$can(`${prop}_delete`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Delete</span> -->
    </v-btn>
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this product?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" />

  </div>
</template>
<script>
import Product from '@/api/Product';
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "prop", "model"],
  name: "productActions",
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
        Product.delete(this.model.id)
        .then((res) => {
          if (res.data.code == 'PRODUCT_DELETED') {
            this.isLoading = false
            this.$alert({
              type: 'success',
              title: 'Product Deleted Successfully'
            })
          }
          Product.all().then(res => {
            if(res.data.code == 'SUCCESS') {
              this.$store.dispatch('product/setProducts', res.data.data.products)
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