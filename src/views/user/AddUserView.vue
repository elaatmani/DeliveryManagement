<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">
        Add User
      </h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Create new user</h2>
    </div>

    <div v-if="!isFormReady">
      <LoadingAnimation />
    </div>

    <div
      v-if="isFormReady"
      class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md"
    >
      <div>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    First Name
                  </div>
                  <v-text-field
                    :error="!formStatus.firstname.valid"
                    :hide-details="true"
                    @keyup="resetError('firstname')"
                    v-model="user.firstname"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.firstname.message }}</div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Last Name</div>
                  <v-text-field
                    :error="!formStatus.lastname.valid"
                    :hide-details="true"
                    @keyup="resetError('lastname')"
                    v-model="user.lastname"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.lastname.message }}</div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Email</div>
                  <v-text-field
                    :error="!formStatus.email.valid"
                    :hide-details="true"
                    @keyup="resetError('email')"
                    v-model="user.email"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.email.message }}</div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Phone Number
                  </div>
                  <v-text-field
                    :error="!formStatus.phone.valid"
                    :hide-details="true"
                    @keyup="resetError('phone')"
                    v-model="user.phone"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.phone.message }}</div>
                </div>
              </v-col>
              <v-col v-if="isAgente" class="!tw-py-2" cols="12" md="6">
                <div>
                  <div>
                    <v-switch v-model="isMultipleProducts" color="primary-color" label="Multiple Products"></v-switch>
                  </div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Product</div>
                  <div v-if="!isMultipleProducts">
                    <select v-model="product" 
                    class="tw-w-full tw-py-[7px] focus:tw-border-orange-500 tw-px-4 tw-border tw-outline-orange-500 tw-border-neutral-400 tw-border-solid tw-rounded-md">
                      
                      <option :value="p.id" v-for="p in selectProducts" :key="p.id">
                        {{ p.name }}
                      </option>
                    </select>
                  </div>
                  <div v-else>
                    <v-autocomplete
                    v-model="selectedProducts"
                    filter-keys="name"
                      density="compact"
                      item-value="id"
                      item-title="name"
                      variant="outlined"
                      color="primary-color"
                      chips
                      :items="selectProducts"
                      multiple
                    ></v-autocomplete>
                    <!-- <v-select
                      v-model="selectedProducts"
                      :items="selectProducts"
                      density="compact"
                      item-value="id"
                      item-title="name"
                      variant="outlined"
                      color="primary-color"
                      chips
                      :hide-details="true"
                      multiple
                    ></v-select> -->
                  </div>
                </div>
              </v-col>
              <v-col v-if="isDelivery" class="!tw-py-2" cols="12" md="6">
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">City</div>
                  <select v-model="city" class="tw-w-full tw-py-[7px] focus:tw-border-orange-500 tw-px-4 tw-border tw-outline-orange-500 tw-border-neutral-400 tw-border-solid tw-rounded-md">
                    
                    <option :value="c.id" v-for="c in cities" :key="c.id">
                      {{ c.name }}
                    </option>
                  </select>
                </div>
              </v-col>
              <v-col v-if="isDelivery" class="!tw-py-2" cols="12" md="6">
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Delivery cities</div>
                  <select v-model="deliveryCity" class="tw-w-full tw-py-[7px] focus:tw-border-orange-500 tw-px-4 tw-border tw-outline-orange-500 tw-border-neutral-400 tw-border-solid tw-rounded-md">
                    
                    <option :value="c.id" v-for="c in cities" :key="c.id">
                      {{ c.name }}
                    </option>
                  </select>
                  <div class="mb-1 my-2 text-body-2 tw-text-zinc-700">Fee</div>
                  <v-text-field
                    :hide-details="true"
                    v-model="deliveryCityFee"
                    clearable
                    type="number"
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <v-btn @click="handleAddCity" class="tw-text-white tw-my-3" variant="flat" color="primary-color" block>
                    <span class="text-white">Add</span>
                  </v-btn>
                </div>
              </v-col>

              
              
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Role</div>
                  <v-select
                    class="text-capitalize"
                    :items="roles"
                    item-title="name"
                    item-value="id"
                    v-model="role"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-select>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-flex tw-gap-10 tw-h-full tw-items-center">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Status:</div>
                  <v-switch
                    v-model="user.status"
                    color="primary-color"
                    :hide-details="true"
                    flat
                  ></v-switch>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Password</div>
                  <v-text-field
                    :error="!formStatus.password.valid"
                    :hide-details="true"
                    @keyup="resetError('password')"
                    v-model="user.password"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.password.message }}</div>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Confirm Password
                  </div>
                  <v-text-field
                    :error="!formStatus.confirmPassword.valid"
                    :hide-details="true"
                    @keyup="resetError('confirmPassword')"
                    v-model="user.confirmPassword"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.confirmPassword.message }}</div>
                </div>
              </v-col>
              <v-col v-if="isDelivery" class="!tw-py-2" cols="12" md="6">
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Delivery cities</div>
                  <div>
                    <div class="tw-flex tw-items-center tw-gap-2" v-for="c in deliveryCities" :key="c">
                      <div>
                      {{  cities.filter(i => i.id == c.city_id)[0]?.name }}
                      </div>
                      <div>
                        {{ c.fee }} DH
                      </div>
                      <div>
                        <v-icon color="red" @click="removeCity(c.id)" size="x-small">mdi-delete</v-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn link to="/" color="grey-darken-2" variant="flat" size="large">
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
import User from "@/api/User";
import { localUrl } from '@/config/config'
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "@/helpers/validators";
import Product from '@/api/Product';

export default {
  data() {
    return {
      localUrl,
      isFormReady: false,
      isLoading: false,

      city: 1,

      isMultipleProducts: false,

      id: 1,
      deliveryCity: 1,
      deliveryCityFee: 0,
      deliveryCities: [
      ],
      
      product: 0,
      selectedProducts: [],

      formStatus: {
        firstname: {
          valid: true,
          message: "",
        },
        lastname: {
          valid: true,
          message: "",
        },
        phone: {
          valid: true,
          message: "",
        },
        email: {
          valid: true,
          message: "",
        },
        password: {
          valid: true,
          message: "",
        },
        confirmPassword: {
          valid: true,
          message: "",
        },
      },

      user: {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: true,
      },
      role: 3
    };
  },

  computed: {
    roles() {
      return this.$store.getters["user/roles"];
    },
    rolesFetched() {
      return this.$store.getters["user/fetchedRoles"];
    },
    
    cities() {
      return this.$store.getters['city/cities']
    },
    
    citiesFetched() {
      return this.$store.getters['city/fetched']
    },

    products() {
      return this.$store.getters['product/products']
    },

    productsFethched() {
      return this.$store.getters['product/fetched']
    },

    isAgente() {
      return this.role === 2;
    },

    isDelivery() {
      return this.role === 3;
    },
    selectProducts() {
      if(this.isMultipleProducts) {
        return [...this.products]
      }
      return [{ id: 0, name: 'All' },...this.products]
    },
    userProducts() {
      if(this.isMultipleProducts) {
        return this.selectedProducts
      }
      return [this.product]
    }
  },

  watch: {
  },

  methods: {

    removeCity(id) {
      this.deliveryCities = this.deliveryCities.filter(i => i.id !== id)
    },

    handleAddCity() {
      if(this.deliveryCityFee <= 0) return false;

      this.deliveryCities.push(
        {
          id: this.id,
          city_id: this.deliveryCity,
          fee: this.deliveryCityFee
        }
      )
      this.id += 1;

      this.deliveryCity = 1;
      this.deliveryCityFee = 0;
    },
    create() {
      if (!this.validate()) {
        return false;
      }

      this.isLoading = true;
      const user = {
        ...this.user, 
        role: this.role, 
        product_id: this.userProducts, 
        city: this.city, 
        deliveryCities: this.deliveryCities};
      User.register(user)
        .then((res) => {
          if (res.data.code == "USER_CREATED") {
            this.$alert({
              type: "success",
              title: res.data.message,
            });

            this.user = {
              firstname: "",
              lastname: "",
              phone: "",
              email: "",
              password: "",
              confirmPassword: "",
              status: true,
            };

            this.role = 3;
            this.product_id = null
            this.deliveryCities = []
            this.id = 1;
          }
        })
        .catch((err) => {
            this.$handleApiError(err);
          const res = err?.response?.data;

          if (res?.code == 'VALIDATION_ERROR'){
              for (let error in res.error) {
                this.formStatus[error] = {
                  valid: false,
                  message: res.error[error][0],
                };
              }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },


    resetError(field) {
      this.formStatus[field] = {
        valid: true,
        message: ''
      }
    },

    validate() {
      this.formStatus.email = validateEmail(this.user.email);
      this.formStatus.firstname = validateName(this.user.firstname);
      this.formStatus.lastname = validateName(this.user.lastname);
      this.formStatus.phone = validateName(this.user.phone);
      this.formStatus.password = validatePassword(this.user.password);
      this.formStatus.confirmPassword = validateConfirmPassword(
        this.user.password,
        this.user.confirmPassword
      );

      const emailValid = this.formStatus.email.valid;
      const firstnameValid = this.formStatus.firstname.valid;
      const lastnameValid = this.formStatus.lastname.valid;
      const phoneValid = this.formStatus.phone.valid;
      const passwordValid = this.formStatus.password.valid;
      const confirmPasswordValid = this.formStatus.confirmPassword.valid;
      return (
        emailValid &&
        firstnameValid &&
        lastnameValid &&
        passwordValid &&
        confirmPasswordValid &&
        phoneValid
      );
    },

    getRoles() {
      if(this.rolesFetched) {
        return new Promise((resolve) => resolve())
      }

      return User.roles()
        .then((res) => {
          if (res?.data.code == "SUCCESS") {
            const roles = res.data.data.roles;
            this.$store.dispatch("user/setRoles", roles);
            this.$store.dispatch("user/setFetchedRoles", true);
          }
        })
        .catch(this.$handleApiError);
    },

    async getCities() {
      if(this.citiesFetched) {
        return new Promise((resolve) => resolve())
      }

      return User.cities().then(
          res => {
            this.$store.dispatch('city/cities', res.data.data)
            this.$store.dispatch('city/setFetched', true)

          }
        )
    },

    async getProducts() {
      if(this.productsFethched) {
        return new Promise((resolve) => resolve());
      }

      return Product.all().then(
        res => {
          this.$store.dispatch('product/setProducts', res.data.data.products)
          this.$store.dispatch('product/setFetched', true)
        },
        err => this.$handleApiError(err)
      )
    }
  },

  mounted() {
    Promise.allSettled([this.getRoles(), this.getCities(), this.getProducts()])
    .then(
      res => {
        console.log(res)
        this.isFormReady = true
        },
      err => this.$handleApiError(err)
    )
  },
};
</script>

<style>
</style>