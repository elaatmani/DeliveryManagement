<template>
    <div>
        <div class="mb-5">
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Add User</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Create new user</h2>
        </div>

        <div v-if="!isFormReady">
            <LoadingAnimation />
        </div>

        <div v-if="isFormReady" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
        <div>
            <v-row>
                <v-col cols="12" md="6">
                    <v-row>
                        <v-col class="!tw-py-2" cols="12" md="6">
                            <div class="tw-w-full">
                            <div class="mb-1 text-body-2 tw-text-zinc-700">First Name</div>
                            <v-text-field :error-messages="formStatus.firstname.message" v-model="user.firstname" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
                            </div>
                        </v-col>
                        <v-col class="!tw-py-2" cols="12" md="6">
                            <div class="tw-w-full">
                            <div class="mb-1 text-body-2 tw-text-zinc-700">Last Name</div>
                            <v-text-field :error-messages="formStatus.lastname.message" v-model="user.lastname" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
                            </div>
                        </v-col>
                        <v-col class="!tw-py-2" cols="12" md="6">
                            <div class="tw-w-full">
                                <div class="mb-1 text-body-2 tw-text-zinc-700">Email</div>
                                <v-text-field :error-messages="formStatus.email.message" v-model="user.email" clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
                            </div>
                        </v-col>
                        <v-col class="!tw-py-2" cols="12" md="6">
                            <div class="tw-w-full">
                            <div class="mb-1 text-body-2 tw-text-zinc-700">Phone Number</div>
                            <v-text-field :error-messages="formStatus.phone.message" v-model="user.phone" clearable clear-icon="mdi-close"  class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
                            </div>
                        </v-col>
                        <v-col class="!tw-py-2" cols="12" md="6">
                            <div class="tw-w-full">
                            <div class="mb-1 text-body-2 tw-text-zinc-700">Password</div>
                            <v-text-field :error-messages="formStatus.password.message" v-model="user.password" clearable clear-icon="mdi-close"  class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
                            </div>
                        </v-col>
                        <v-col class="!tw-py-2" cols="12" md="6">
                            <div class="tw-w-full">
                            <div class="mb-1 text-body-2 tw-text-zinc-700">Confirm Password</div>
                            <v-text-field :error-messages="formStatus.confirmPassword.message" v-model="user.confirmPassword" clearable clear-icon="mdi-close"  class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="6">
                        <v-row>
                            <v-col class="!tw-py-2" cols="12" md="6">
                                <div>
                                    <div class="mb-1 text-body-2 tw-text-zinc-700">Role</div>
                                    <v-select class="text-capitalize" :error-messages="formStatus.role" :items="roles" item-title="name" item-value="id" v-model="user.role" variant="outlined" color="primary-color" density="compact"></v-select>            
                                </div>
                            </v-col>
                            <v-col class="!tw-py-2" cols="12" md="6">
                                <div class="tw-flex tw-gap-10 tw-h-full tw-items-center">
                                <div class="mb-1 text-body-2 tw-text-zinc-700">Status: </div>
                                <v-switch v-model="user.status" color="primary-color" :hide-details="true" flat></v-switch>
                                </div>
                            </v-col>
                        </v-row>
                </v-col>
            </v-row>
            
        </div>

        

        <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
            <v-btn link to='/' color="grey-darken-2" variant="flat" size="large">
            <span class="text-white text-capitalize">Cancel</span>
            </v-btn>
            <v-btn @click="create" :loading="isLoading" color="primary-color" variant="flat" size="large">
            <span class="text-white text-capitalize">Create</span>
            </v-btn>
        </div>
        </div>
    </div>
</template>

<script>
import User from '@/api/User'
import { validateEmail, validateName, validatePassword, validateConfirmPassword } from '@/helpers/validators'

export default {
    data() {
      return {
        isFormReady: false,
        isLoading: false,

        formStatus: {
            firstname: {
                valid: true,
                message: ''
            },
            lastname: {
                valid: true,
                message: ''
            },
            phone: {
                valid: true,
                message: ''
            },
            email: {
                valid: true,
                message: ''
            },
            password: {
                valid: true,
                message: ''
            },
            confirmPassword: {
                valid: true,
                message: ''
            },
        },

        user: {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 2,
            status: true
        },

        roles: [],
      }
    },

    methods: {
        create() {
            
            console.log(this.validate());
            if (!this.validate()) {
                return false;
            }

            this.isLoading = true
            User.register(this.user).then(
                res => {
                    if (res.data.code == 'USER_CREATED') {
                        this.$alert({
                            type: 'success',
                            title: res.data.message
                        })

                        this.user = {
                            firstname: '',
                            lastname: '',
                            phone: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            role: 2,
                            status: true
                        }
                    }
                    
                }
            ).catch(
                err => {
                    const res = err?.response?.data

                    switch (res?.code) {
                        case 'VALIDATION_ERROR':
                            for(let error in res.error) {
                            this.formStatus[error] = {
                                valid: false,
                                message: res.error[error][0]
                                }
                            }
                        break;
                        case 'NOT_AUTHENTICATED':
                            this.$store.dispatch('user/setPermissions', [])
                            this.$store.dispatch('user/setIsLoggedIn', false)
                            this.$router.push('/login')
                        break;
                    
                        default:
                            this.$alert({
                                type: 'error',
                                title: 'Something wrong happened try again.'
                            })
                        break;
                    }
                }
            ).finally(() => {
                this.isLoading = false
            })
        },

        validate() {
            this.formStatus['email'] = validateEmail(this.user.email)
            this.formStatus['firstname'] = validateName(this.user.firstname)
            this.formStatus['lastname'] = validateName(this.user.lastname)
            this.formStatus['phone'] = validateName(this.user.phone)
            this.formStatus['password'] = validatePassword(this.user.password)
            this.formStatus['confirmPassword'] = validateConfirmPassword(this.user.password, this.user.confirmPassword)

            const emailValid = this.formStatus['email'].valid
            const firstnameValid = this.formStatus['firstname'].valid
            const lastnameValid = this.formStatus['lastname'].valid
            const phoneValid = this.formStatus['phone'].valid
            const passwordValid = this.formStatus['password'].valid
            const confirmPasswordValid = this.formStatus['confirmPassword'].valid
            return emailValid && firstnameValid && lastnameValid && passwordValid && confirmPasswordValid && phoneValid

        }
    },

    mounted() {
        User.roles().then(
            res => {
                if(res?.data.code == "SUCCESS") {
                    const roles = res.data.data.roles
                    this.roles = roles;
                    this.isFormReady = true
}
            }
        ).catch(
            err => {
                if (err?.response?.data?.code == "NOT_AUTHENTICATED") {
                    this.$store.dispatch('user/setPermissions', [])
                    this.$store.dispatch('user/setIsLoggedIn', false)
                    this.$router.push('/login')
                }

                if (err?.response?.data?.code == 'SERVER_ERROR') {
                    this.$alert({
                        title: 'Something wrong happend. Please try again',
                        type: 'error'
                    })
                }
            }
        )
    }
}
</script>

<style>

</style>