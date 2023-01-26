<template>
  <div class="tw-min-h-screen tw-overflow-auto tw-bg-slate-50">
    <div class="tw-grid tw-h-fit tw-overflow-hidden  md:tw-grid-cols-2 tw-grid-cols-1">
        <div class="py-md-5 py-10 pb-0 tw-flex tw-justify-center md:tw-items-center">
            <v-container class="py-0">
                <div class="px-md-10 tw-w-full">
                    <div class="tw-w-[150px]">
                        <img class="tw-w-full" :src="localUrl + 'assets/img/logo.png'" />
                    </div>
                    <div class="mt-md-10 mt-15 pt-5 px-md-5  px-lg-16 tw-w-full d-felx justify-center align-center">
                        <div class="pa-5 py-7 tw-border bg-white tw-rounded-lg tw-mx-auto tw-max-w-[450px]">

                        <h1 class="text-h5 font-weight-medium !tw-text-gray-600">Login</h1>
                        <p class="text-body-1 mt-2 !tw-text-gray-500">Please login to your account</p>

                        <div class="mt-5">
                            <div>
                                <p class="mb-1">Email</p>
                                <v-text-field :error="!emailStatus.valid" :error-messages="!emailStatus.valid ? emailStatus.message : ''" autofocus @blur="emailFocus = false" @focus="emailFocus = true"  color="primary-color" variant="outlined" class="tw-w-full" density="compact">
                                    <template v-slot:append-inner>
                                        <v-icon :color="emailFocus ? emailStatus.valid ? 'primary-color' : 'error': 'grey-darken-3'">mdi-email-outline</v-icon>
                                    </template>
                                </v-text-field>
                            </div>

                            <div>
                                <p class="mb-1">Password</p>
                                <v-text-field :type="showPassword ? 'text' : 'password'" @blur="passwordFocus = false" @focus="passwordFocus = true" color="primary-color" variant="outlined" class="tw-w-full" density="compact">
                                    <template  v-slot:append-inner>
                                        <v-icon @click="showPassword = !showPassword" class="tw-relative tw-z-50 tw-cursor-pointer" :color="passwordFocus ? 'primary-color': 'grey-darken-3'">{{ showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}</v-icon>
                                    </template>
                                </v-text-field>
                            </div>

                            <div class="mt-5">
                                <v-btn @click="emailStatus.valid = true" block size="large" variant="flat" color="primary-color">
                                    <span class="text-capitalize text-white">Login</span>
                                </v-btn>
                            </div>

                        </div>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>
        <div class="bg-primary-color tw-min-h-screen tw-hidden md:tw-flex tw-items-center tw-justify-center">
            <img :src="localUrl + 'assets/img/login.jpg'" class="tw-w-full tw-h-full tw-object-cover" alt="">
        </div>
    </div>
  </div>
</template>

<script>
import { localUrl } from '@/config/config'

export default {
    data() {
        return {
            localUrl,
            emailStatus: {
                valid: false,
                message: 'Email is required'
            },
            emailFocus: false,
            passwordFocus: false,
            showPassword: false
        }
    }
}
</script>

<style>

</style>