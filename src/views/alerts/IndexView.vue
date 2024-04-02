<template>
  <div class="py-5 px-2 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5">
      <section class="tw-px-3">
        <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
          <div>
            <div class="tw-flex tw-items-center tw-gap-x-3">
              <h2 class="tw-text-lg tw-font-medium tw-text-gray-800 darkx:tw-text-white">
                Manage Alerts
              </h2>

            </div>
  
            <p class="tw-mt-1 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">
              Create and manage announcements.
            </p>
          </div>
          <div>
            <AddAlertForm />
          </div>
        </div>

        <div class="tw-mt-5">
          <AlertsTable :data="data" :loading="loading" />
        </div>
  
      </section>
    </div>
</template>

<script setup>
import AddAlertForm from './partials/AddAlertForm';
import AlertsTable from './table/AlertsTable';
import Alert from '@/api/Alert'
import { ref, provide } from 'vue'

const loading = ref(false);
const data = ref({});
// console.log(data.value)
const params = ref({})

const getAlerts = async () => {
  loading.value = true;
data;
  await Alert.paginate('', params.value)
  .then(
    res => {
      const { data: alerts, ...newParams } = res.data.alerts;
      data.value = alerts
      params.value = newParams;
    },
    err => {
      console.log(err)
    }
  );

  loading.value = false;
}

getAlerts();

provide('alerts', {
  data
})
</script>

<style>

</style>