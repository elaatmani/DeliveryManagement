<template>
    <div class="tw-relative">
      <div class="py-5 px-2 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5">
        <section class="tw-px-3">
          <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
            <div>
              <div class="tw-flex tw-items-center tw-gap-x-5">
                <h2 class="tw-text-xl tw-font-bold tw-text-gray-800 darkx:tw-text-white">
                  Quotation: #{{ route.params.id }}
                </h2>
                <div class="tw-flex tw-items-center tw-gap-2">
                  <div :class="quotation_status.class" class="tw-rounded tw-px-4 tw-py-1 tw-text-sm tw-text-center">
                    {{ quotation_status.name }}
                  </div>
                  <div :class="sourcing_status.class" class="tw-rounded tw-px-4 tw-py-1 tw-text-sm tw-text-center">
                    {{ sourcing_status.name }}
                  </div>
                </div>
              </div>
  
              <p class="tw-mt-2 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">
                {{ moment('2023-09-08T17:45:06.000000Z').format("MMMM D, YYYY hh:mm A") }}
              </p>
            </div>
          </div>
        </section>
      </div>
  
      <div class="tw-grid lg:tw-grid-cols-12 tw-grid-cols-1 tw-gap-4 tw-mt-4">
        <div class="tw-space-y-4 lg:tw-col-span-8">
          <div v-if="!!sourcing.note" class=" tw-bg-white tw-w-full tw-rounded-md tw-overflow-hidden">
            <div class="tw-flex tw-items-center tw-gap-2 tw-p-2 tw-bg-blue-100 tw-border tw-border-blue-200 tw-rounded-t-md">
              <icon icon="ph:info-fill" class="tw-text-xl tw-text-blue-500" />
              <span>Note</span>
            </div>
            <div class="tw-p-2 tw-border tw-border-t-0 tw-bg-white tw-border-blue-200 tw-rounded-b-md">
              <h1>{{ sourcing.note }}</h1>
            </div>
          </div>
  
          <div class="tw-border tw-bg-white tw-w-full tw-rounded-md">
            <SourcingRequestProcess :sourcing="sourcing" />
          </div>
  
          <div class="tw-p-4 tw-border tw-bg-white tw-w-full tw-rounded-md">
            <SourcingRequestProductDetails :sourcing="sourcing" />
          </div>
  
  
          <div class="tw-border tw-bg-white tw-w-full tw-rounded-md">
            <SourcingRequestDetails :sourcing="sourcing" />
          </div>
  
        </div>
  
        <div class="lg:tw-col-span-4">
          <div class="tw-border tw-bg-white tw-w-full tw-rounded-md">
            <SourcingRequestPricingBox :sourcing="sourcing" />
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import moment from 'moment'
  import { useRoute } from "vue-router";
  import { defineProps, toRef, computed } from 'vue'
  import { quotation_statuses, sourcing_statuses } from '@/config/sourcing';
  import SourcingRequestProcess from '@/views/sourcing/partials/admin/SourcingRequestProcess';
  import SourcingRequestPricingBox from '@/views/sourcing/partials/admin/SourcingRequestPricingBox';
  import SourcingRequestDetails from '@/views/sourcing/partials/admin/SourcingRequestDetails';
  import SourcingRequestProductDetails from '@/views/sourcing/partials/common/show/SourcingRequestProductDetails';
  
  const route = useRoute();
  const props = defineProps(['sourcing', 'loading']);
  const sourcing = toRef(props, 'sourcing');
  const loading = toRef(props, 'loading');
  const quotation_status = computed(() => quotation_statuses.find(s => s.value == sourcing.value.quotation_status));
  const sourcing_status = computed(() => sourcing_statuses.find(s => s.value == sourcing.value.sourcing_status));
  
  
  sourcing;
  loading;
  
  </script>
  
  <style></style>