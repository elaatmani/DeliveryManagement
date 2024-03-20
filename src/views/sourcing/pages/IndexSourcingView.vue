<template>
  <div class="py-5 px-2 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5">
    <section class="tw-px-3">
      <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <div>
          <div class="tw-flex tw-items-center tw-gap-x-3">
            <h2 class="tw-text-lg tw-font-medium tw-text-gray-800 darkx:tw-text-white">
              Requested Products
            </h2>

            <span
              class="tw-px-3 tw-py-1 tw-text-xs tw-text-emerald-600 tw-bg-emerald-100 tw-rounded-full darkx:tw-bg-gray-800 darkx:tw-text-orange-400">{{ options.total }}
              request</span>
          </div>

          <p class="tw-mt-1 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">
            List of all requested products.
          </p>
        </div>
        <div v-if="$user.role == 'seller'">
          <router-link
              :to="{name: 'sourcings.new'}"
              class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white"
          >
              <span>Request new product</span>
          </router-link>
        </div>
      </div>

      <div>
        <IndexOptions />
      </div>

      <div>
        <IndexTable :loading="isLoading" :sourcings="sourcings" />
      </div>

      <div class="tw-mt-5">
        <TablePaginationNoNums 
          :total="options.total" 
          :current-page="options.current_page" 
          :last-page="options.last_page" 
          :from="options.from" 
          :to="options.to"
          :per-page="options.per_page"
          @page-change="handlePageChange"
          />
      </div>
    </section>
  </div>
</template>

<script setup>
import Sourcing from '@/api/Sourcing';
import TablePaginationNoNums from '@/components/TablePaginationNoNums';
import IndexOptions from '@/views/sourcing/partials/common/options/IndexOptions';
import IndexTable from '@/views/sourcing/partials/common/table/IndexTable';
import { ref, reactive, provide } from 'vue';

const sourcings = ref([]);
const options = reactive({
  total: 0,
  current_page: 1,
  last_page: 1,
  from: 1,
  to: 1,
  per_page: 10,
  sort_by: 'created_at',
  sort_order: 'desc',

  filters: {
  },
});
const isLoading = ref(false);

const getData = async () => {
  isLoading.value = true;
  await Sourcing.paginate('', options)
  .then(
    res => {
      if(res.data.code == 'SUCCESS') {
        sourcings.value = res.data.sourcings.data
        options.total = res.data.sourcings.total
        options.current_page = res.data.sourcings.current_page;
        options.last_page = res.data.sourcings.last_page
        options.from = res.data.sourcings.from
        options.to = res.data.sourcings.to
        options.per_page = res.data.sourcings.per_page
        options.page = options.current_page
      }
    }
  );
  isLoading.value = false;
};

const handlePageChange = (p) => {
  options.current_page = p;
  options.page = p;
  getData();
}

provide('options', {
  options,
  getData,
  setOptions: v => Object.assign(options, v),
  setFilter: (key, value) => options.filters[key] = value,
})

getData();

</script>

<style></style>