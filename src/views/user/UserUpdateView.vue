<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">
        Update User
      </h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Update user informations</h2>
    </div>

    <div v-if="!isFormReady">
      <LoadingAnimation />
    </div>

    <div
      v-if="isFormReady"
      class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md"
    >
        <div class="tw-flex tw-gap-2 tw-text-neutral-800 tw-items-center tw-mb-5">
            User ID: <span class="tw-block tw-py-1 tw-px-2 tw-rounded-md text-primary-color">{{ id }}</span>
        </div>
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
                    :error-messages="formStatus.firstname.message"
                    v-model="firstname"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Last Name</div>
                  <v-text-field
                    :error-messages="formStatus.lastname.message"
                    v-model="lastname"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Email</div>
                  <v-text-field
                    :error-messages="formStatus.email.message"
                    v-model="email"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Phone Number
                  </div>
                  <v-text-field
                    :error-messages="formStatus.phone.message"
                    v-model="phone"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                </div>
              </v-col>

              

              <v-col class="!tw-py-0" cols="12">
                <div class="tw-w-full tw-flex tw-gap-10 tw-items-center">
                    <span>Update Password: </span>
                    <v-switch v-model="updatePassword" color="primary-color" :hide-details="true"></v-switch>
                </div>
              </v-col>
              <v-col v-if="updatePassword" class="!tw-py-2" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Password</div>
                  <v-text-field
                    :error-messages="formStatus.password.message"
                    v-model="password"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col v-if="updatePassword" class="!tw-py-2 tw-pt-0" cols="12" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">
                    Confirm Password
                  </div>
                  <v-text-field
                    :error-messages="formStatus.confirmPassword.message"
                    v-model="confirmPassword"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
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
                    :error-messages="formStatus.role"
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
                    v-model="status"
                    color="primary-color"
                    :hide-details="true"
                    flat
                  ></v-switch>
                </div>
              </v-col>
              <v-col v-if="isMarketer" class="!tw-py-2" cols="12" md="6">
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Commission</div>
                  <v-text-field
                    :error="!formStatus.commission.valid"
                    :hide-details="true"
                    @keyup="resetError('commission')"
                    v-model="commission"
                    type="number"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{ formStatus.commission.message }}</div>
                </div>
              </v-col>
              <v-col v-if="isAgente" class="!tw-py-2" cols="12" md="6">
                <div>
                  <!-- <div>
                    <v-switch v-model="isMultipleProducts" color="primary-color" label="Multiple Products"></v-switch>
                  </div> -->
                  <div>
                    <v-switch v-model="isHavingAllProducts" color="primary-color" label="All Products"></v-switch>
                  </div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Product</div>
                  <!-- <div v-if="!isMultipleProducts">
                    <select v-model="product" 
                    class="tw-w-full tw-py-[7px] focus:tw-border-orange-500 tw-px-4 tw-border tw-outline-orange-500 tw-border-neutral-400 tw-border-solid tw-rounded-md">
                      
                      <option :value="p.id" v-for="p in selectProducts" :key="p.id">
                        {{ p.name }}
                      </option>
                    </select>
                  </div> -->
                  <div>
                    <v-autocomplete
                    :disabled="isHavingAllProducts"
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
              <v-col v-if="isDelivery" class="!tw-py-2" cols="12" md="12">
                <div>
                  <div class="mb-1 text-body-2 tw-text-zinc-700">City</div>
                  <select v-model="city" class="tw-w-full tw-py-[7px] focus:tw-border-orange-500 tw-px-4 tw-border tw-outline-orange-500 tw-border-neutral-400 tw-border-solid tw-rounded-md">
                    
                    <option :value="c.id" v-for="c in cities" :key="c.id">
                      {{ c.name }}
                    </option>
                  </select>
                </div>
              </v-col>

              
            </v-row>
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
      </div>

      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn link :to="{ name: 'user/list' }" color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Cancel</span>
        </v-btn>
        <v-btn
          @click="update"
          :loading="isLoading"
          color="primary-color"
          variant="flat"
          size="large"
        >
          <span class="text-white text-capitalize">Update</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/api/User";
import { serverUrl } from '@/config/config'
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "@/helpers/validators";
import Product from '@/api/Product';
// import apiErrorHandler from '@/helpers/apiErrorHandler'

export default {
  data() {
    return {
      serverUrl,
      isFetched: false,
      isRolesFetched: false,
      isUserFetched: false,
      isProductsFetched: false,
      isLoading: false,

      updatePassword: false,

      autoId: 1,
      cities: [],
      deliveryCity: 1,
      deliveryCityFee: 0,
      city: 1,
      deliveryCities: [
      ],


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
        commission: {
          valid: true,
          message: "",
        },
        confirmPassword: {
          valid: true,
          message: "",
        },
      },

      id: null,
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      user_image: null,
      status: false,
      product: null,
      commission: 0,

      products: [],
      selectedProducts: [],
      isMultipleProducts: false,
      isHavingAllProducts: false


    };
  },

  computed: {
    roles() {
      return this.$store.getters["user/roles"];
    },
    isFormReady() {
        return this.isFetched
    },
    isAgente() {
      return this.role === 2;
    },
    isDelivery() {
      return this.role === 3;
    },
    isMarketer() {
      return this.roles.find(r => r.name.toLocaleLowerCase() == 'marketer')?.id == this.role;
    },
    user() {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone,
            email: this.email,
            password: this.password,
            product_id: this.product,
            deliveryCities: this.deliveryCities,
            commission: this.commission,
            city: this.city,
            role: this.role,
            status: this.status ? 1 : 0,
        }
    },
    selectProducts() {
      if(this.isMultipleProducts) {
        return [...this.products]
      }
      // return [{ id: 0, name: 'All' },...this.products]
      return [...this.products]
    },
    userProducts() {
      // if(this.isMultipleProducts) {
      //   return this.selectedProducts
      // }
      return this.selectedProducts
    }
  },

  watch: {
    role(newValue) {
      console.log('changed');
      if((newValue === 2 && this.products.length === 0)) {
        this.isProductsFetched = false
        
      }
    }
  },

  methods: {
    update() {
      if (!this.validate()) {
        return false;
      }
      const user = {
        ...this.user, 
        role: this.role, 
        product_id: this.userProducts, 
        city: this.city, 
        deliveryCities: this.deliveryCities,
        having_all: this.isHavingAllProducts
        };

      this.isLoading = true;
      User.update(user, this.updatePassword)
        .then((res) => {
          if (res.data.code == "USER_UPDATED") {
            this.$alert({
              type: "success",
              title: res.data.message,
            });

          }
        })
        .catch(err => {
            this.$handleApiError(err);

          const res = err?.response?.data;
            console.log(err);
          switch (res?.code) {
            case "VALIDATION_ERROR":
              for (let error in res.error) {
                this.formStatus[error] = {
                  valid: false,
                  message: res.error[error][0],
                };
              }
              break;
          }
          return err
        })
        .catch(this.$handleApiError)
        .finally(() => {
          this.isLoading = false;
        });
    },

    validate() {
      this.formStatus["email"] = validateEmail(this.email);
      this.formStatus["firstname"] = validateName(this.firstname);
      this.formStatus["lastname"] = validateName(this.lastname);
      this.formStatus["phone"] = validateName(this.phone);
      this.formStatus["password"] = validatePassword(this.password);
      this.formStatus["confirmPassword"] = validateConfirmPassword(
        this.password,
        this.confirmPassword
      );

      const emailValid = this.formStatus["email"].valid;
      const firstnameValid = this.formStatus["firstname"].valid;
      const lastnameValid = this.formStatus["lastname"].valid;
      const phoneValid = this.formStatus["phone"].valid;
      if (this.updatePassword) {
            const passwordValid = this.formStatus["password"].valid;
            const confirmPasswordValid = this.formStatus["confirmPassword"].valid;
            return (
                emailValid &&
                firstnameValid &&
                lastnameValid &&
                passwordValid &&
                confirmPasswordValid &&
                phoneValid
            );
      }


      return (
        emailValid &&
        firstnameValid &&
        lastnameValid &&
        phoneValid
      );
    },

    removeCity(id) {
      this.deliveryCities = this.deliveryCities.filter(i => i.id !== id)
    },

    handleAddCity() {
      if(this.deliveryCityFee <= 0) return false;

      this.deliveryCities.push(
        {
          id: this.autoId,
          city_id: this.deliveryCity,
          fee: this.deliveryCityFee
        }
      )
      this.autoId += 1;

      this.deliveryCity = 1;
      this.deliveryCityFee = 0;
    },

    async getRoles() {
        await User.roles()
            .then((res) => {
            if (res?.data.code == "SUCCESS") {
                const roles = res.data.data.roles;
                this.$store.dispatch("user/setRoles", roles);
                this.isRolesFetched = true
            }
            }).catch(this.$handleApiError)
    },

    async getUser() {
            return User.getUser(this.$route.params.id)
              .then((res) => {
                if (res?.data.code == "USER_SUCCESS") {
                  const user = res.data.data.user;
                  this.id = user.id
                  this.firstname = user.firstname
                  this.lastname = user.lastname
                  this.email = user.email
                  this.phone = user.phone
                  this.role = user.role
                  this.commission = user.commission

                  if (user.role == 2) {
                    this.isHavingAllProducts = user.having_all == 1;

                        this.selectedProducts = user?.product
                    //   if(user?.product.length >= 1) {
                    //     if(user?.product.length == 1) {
                    //     this.product = user?.product[0]
                    //     this.isMultipleProducts = false
                    //   } else {
                    //     this.isMultipleProducts = true
                    //   }
                    // }
                  }

                  this.user_image = user.photo
                  this.status = user.status == 1 ? true : false
                  this.isUserFetched = true
                  if (user.role == 3) {
                    console.log('this is delivery');
                    this.city = user?.city?.id
                    let id = 0;
                    this.deliveryCities = user.deliveryPlaces.map(
                      item =>  {
                        if (parseInt(item.id) >= id) {
                          id = parseInt(item.id) + 1
                        }
                        return { id: item.id, city_id: item.city_id, fee: parseInt(item.fee) }
                      }
                    );

                    this.autoId = id;
                  }
                }
            })
            .catch(this.$handleApiError)
            
    },

    async getProducts() {
      return Product.all().then(
        res => {
          this.products = res.data.data.products
          if(this.products.length > 0) {
            this.product = this.user.product_id
          } else {
            this.product = null
          }
          this.isProductsFetched = true
        },
        err => this.$handleApiError(err)
      )
    },
    async getCities() {
      return User.cities().then(
          res => {
            console.log(res.data);
            this.cities = res.data.data
          }
        )
    }
  },

  async mounted() {
    if (this.roles.length == 0) {
      await this.getRoles();
    } else {
      this.isRolesFetched = true
    }

    Promise.allSettled([this.getRoles(), this.getProducts(), this.getCities(), this.getUser()])
    .then(
      () => {
        if(this.selectedProducts.length == this.products.length) {
          this.product = 0
          this.isMultipleProducts = false
        }
        this.isFetched = true
        },
      err => this.$handleApiError(err)
    )
    
  },
};
</script>

<style>
</style>