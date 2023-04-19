<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">
        Add Product
      </h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Create new product</h2>
    </div>

    <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
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
                    :error="!formStatus.quantity.valid"
                    @keyup="resetError('quantity')"
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
                    {{ formStatus.quantity.message }}
                  </div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Buying Price (DH)
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
                    Selling Price (DH)
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
            </v-row>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="tw-border-l tw-border-r-neutral-700 tw-py-2"
          >
            <div>
              <div class="tw-grid tw-grid-cols-12 md:tw-gap-3">
                <div class="md:tw-col-span-4 tw-col-span-12">
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
                <div class="md:tw-col-span-4 tw-col-span-12">
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
                <div class="md:tw-col-span-4 tw-col-span-12">
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
              </div>
              <div>
                <div class="tw-col-span-12 tw-flex tw-justify-end">
                  <button
                    :disabled="!size || !color || !quantity"
                    :class="{ 'bg-primary-color': size && color && quantity }"
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
                            <th v-for="column in ['size', 'color', 'qty', 'actions']" :class="[column == 'actions' && '!tw-w-[40px]']" :key="column" scope="col" class="tw-px-6 tw-py-3 text-truncate">
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
export default {
  components: { VariantActions },
  data() {
    return {
      isLoading: false,

      variantId: 1,
      variants: [
      ],

      color: "",
      size: "",
      quantity: 0,

      product: {
        name: "",
        reference: "",
        buyingPrice: 0,
        sellingPrice: 0,
        description: "",
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
        description: {
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
  },

  methods: {
    create() {
      if (!this.validate()) return false;

      this.isLoading = true;

      let product = this.product;
      product.variants = this.variants;

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

            this.variants = [];
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

    resetError(field) {
      this.formStatus[field] = {
        valid: true,
        message: "",
      };
    },

    validate() {
      this.formStatus.name = validateName(this.product.name, "Product name");
      this.formStatus.buyingPrice = validateName(
        this.product.buyingPrice,
        "Buying price"
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

      return (
        this.formStatus.name.valid &&
        this.formStatus.buyingPrice.valid &&
        this.formStatus.sellingPrice &&
        this.formStatus.description.valid &&
        this.formStatus.variants.valid
      );
    },

    addVariant() {

      const variant = {
        id: this.variantId,
        color: this.color.toUpperCase(),
        size: this.size.toUpperCase(),
        quantity: this.quantity,
      };

      this.variants.push(variant);

      this.variantId++;

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
  },
};
</script>

<style></style>
