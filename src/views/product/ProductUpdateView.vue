<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Update Product</h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Update product informations</h2>
    </div>

    <div v-if="!isLoaded">
          <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <div>

        <v-row>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div class="tw-w-full">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Product Name</div>
              <v-text-field :error="!formStatus.name.valid" @keyup="resetError('name')" :hide-details="true" v-model="product.name" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.name.message }}</div>
            </div>
          </v-col>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div class="tw-w-full">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity</div>
              <v-text-field :error="!formStatus.quantity.valid" @keyup="resetError('quantity')" :hide-details="true" v-model="product.quantity" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.quantity.message }}</div>
            </div>
          </v-col>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div class="tw-w-full">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Buying Price (DH)</div>
              <v-text-field :error="!formStatus.buyingPrice.valid" @keyup="resetError('buyingPrice')" :hide-details="true" v-model="product.buyingPrice" clearable clear-icon="mdi-close"  class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.buyingPrice.message }}</div>
            </div>
          </v-col>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div>
              <div class="mb-1 text-body-2 tw-text-zinc-700">Unit (piece)</div>
              <v-text-field :error="!formStatus.piece.valid" @keyup="resetError('piece')" :hide-details="true" v-model="product.piece" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.piece.message }}</div>
            </div>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-row>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div>
              <div class="mb-1 text-body-2 tw-text-zinc-700">Size</div>
              <v-text-field :error="!formStatus.size.valid" @keyup="resetError('size')" :hide-details="true" v-model="product.size" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.size.message }}</div>
            </div>
          </v-col>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div class="tw-w-full">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Color</div>
              <v-text-field :error="!formStatus.color.valid" @keyup="resetError('color')" :hide-details="true" v-model="product.color" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.color.message }}</div>
            </div>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-row>
          <v-col class="!tw-py-2">
            <div>
              <div class="mb-1 text-body-2 tw-text-zinc-700">Description</div>
              <v-textarea :error="!formStatus.description.valid" @keyup="resetError('description')" :hide-details="true" v-model="product.description" variant="outlined" density="compact" color="primary-color"></v-textarea>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.description.message }}</div>
            </div>
          </v-col>
        </v-row>
      </div>

      
      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn :to="{ name: 'product/list' }" color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Cancel</span>
        </v-btn>
        <v-btn @click="update" :loading="isLoading" color="primary-color" variant="flat" size="large">
          <span class="text-white text-capitalize">Update</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { validateName } from '@/helpers/validators'
import Product from '@/api/Product';
export default {
    data() {
      return {
        isLoading: false,
        isLoaded: false,

        product: {  
          name: '',
          buyingPrice: '',
          piece: '',
          quantity: '',
          size: '',
          color: '',
          image: '',
          description: ''
          },

        formStatus: {
          name: {
            valid: true,
            message: "",
          },
          buyingPrice: {
            valid: true,
            message: "",
          },
          quantity: {
            valid: true,
            message: "",
          },
          size: {
            valid: true,
            message: "",
          },
          color: {
            valid: true,
            message: "",
          },
          piece: {
            valid: true,
            message: "",
          },
          description: {
            valid: true,
            message: "",
          },
        },
      }
    },

    methods: {
      update() {
        if (!this.validate()) return false;

        this.isLoading = true
        Product.update(this.$route.params.id, this.product)
        .then(
          res => {
            if (res.data.code == "PRODUCT_UPDATED") {
              this.$alert({
                type: 'success',
                title: res.data.message
              })
            }
          }
        )
        .catch(
          err => {
            this.$handleApiError(err)
          }
        )
        .finally(
          () => this.isLoading = false
        )
      },

      resetError(field) {
        this.formStatus[field] = {
          valid: true,
          message: ''
        }
      },

      validate() {
        this.formStatus.name = validateName(this.product.name);
        this.formStatus.buyingPrice = validateName(this.product.buyingPrice);
        this.formStatus.quantity = validateName(this.product.quantity);
        this.formStatus.size = validateName(this.product.size);
        this.formStatus.color = validateName(this.product.color);
        this.formStatus.description = validateName(this.product.description);
        this.formStatus.piece = validateName(this.product.piece);

        const name = this.formStatus.name.valid;
        const buyingPrice = this.formStatus.buyingPrice.valid;
        const quantity = this.formStatus.quantity.valid;
        const color = this.formStatus.color.valid;
        const description = this.formStatus.description.valid;
        const piece = this.formStatus.piece.valid;
        const size = this.formStatus.size.valid;

        return (
          name &&
          buyingPrice &&
          quantity &&
          color &&
          description &&
          piece &&
          size
        );
      }
    },

    mounted() {
      Product.getProduct(this.$route.params.id)
      .then(
        res => {
          if (res.data.code == 'SUCCESS') {
            this.product = res.data.data.products
            this.isLoaded = true
          }
        },
        this.$handleApiError
      )
    }
}
</script>

<style>

</style>