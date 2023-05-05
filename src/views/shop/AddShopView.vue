<template>
    <div>
      <div class="mb-5">
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">
          Add Shop
        </h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Create new shop</h2>
      </div>
  
      <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
        <div>
          <v-row>
            <v-col cols="12" md="6">
              <v-row>
                <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                  <div class="tw-w-full">
                    <div class="mb-1 text-body-2 tw-text-zinc-700">
                      Shop Name
                    </div>
                    <v-text-field
                      :error="!formStatus.name.valid"
                      @keyup="resetError('name')"
                      :hide-details="true"
                      v-model="shop.name"
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
              </v-row>
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
  import { validateName } from "@/helpers/validators";
  import Shop from "@/api/Shop";
  
  export default {
    components: {  },
    data() {
      return {
        isLoading: false,
  
  
        shop: {
          name: "",
        },
  
        formStatus: {
          name: {
            valid: true,
            message: "",
          },
        },
      };
    },
  
  
    methods: {
      create() {
        if (!this.validate()) return false;
  
        this.isLoading = true;
  
        let shop = this.shop;
       
  
        Shop.create(shop)
          .then((res) => {
            if (res.data.code == "SHOP_CREATED") {
              this.$alert({
                type: "success",
                title: res.data.message,
              });
  
              this.shop = {
                name: "",
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
        this.formStatus.name = validateName(this.shop.name, "Shop name");
     
  
        return (
          this.formStatus.name.valid 
        );
      },
  
    },
  };
  </script>
  
  <style></style>
  