<template>
  <div>
    <v-btn @click="visible = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
        <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>

    <v-btn @click="deletePopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Delete</span> -->
    </v-btn>

    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this product?</p> You won't be able to revert this!" :visible="deletePopup" @resolved="handleDelete" />

    <popup-full :visible="visible" @cancel="cancel">
        <UpdateProductVariant @update="update" :variant="variant" @cancel="cancel" />
    </popup-full>
  </div>
</template>

<script>
import UpdateProductVariant from '@/views/product/UpdateProductVariant'

export default {
    components: { UpdateProductVariant },

    props: [ 'variant' ],

    data() {
        return {
            visible: false,
            deletePopup: false
        }
    },

    methods: {
        cancel() {
            this.visible = false
        },

        update(variant) {
            console.log('from actions: ', variant);
        },

        handleDelete(resolved) {
            if(resolved) {
                this.$emit('delete', this.variant.id)
            }
            this.deletePopup = false
            
        }
    }
}
</script>

<style>

</style>