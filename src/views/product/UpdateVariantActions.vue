<template>
  <div>
    <v-btn v-if="!!variant.created_at" @click="visibleAdd = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="flat" density="comfortable" :ripple="false" size="small">
        <v-icon color="white">mdi-plus</v-icon>
    </v-btn>

    <v-btn v-if="(variant.on_hold === undefined) || (variant.available_quantity == variant.quantity)" @click="deletePopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Delete</span> -->
    </v-btn>

    <v-btn @click="visible = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
        <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>


    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this product?</p> You won't be able to revert this!" :visible="deletePopup" @resolved="handleDelete" />

    <popup-full :visible="visible" @cancel="cancel">
        <UpdateProductVariant @update="update" :variant="variant" @cancel="cancel" />
    </popup-full>

    <popup-full :visible="visibleAdd" @cancel="cancelAdd">
        <div class="md:tw-w-[400px] tw-w-[95%] tw-bg-white tw-rounded-lg tw-p-5 tw-mx-auto">
            <div class="tw-w-full">
                <div class="mb-1 text-body-2 tw-text-zinc-700">Add quantity</div>
                <v-text-field
                :hide-details="true"
                v-model="quantity"
                clearable
                type="number"
                clear-icon="mdi-close"
                class="tw-w-full"
                variant="outlined"
                color="primary-color"
                density="compact"
                ></v-text-field>
            </div>
            <div class="tw-col-span-12 tw-flex tw-gap-2 tw-justify-end tw-mt-3">
            <button
            @click="cancelAdd"
            class="tw-bg-neutral-400 tw-py-1 tw-px-4 tw-flex tw-items-center tw-gap-1 tw-text-white tw-rounded-md"
            >
            <span class="tw-text-white">Cancel</span>
            </button>
            <button
            :disabled="!quantity || quantity == 0"
            :class="{ '!tw-bg-green-500': quantity != 0 }"
            @click="addQuantity"
            class="tw-bg-neutral-400 tw-py-1 tw-px-4 tw-flex tw-items-center tw-gap-1 tw-text-white tw-rounded-md"
            >
            <span class="tw-text-white">Add</span>
            </button>
        </div>
        </div>
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
            visibleAdd: false,
            deletePopup: false,
            quantity: 1,
            newVariant: null
        }
    },

    methods: {
        cancel() {
            this.visible = false
        },

        cancelAdd() {
            this.visibleAdd = false
        },

        update(variant) {
            console.log('from actions: ', variant);
        },

        addQuantity() {
            this.newVariant.quantity = parseInt(this.newVariant.quantity) + parseInt(this.quantity)
            this.newVariant.available_quantity = parseInt(this.newVariant.available_quantity) + parseInt(this.quantity)
            this.quantity = 1
            this.cancelAdd()
        },

        handleDelete(resolved) {
            if(resolved) {
                this.$emit('delete', this.variant.id)
            }
            this.deletePopup = false
            
        }
    },
    mounted() {
        this.newVariant = this.variant
    }
}
</script>

<style>

</style>