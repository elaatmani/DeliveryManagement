<template>
  <div>
    <button
        @click="visible = true"
        role="button"
        class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white"
    >
        <span>Make announcement</span>
    </button>

    <popup-new :visible="visible" @cancel="visible = false">
        <div class="tw-w-full tw-max-w-[600px] tw-mx-auto tw-p-2">
                <div class="tw-w-full tw-h-fit tw-bg-white tw-rounded-md tw-border tw-border-solid tw-shadow-md">
                    <h1
                        class="tw-text-lg tw-font-medium tw-text-gray-600 tw-bg-gray-100 tw-border-b tw-border-solid tw-p-4">
                        Make Announcement
                    </h1>
                    <div class="tw-p-5 tw-space-y-4">
                        <div>
                            <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Variant</label>
                            <div class="tw-grid tw-grid-cols-4 tw-gap-2">
                                <button 
                                @click="form.variant = 'success'"
                                :class="[form.variant == 'success' && ' tw-ring tw-ring-orange-500']"
                                class="tw-bg-emerald-500 tw-text-white tw-flex tw-justify-center tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-rounded tw-border tw-border-solid tw-border-neutral-200">
                                    <icon icon="line-md:bell-alert-loop" class="tw-text-2xl" />
                                </button>
                                <button 
                                @click="form.variant = 'info'"
                                :class="[form.variant == 'info' && ' tw-ring tw-ring-orange-500']"
                                class="tw-bg-cyan-500 tw-text-white tw-flex tw-justify-center tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-rounded tw-border tw-border-solid tw-border-neutral-200">
                                    <icon icon="line-md:bell-alert-loop" class="tw-text-2xl" />
                                </button>
                                <button 
                                @click="form.variant = 'danger'"
                                :class="[form.variant == 'danger' && ' tw-ring tw-ring-orange-500']"
                                class="tw-bg-rose-500 tw-text-white tw-flex tw-justify-center tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-rounded tw-border tw-border-solid tw-border-neutral-200">
                                    <icon icon="line-md:bell-alert-loop" class="tw-text-2xl" />
                                </button>
                                <button 
                                @click="form.variant = 'warning'"
                                :class="[form.variant == 'warning' && ' tw-ring tw-ring-orange-500']"
                                class="tw-bg-amber-500 tw-text-white tw-flex tw-justify-center tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-rounded tw-border tw-border-solid tw-border-neutral-200">
                                    <icon icon="line-md:bell-alert-loop" class="tw-text-2xl" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Type</label>
                            <div class="tw-grid tw-grid-cols-3 tw-gap-2">
                                <button 
                                @click="form.type = 'global'"
                                :class="[form.type == 'global' && ' !tw-border-orange-500']"
                                class="tw-py-2 tw-px-4 tw-rounded tw-border tw-border-solid tw-border-neutral-200">
                                    Global
                                </button>
                                <button 
                                @click="form.type = 'role'"
                                :class="[form.type == 'role' && ' !tw-border-orange-500']"
                                class="tw-py-2 tw-px-4 tw-rounded tw-border tw-border-solid tw-border-neutral-200">
                                    Role
                                </button>
                                <button 
                                @click="form.type = 'user'"
                                :class="[form.type == 'user' && ' !tw-border-orange-500']"
                                class="tw-py-2 tw-px-4 tw-rounded tw-border tw-border-solid tw-border-neutral-200">
                                    User
                                </button>
                            </div>
                        </div>

                        <div v-show="form.type != 'global'">
                            <RoleSelector v-if="form.type == 'role'" v-model:target="form.target" />

                            <UserSelector v-if="form.type == 'user'" v-model:target="form.target" />
                            <label v-if="errors.target"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    errors.target }}</label>
                        </div>


                        <div>
                            <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Closeable</label>
                            <div class="tw-grid tw-grid-cols-2 tw-gap-2">
                                <button 
                                @click="form.closeable = true"
                                :class="[form.closeable == true && ' !tw-border-orange-500']"
                                class="tw-py-2 tw-px-4 tw-rounded tw-border tw-border-solid tw-border-neutral-200">
                                    Yes
                                </button>
                                <button 
                                @click="form.closeable = false"
                                :class="[form.closeable == false && ' !tw-border-orange-500']"
                                class="tw-py-2 tw-px-4 tw-rounded tw-border tw-border-solid tw-border-neutral-200">
                                    No
                                </button>
                            </div>
                        </div>


                        <div>
                            <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900">Content</label>
                            <textarea
                                v-model="form.content"
                                @input="errors.content = null"
                                :class="[errors.content && '!tw-border-red-400']"
                                rows="3"
                                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                                placeholder="Announcement content"
                            ></textarea>
                            <label v-if="errors.content"
                                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                                    errors.content }}</label>
                        </div>
                    </div>

                    <div
                        class="tw-flex tw-justify-end tw-items-center tw-p-2 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-100 tw-border-t tw-border-solid">
                        <button 
                            @click="visible = false"
                            :disabled="loading"
                            class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
                            Cancel
                        </button>
                        <button @click="handleSubmit" :disabled="loading"
                            class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
                            <v-icon size="small"
                                class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                                :class="[loading && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
                            <span>Send</span>
                        </button>
                    </div>
                </div>
        </div>
    </popup-new>
  </div>
</template>

<script setup>
import { ref, watch, inject } from 'vue';
import { useAlert } from '@/composables/useAlert'
import RoleSelector from './form/RoleSelector';
import UserSelector from './form/UserSelector';
import Alert from '@/api/Alert'

const visible = ref(false);
const loading = ref(false);
const alerts = inject('alerts')
alerts
const form = ref({
    variant: 'success',
    type: 'global',
    target: null,
    content: '',
    closeable: true
});

watch(() => form.value.target, v => {
    console.log('Target has been updated: ', v)
});

watch(() => form.value.type, () => {
    form.value.target = null
});

const errors = ref({})

const handleSubmit = async () => {
    errors.value.content = '';
    errors.value.target = '';

    if(form.value.type != 'global' && !form.value.target) {
        errors.value.target = 'The target cannot be empty.'
        return false;
    }

    if(form.value.content == '') {
        errors.value.content = 'The content can\'t be empty.'
        return false;
    }

    loading.value = true;

    await Alert.create(form.value)
    .then(res => {
        if(res.data.code == 'SUCCESS') {
            visible.value = false;
            alerts.data.value.unshift(res.data.alert);
            useAlert('Sent successfully')
        }
    })
    .catch(
        err => {
            console.log(err)
        }
    )
    loading.value = false;

}


</script>

<style>

</style>