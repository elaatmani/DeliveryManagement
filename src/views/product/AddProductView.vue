<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Add Product</h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Create new product</h2>
    </div>

    <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <div>

        <v-row>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div class="tw-w-full">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Product Name</div>
              <v-text-field v-model="name" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
            </div>
          </v-col>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div class="tw-w-full">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity</div>
              <v-text-field v-model="quantity" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
            </div>
          </v-col>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div class="tw-w-full">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Buying Price</div>
              <v-text-field v-model="price" clearable clear-icon="mdi-close"  class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
            </div>
          </v-col>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div>
              <div class="mb-1 text-body-2 tw-text-zinc-700">Selling Price</div>
              <v-text-field v-model="piece" clearable clear-icon="mdi-close"  class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>

            </div>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-row>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div>
              <div class="mb-1 text-body-2 tw-text-zinc-700">Unit (piece)</div>
              <v-text-field v-model="size" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
            </div>
          </v-col>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div>
              <div class="mb-1 text-body-2 tw-text-zinc-700">Size</div>
              <v-text-field v-model="size" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
            </div>
          </v-col>
          <v-col class="!tw-py-2" cols="12" sm="6" md="6" lg="3">
            <div class="tw-w-full">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Color</div>
              <v-text-field v-model="color" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
            </div>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-row>
          <v-col class="!tw-py-2">
            <div>
              <div class="mb-1 text-body-2 tw-text-zinc-700">Description</div>
              <v-textarea variant="outlined" density="compact" color="primary-color"></v-textarea>
            </div>
          </v-col>
        </v-row>
      </div>

      
      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Cancel</span>
        </v-btn>
        <v-btn color="primary-color" variant="flat" size="large">
          <span class="text-white text-capitalize">Create</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        status: 'IN SHOP',
        discount: '0%',
        tax: '0%',
        unit: '1 Piece',
        units: ['1 Piece', '2 Pieces', '3 Pieces'],
        brand: 'brand 1',
        categorie: 'category 1',
        subcategory: 'subcategory 1',
        brands: ['brand 1', 'brand 2'],
        categories: ['category 1', 'category 2'],
        subcategories: ['subcategory 1', 'subcategory 2']
      }
    }
}
</script>

<style>

</style>