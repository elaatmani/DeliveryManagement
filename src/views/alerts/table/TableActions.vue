<template>
    <div>
      <div class="tw-flex tw-items-center tw-justify-end tw-px-4 tw-gap-2">
        <button @click="visible.delete = true" class="tw-text-lg tw-p-1.5 tw-rounded tw-border tw-border-solid tw-border-rose-300 tw-text-rose-500 tw-duration-200 hover:tw-bg-rose-500 hover:tw-text-white">
          <icon icon="fluent:delete-28-filled" />
        </button>
      </div>

      <popup-new :visible="visible.delete" @cancel="visible.delete = false">
            <div
                class="tw-mx-auto tw-w-[95%] md:tw-max-w-[500px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg"
            >
                <div
                class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50"
                >
                Delete Announcement
                </div>
                <div class="tw-p-4 tw-bg-white">
                    <p class="tw-text-lg tw-font-medium">
                        Are you sure you want to delete this announcement ?
                    </p>
                </div>
                <div
                    class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid"
                    >
                    <button
                        @click="visible.delete = false"
                        class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300"
                    >
                        Cancel
                    </button>
                    <button
                        @click="handleDelete"
                        :disabled="loading.delete"
                        class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-rose-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-rose-600 dark:tw-border-neutral-900 dark:hover:tw-border-rose-500 hover:tw-bg-rose-500/80 dark:hover:tw-bg-rose-400 tw-duration-300 tw-text-white"
                    >
                        <v-icon
                        size="small"
                        class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
                        :class="[loading.delete && '!tw-max-w-[50px] !tw-mr-3']"
                        >mdi-loading</v-icon
                        >
                        <span>Confirm</span>
                    </button>
                    </div>
            </div>
        </popup-new>
    </div>
  </template>
  
  <script setup>
  import { defineProps, toRef, ref, inject } from 'vue';
  import Alert from '@/api/Alert'
import { useAlert } from '@/composables/useAlert';
  
  const props = defineProps({ item: { type: Object, required: true } });
  const item = toRef(props, 'item');
  const alerts = inject('alerts');

  const visible = ref({
    delete: false
  })

  const loading = ref({
    delete: false
  })

  const handleDelete = async () => {
    loading.value.delete = true;
    await Alert.delete(item.value.id)
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                useAlert('Deleted successfully.');
                visible.value.delete = false;
                alerts.data.value = alerts.data.value.filter(a => a.id != item.value.id)
            }
        }
    )
    loading.value.delete = false;
  }
  item
  </script>
  
  <style>
  
  </style>