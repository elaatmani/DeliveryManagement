<template>
  <div>
    <v-btn @click="visible = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue-lighten-2" variant="flat" density="comfortable" :ripple="false" size="small">
        <v-icon color="white">mdi-eye</v-icon>
    </v-btn>

    <ProductVariantDetails :visible="visible" @cancel="cancel" :type="type" :source="source" />
  </div>
</template>

<script>
import ProductVariantDetails from '@/views/product/ProductVariantDetails'

export default {

    props: [ 'product', 'source', 'type' ],

    components: {ProductVariantDetails},

    data() {
        return {
            visible: false,
            quantity: 1,
            newVariant: null
        }
    },

    methods: {
        cancel() {
            this.visible = false
        },
    },
    mounted() {
        console.log(this.source);
    }
}
</script>

<style>

</style>