<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">
        Settings
      </h1>
      <!-- <h2 class="tw-text-gray-500 tw-text-sm">Update user informations</h2> -->
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
          <v-col cols="12" md="12">
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
                    readonly
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
          v-if="$can('update_account')"
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
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "@/helpers/validators";
export default {
  data() {
    return {
      serverUrl,
      isFetched: false,
      isUserFetched: false,
      isLoading: false,

      updatePassword: false,



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

      id: null,
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',


    };
  },

  computed: {
    isFormReady() {
        return this.isFetched
    },
    user() {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone,
            password: this.password,
        }
    }
  },

  methods: {
    update() {
      if (!this.validate()) {
        return false;
      }

      this.isLoading = true;
      User.updateProfile(this.user, this.updatePassword)
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
      this.formStatus["firstname"] = validateName(this.firstname);
      this.formStatus["lastname"] = validateName(this.lastname);
      this.formStatus["phone"] = validateName(this.phone);
      this.formStatus["password"] = validatePassword(this.password);
      this.formStatus["confirmPassword"] = validateConfirmPassword(
        this.password,
        this.confirmPassword
      );

      const firstnameValid = this.formStatus["firstname"].valid;
      const lastnameValid = this.formStatus["lastname"].valid;
      const phoneValid = this.formStatus["phone"].valid;
      if (this.updatePassword) {
            const passwordValid = this.formStatus["password"].valid;
            const confirmPasswordValid = this.formStatus["confirmPassword"].valid;
            return (
                firstnameValid &&
                lastnameValid &&
                passwordValid &&
                confirmPasswordValid &&
                phoneValid
            );
      }

      return (
        firstnameValid &&
        lastnameValid &&
        phoneValid
      );
    },

    async getUser() {
            return User.profile()
              .then((res) => {
                if (res?.data.code == "USER_SUCCESS") {
                  const user = res.data.data.user;
                  this.id = user.id
                  this.firstname = user.firstname
                  this.lastname = user.lastname
                  this.email = user.email
                  this.phone = user.phone
                  this.isUserFetched = true
                }
            })
            .catch(this.$handleApiError)
            
    },

  },

  async mounted() {

    Promise.allSettled([this.getUser()])
    .then(
      () => this.isFetched = true,
      err => this.$handleApiError(err)
    )

    
  },
};
</script>

<style>
</style>