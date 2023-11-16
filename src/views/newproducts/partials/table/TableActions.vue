<template>
  <div class="tw-h-full">
    <div class="tw-flex tw-items-center tw-gap-2">
    <router-link :to="'/products/update/' + item.id" v-if="$can(`update_product`)" class="tw-bg-whites tw-shadow-sm tw-px-2 tw-py-1 tw-w-[30px] tw-h-[30px] tw-border tw-border-solid tw-border-orange-500/20 hover:tw-bg-orange-500/10 hover:tw-border-orange-500/70 tw-duration-300 tw-text-orange-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-pencil-outline</v-icon>
    </router-link>
    <button @click="showPopup = true" v-if="$can(`delete_product`)"  class="tw-bg-whites tw-shadow-sm tw-px-2 tw-py-1 tw-w-[30px] tw-h-[30px] tw-border tw-border-solid tw-border-rose-500/20 hover:tw-bg-rose-500/10 hover:tw-border-rose-500/70 tw-duration-300 tw-text-rose-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <v-icon size="x-small" >mdi-delete</v-icon>
    </button>
    </div>
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this product?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" />



  </div>
</template>

<script>
import Product from '@/api/Product'
export default {
    components: {  },

    props: {
        item: {
            required: true
        }
    },

    data() {
        return {
        update: false,
        history: false,
        isLoading: false,
        showPopup: false,

        }
    },

    methods: {
        handleResolved(response) {
      if(response) {
        this.isLoading = true
        Product.delete(this.item.id)
        .then((res) => {
          if (res.data.code == 'PRODUCT_DELETED') {
            this.isLoading = false
            this.$alert({
              type: 'success',
              title: 'Product Deleted Successfully'
            })
            this.$emit('refresh');
          }

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
}
</script>

<style>

</style>