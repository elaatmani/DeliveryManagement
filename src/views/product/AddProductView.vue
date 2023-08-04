<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">
        Add Product
      </h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Create new product</h2>
    </div>

    <div v-if="!isLoaded">
      <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <div>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Product Name
                  </div>
                  <v-text-field
                    :error="!formStatus.name.valid"
                    @keyup="resetError('name')"
                    :hide-details="true"
                    v-model="product.name"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    {{ formStatus.name.message }}
                  </div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Reference</div>
                  <v-text-field
                    :error="!formStatus.reference.valid"
                    @keyup="resetError('reference')"
                    :hide-details="true"
                    v-model="product.reference"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    {{ formStatus.reference.message }}
                  </div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Buying Price ({{currency}})
                  </div>
                  <v-text-field
                    type="number"
                    @change="handleBuyingPriceChange"
                    :error="!formStatus.buyingPrice.valid"
                    @keyup="resetError('buyingPrice')"
                    :hide-details="true"
                    v-model="product.buyingPrice"
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    {{ formStatus.buyingPrice.message }}
                  </div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Selling Price ({{currency}})
                  </div>
                  <v-text-field
                    type="number"
                    @change="handleSellingPriceChange"
                    :error="!formStatus.sellingPrice.valid"
                    @keyup="resetError('sellingPrice')"
                    :hide-details="true"
                    v-model="product.sellingPrice"
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    {{ formStatus.sellingPrice.message }}
                  </div>
                </div>
              </v-col>
              <v-col class="!tw-py-2">
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Description
                  </div>
                  <v-textarea
                    :error="!formStatus.description.valid"
                    @keyup="resetError('description')"
                    :hide-details="true"
                    v-model="product.description"
                    variant="outlined"
                    density="compact"
                    color="primary-color"
                  ></v-textarea>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    {{ formStatus.description.message }}
                  </div>
                </div>
              </v-col>
              <v-col class="!tw-py-0" cols="12">
                <div class="tw-w-full tw-flex tw-gap-10 tw-items-center">
                    <span>Add Variants: </span>
                    <v-switch v-model="addVariants" color="primary-color" :hide-details="true"></v-switch>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="tw-border-l tw-border-r-neutral-700 tw-py-2"
          >
          <div class="tw-h-fit tw-mb-">
            <span class="tw-text-sm tw-text-neutral-600">Warehouse</span>
            <div class="tw-relative">
              <select 
              v-model="warehouse"
              @change="resetError('warehouse')"
                class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-400  tw-outline-0  tw-text-sm">
                <option :value="0">Select</option>
                <option v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.name }}</option>
              </select>
              <v-icon
                class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
            <div
                class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
              >
                {{ formStatus.warehouse.message }}
              </div>
          </div>

          <div v-if="!addVariants">
            <div class="md:tw-col-span-3 tw-col-span-12">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity</div>
              <v-text-field
                @change="handleQuantityChange"
                type="number"
                :error="!formStatus.quantity.valid"
                @keyup="resetError('quantity')"
                :hide-details="true"
                v-model="quantity"
                clearable
                clear-icon="mdi-close"
                class="tw-w-full"
                variant="outlined"
                color="primary-color"
                density="compact"
              ></v-text-field>
              <div
                class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
              >
                {{ formStatus.quantity.message }}
              </div>
            </div>
            <div class="md:tw-col-span-3 tw-col-span-12">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Stock Alert</div>
              <v-text-field
                @change="handleStockAlertChange"
                type="number"
                :error="!formStatus.stockAlert.valid"
                @keyup="resetError('stockAlert')"
                :hide-details="true"
                v-model="stockAlert"
                clearable
                clear-icon="mdi-close"
                class="tw-w-full"
                variant="outlined"
                color="primary-color"
                density="compact"
              ></v-text-field>
              <div
                class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
              >
                {{ formStatus.stockAlert.message }}
              </div>
            </div>
          </div>
            <div v-if="addVariants">
              <div class="tw-grid tw-grid-cols-12 md:tw-gap-3">
                <div class="md:tw-col-span-3 tw-col-span-12">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Size</div>
                  <v-text-field
                    :error="!formStatus.size.valid"
                    @keyup="resetError('size')"
                    :hide-details="true"
                    v-model="size"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    {{ formStatus.size.message }}
                  </div>
                </div>
                <div class="md:tw-col-span-3 tw-col-span-12">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Color</div>
                  <v-text-field
                    :error="!formStatus.color.valid"
                    @keyup="resetError('color')"
                    :hide-details="true"
                    v-model="color"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    {{ formStatus.color.message }}
                  </div>
                </div>
                <div class="md:tw-col-span-3 tw-col-span-12">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity</div>
                  <v-text-field
                    @change="handleQuantityChange"
                    type="number"
                    :error="!formStatus.quantity.valid && false"
                    @keyup="resetError('quantity')"
                    :hide-details="true"
                    v-model="quantity"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    <!-- {{ formStatus.quantity.message }} -->
                  </div>
                </div>
                <div class="md:tw-col-span-3 tw-col-span-12">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Stock Alert</div>
                  <v-text-field
                    @change="handleStockAlertChange"
                    type="number"
                    :error="!formStatus.stockAlert.valid"
                    @keyup="resetError('stockAlert')"
                    :hide-details="true"
                    v-model="stockAlert"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    {{ formStatus.stockAlert.message }}
                  </div>
                </div>
              </div>
              <div>
                <div class="tw-col-span-12 tw-flex tw-justify-end">
                  <button
                    :disabled="!quantity"
                    :class="{ 'bg-primary-color': quantity}"
                    @click="addVariant"
                    class="tw-bg-neutral-400 tw-py-1 tw-px-4 tw-flex tw-items-center tw-gap-1 tw-text-white tw-rounded-md"
                  >
                    <v-icon size="small" color="white">mdi-plus</v-icon>
                    <span class="tw-text-white">Add</span>
                  </button>
                </div>
              </div>
              <div class="">
                <div class="tw-flex tw-justify-between tw-items-center tw-mt-5">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Variants</div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Quantity Total: {{ qtyTotal }}
                  </div>
                </div>
                <div
                  v-if="variants.length == 0"
                  :class="{
                    'tw-bg-neutral-100 tw-text-neutral-500':
                      formStatus.variants.valid,
                    'tw-bg-red-100 tw-text-red-500': !formStatus.variants.valid,
                  }"
                  class="tw-text-center tw-mb-6 tw-w-full tw-py-3 tw-rounded-lg"
                >
                  {{
                    formStatus.variants.valid
                      ? "No Variants yet"
                      : formStatus.variants.message
                  }}
                </div>

                <div class="tw-max-w-full tw-overflow-x-auto" v-else>
                  <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
                    <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                        <tr>
                            <th v-for="column in ['size', 'color', 'qty','stockAlert' , 'actions']" :class="[column == 'actions' && '!tw-w-[40px]']" :key="column" scope="col" class="tw-px-6 tw-py-3 text-truncate">
                                <div class="tw-w-fit tw-flex tw-whitespace-nowrap tw-capitalize">
                                    {{ column }}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="variant in variants" :key="variant.id" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                            <th scope="row" class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900">
                                {{ variant.size }}
                            </th>
                            <td class="tw-px-6 tw-py-2">
                                {{ variant.color }}
                            </td>
                            <td class="tw-px-6 tw-py-2">
                                {{ variant.quantity }}
                            </td>
                            <td class="tw-px-6 tw-py-2">
                              {{ variant.stockAlert }}
                          </td>
                            <td class="tw-flex tw-items-center tw-px-6 tw-py-2 tw-space-x-3">
                                <div>
                                  <VariantActions @delete="deleteVariant" :variant="variant" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div>
              <h1 class="tw-font-medium">Deliveries</h1>
              <div class="tw-mt-2">
                <v-select
                v-model="selectedDeliveries"
                  :items="deliveries"
                  item-title="fullname"
                  item-value="id"
                  :hide-details="true"
                  chips
                  multiple
                  variant="outlined"
                  ></v-select>
              </div>
            </div>
          </v-col>

          <v-col cols="12">
            <div>
              <ProductOffers v-model:offers="offers" />
            </div>
          </v-col>
          
          <v-col cols="12">
            <div>
              <h1 class="tw-font-medium">Image</h1>
              <div class="tw-grid tw-grid-cols-12 tw-gap-5 tw-mt-2">
                  <div class="md:tw-col-span-6 tw-col-span-12 tw-relative tw-h-fit">
                    <label title="Click to upload" for="button2" class="tw-cursor-pointer tw-flex tw-items-center tw-gap-4 tw-px-6 tw-py-4 before:border-gray-400/60 hover:before:tw-border-gray-300 group dark:before:bg-darker dark:hover:before:tw-border-gray-500 before:tw-bg-gray-100 dark:before:tw-border-gray-600 before:tw-absolute before:tw-inset-0 before:tw-rounded-lg before:tw-border before:tw-border-dashed before:tw-transition-transform before:tw-duration-300 hover:before:tw-scale-100 active:tw-duration-75 active:before:tw-scale-95">
                      <div class="tw-w-max tw-relative">
                        <v-icon class="tw-text-6xl tw-text-orange-500">mdi-progress-upload</v-icon>
                          <!-- <img class="tw-w-12" src="https://www.svgrepo.com/show/485545/upload-cicle.svg" alt="file upload icon" width="512" height="512"> -->
                      </div>
                      <div class="tw-relative">
                          <span class="tw-block tw-text-base tw-font-semibold tw-relative tw-text-orange-600">
                              Upload a file
                          </span>
                          <span class="tw-mt-0.5 tw-block tw-text-sm tw-text-gray-500 dark:tw-text-gray-400">Max 2 MB</span>
                      </div>
                    </label>
                    <input @change="handleImageChange" class="tw-hidden" type="file" name="button2" id="button2">
                  </div>
                  <div class="md:tw-col-span-6 tw-col-span-12">
                    <div
                      class="image-preview tw-w-full tw-flex tw-items-center tw-justify-center tw-h-full border rounded p-4"
                      
                    >
                      <img
                        :class="{'tw-hidden': !image}"
                        ref="image"
                        id="image-preview"
                        alt="Image Preview"
                        class="w-full h-full tw-object-contain"
                      />
                      <div :class="{'tw-hidden': !!image}" class="bg-gray-300 h-48 flex items-center justify-center">
                        <span>No image available</span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </v-col>
        </v-row>

      </div>


      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Cancel</span>
        </v-btn>
        <v-btn
          @click="create"
          :loading="isLoading"
          color="primary-color"
          variant="flat"
          size="large"
        >
          <span class="text-white text-capitalize">Create</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { validateName, validateVariants } from "@/helpers/validators";
import Product from "@/api/Product";
import VariantActions from '@/views/product/VariantActions'
import Warehouse from '@/api/Warehouse';
import { currency } from '@/config/config';
import ProductOffers from '@/views/product/partials/ProductOffers'

export default {
  components: { VariantActions, ProductOffers },
  data() {
    return {
      currency,
      isLoading: false,
      isLoaded: false,
      addVariants : false,
      variantId: 1,
      variants: [
      ],

      image: '',
      imageFile: null,

      color: "",
      size: "",
      quantity: 0,
      warehouse: 0,
      stockAlert: 0,

      offers: [],

      product: {
        name: "",
        reference: "",
        buyingPrice: 0,
        sellingPrice: 0,
        description: "",
      },
      selectedDeliveries:[],

      formStatus: {
        name: {
          valid: true,
          message: "",
        },
        reference:{
          valid: true,
          message: "",
        },
        buyingPrice: {
          valid: true,
          message: "",
        },
        sellingPrice: {
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
        stockAlert: {
          valid: true,
          message: "",
        },
        description: {
          valid: true,
          message: "",
        },
        warehouse: {
          valid: true,
          message: "",
        },
        variants: {
          valid: true,
          message: "",
        },
      },
    };
  },

  computed: {
    qtyTotal() {
      let total = 0;
      this.variants.forEach((variant) => (total += parseInt(variant.quantity)));
      return total;
    },
    warehouses() {
      return this.$store.getters['warehouse/warehouses']
    },
    users() {
      return this.$store.getters['user/users']
    },
    deliveries() {
      return this.users.filter(u => u.role?.name == "delivery")
      .map(u => ({...u, fullname: u.firstname + ' ' + u.lastname}))
    }
  },

  methods: {
    create() {
      if (!this.validate()) return false;

      this.isLoading = true; 

      let product = this.product;
      
      product.addVariants = this.addVariants;
      product.image = this.image;
      product.offers = this.offers;
      product.selectedDeliveries = this.selectedDeliveries.map(i => ({delivery_id: i}));

      if(!this.addVariants) {
        const variants = [{
              id: this.variantId,
              color: null,
              size: null,
              quantity: this.quantity,
              warehouse_id: this.warehouse,
              stockAlert: this.stockAlert
            }]
        product.variants = variants;
      } else {
        product.variants = this.variants;
      }

      Product.create(product)
        .then((res) => {
          if (res.data.code == "PRODUCT_CREATED") {
            this.$alert({
              type: "success",
              title: res.data.message,
            });

            this.product = {
              name: "",
              reference: "",
              buyingPrice: 0,
              sellingPrice: 0,
              description: "",
            };

            this.offers = [];
            this.selectedDeliveries = [];
            this.variants = [];

            this.$store.dispatch('product/addProduct', res.data.data.product)
        }
        if (res.data.code == "VALIDATION_ERROR") {
            this.$alert({
              type: "warning",
              title: res.data.errors.ref,
            });
          }
        })
        .catch((err) => {
          this.$handleApiError(err);
        })
        .finally(() => (this.isLoading = false));
    },

    handleImageChange(event) {
      const file = event.target.files[0];
      // this.imageFile = file;
      this.image = file;

      const img = this.$refs.image

      if (file) {
          const reader = new FileReader();
          reader.addEventListener('load', function() {
            img.src = this.result
          });
          reader.readAsDataURL(file);
        }
    },

    resetError(field) {
      this.formStatus[field] = {
        valid: true,
        message: "",
      };
    },

    validate() {
      this.formStatus.name = validateName(this.product.name, "Product name");
      this.formStatus.reference = validateName(this.product.reference , "Reference")
      this.formStatus.buyingPrice = validateName(
        this.product.buyingPrice,
        "Buying price"
      );
      this.formStatus.quantity = validateName(
        this.quantity,
        "Quantity"
      );
      this.formStatus.sellingPrice = validateName(
        this.product.sellingPrice,
        "Selling price"
      );
      this.formStatus.description = validateName(
        this.product.description,
        "Description"
      );
      this.formStatus.variants = validateVariants(this.variants);

      if(!this.addVariants) {
        this.formStatus.warehouse = {
          valid: this.warehouse != 0,
          message: this.warehouse != 0 ? '' : 'Please select a warehouse'
        }
      }

      return (
        this.formStatus.name.valid &&
        this.formStatus.buyingPrice.valid &&
        this.formStatus.reference.valid &&
        this.formStatus.sellingPrice &&
        this.formStatus.description.valid &&
        (this.addVariants ? this.formStatus.variants.valid : true) &&
        (this.addVariants ? true : this.formStatus.quantity.valid) &&
        (this.addVariants ? true : this.formStatus.warehouse.valid)
      );
    },

    addVariant() {

      this.formStatus.warehouse = {
        valid: this.warehouse != 0,
        message: this.warehouse != 0 ? '' : 'Please select a warehouse'
      }

      if(!this.formStatus.warehouse.valid) {
        return false;
      }

      const variant = {
        id: this.variantId,
        color: this.color.toUpperCase(),
        size: this.size.toUpperCase(),
        quantity: this.quantity,
        warehouse_id: this.warehouse,
        stockAlert: this.stockAlert
      };

      this.variants.push(variant);

      this.variantId++;

      this.stockAlert = 0,
      this.color = "";
      this.size = "";
      this.quantity = 0;
    },

    deleteVariant(id) {
      this.variants = this.variants.filter((item) => item.id !== id);
    },

    handleQuantityChange() {
      if (this.quantity <= 0) {
        this.quantity = 0;
      }
    },

    handleStockAlertChange() {
      if (this.stockAlert <= 0) {
        this.stockAlert = 0;
      }
    },

    handleSellingPriceChange() {
      if (this.product.sellingPrice <= 0) {
        this.product.sellingPrice = 0;
      }
    },

    handleBuyingPriceChange() {
      if (this.product.buyingPrice <= 0) {
        this.product.buyingPrice = 0;
      }
    },

    getWarhouses() {
      this.isLoaded = false;
      return Warehouse.all()
      .then(
        res => {
          if(res.data.code == 'SUCCESS') {
            this.$store.dispatch('warehouse/setWarehouses', res.data.data.warehouses)
            this.isLoaded = true;
          }
        },
        this.$handleApiError
      )
    }
  },

  mounted() {
    this.getWarhouses()
  }
};
</script>

<style></style>
