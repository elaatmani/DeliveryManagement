<template>
  <div class="py-5 px-2 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5 ">

    <section class="tw-px-3">
      <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <div>
          <div class="tw-flex tw-items-center tw-gap-x-3">
            <h2 class="tw-text-lg tw-font-medium tw-text-gray-800 darkx:tw-text-white">Factorisation</h2>

            <span
              class="tw-px-3 tw-py-1 tw-text-xs tw-text-emerald-600 tw-bg-emerald-100 tw-rounded-full darkx:tw-bg-gray-800 darkx:tw-text-orange-400">{{
              totalOrders }} order</span>
          </div>

          <!-- <p class="tw-mt-1 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">These orders have needs to reconfirmed.</p> -->
        </div>

        <div @click="settings_popup = true" class="tw-flex tw-items-center tw-mt-4 tw-gap-x-3">

          <button
            class="tw-flex tw-items-center tw-justify-center  tw-px-5 tw-py-2 tw-text-sm tw-tracking-wide tw-text-white tw-transition-colors tw-duration-200 tw-bg-orange-500 tw-rounded-lg shrink-0 sm:tw-w-auto tw-gap-x-2 hover:tw-bg-orange-600 darkx:hover:tw-bg-orange-500 darkx:tw-bg-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="tw-w-5 tw-h-5" width="24" height="24" viewBox="0 0 24 24">
              <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                <path
                  d="M12 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0" />
                <path
                  d="M11.975 1.25c-.445 0-.816 0-1.12.02a2.823 2.823 0 0 0-.907.19a2.75 2.75 0 0 0-1.489 1.488c-.145.35-.184.72-.2 1.122a.868.868 0 0 1-.415.731a.868.868 0 0 1-.841-.005c-.356-.188-.696-.339-1.072-.389a2.75 2.75 0 0 0-2.033.545a2.83 2.83 0 0 0-.617.691c-.17.254-.356.575-.578.96l-.025.044c-.223.385-.408.706-.542.98c-.14.286-.25.568-.29.88a2.75 2.75 0 0 0 .544 2.033c.231.301.532.52.872.734a.868.868 0 0 1 .426.726a.868.868 0 0 1-.426.726c-.34.214-.64.433-.872.734a2.75 2.75 0 0 0-.545 2.033c.041.312.15.594.29.88c.135.274.32.595.543.98l.025.044c.222.385.408.706.578.96c.177.263.367.5.617.69a2.75 2.75 0 0 0 2.033.546c.376-.05.716-.2 1.072-.389a.867.867 0 0 1 .84-.005a.863.863 0 0 1 .417.731c.015.402.054.772.2 1.122a2.75 2.75 0 0 0 1.488 1.489c.29.12.59.167.907.188c.304.021.675.021 1.12.021h.05c.445 0 .816 0 1.12-.02c.318-.022.617-.069.907-.19a2.75 2.75 0 0 0 1.489-1.488c.145-.35.184-.72.2-1.122a.868.868 0 0 1 .415-.732a.868.868 0 0 1 .841.006c.356.188.696.339 1.072.388a2.75 2.75 0 0 0 2.033-.544c.25-.192.44-.428.617-.691c.17-.254.356-.575.578-.96l.025-.044c.223-.385.408-.706.542-.98c.14-.286.25-.569.29-.88a2.75 2.75 0 0 0-.544-2.033c-.231-.301-.532-.52-.872-.734a.868.868 0 0 1-.426-.726c0-.278.152-.554.426-.726c.34-.214.64-.433.872-.734a2.75 2.75 0 0 0 .545-2.033a2.826 2.826 0 0 0-.29-.88a17.9 17.9 0 0 0-.543-.98l-.025-.044a18.028 18.028 0 0 0-.578-.96a2.823 2.823 0 0 0-.617-.69a2.75 2.75 0 0 0-2.033-.546c-.376.05-.716.2-1.072.389a.868.868 0 0 1-.84.005a.868.868 0 0 1-.417-.731c-.015-.402-.054-.772-.2-1.122a2.75 2.75 0 0 0-1.488-1.489c-.29-.12-.59-.167-.907-.188c-.304-.021-.675-.021-1.12-.021zm-1.453 1.595c.077-.032.194-.061.435-.078c.247-.017.567-.017 1.043-.017s.796 0 1.043.017c.241.017.358.046.435.078c.307.127.55.37.677.677c.04.096.073.247.086.604c.03.792.439 1.555 1.165 1.974c.726.42 1.591.392 2.292.022c.316-.167.463-.214.567-.227a1.25 1.25 0 0 1 .924.247c.066.051.15.138.285.338c.139.206.299.483.537.895c.238.412.397.69.506.912c.107.217.14.333.15.416a1.25 1.25 0 0 1-.247.924c-.064.083-.178.187-.48.377c-.672.422-1.128 1.158-1.128 1.996c0 .838.456 1.574 1.128 1.996c.302.19.416.294.48.377c.202.263.29.595.247.924c-.01.083-.044.2-.15.416c-.109.223-.268.5-.506.912c-.238.412-.399.689-.537.895c-.135.2-.219.287-.285.338a1.25 1.25 0 0 1-.924.247c-.104-.013-.25-.06-.567-.227c-.7-.37-1.566-.398-2.292.021c-.726.42-1.135 1.183-1.165 1.975c-.013.357-.046.508-.086.604a1.25 1.25 0 0 1-.677.677c-.077.032-.194.061-.435.078c-.247.017-.567.017-1.043.017s-.796 0-1.043-.017c-.241-.017-.358-.046-.435-.078a1.25 1.25 0 0 1-.677-.677c-.04-.096-.073-.247-.086-.604c-.03-.792-.439-1.555-1.165-1.974c-.726-.42-1.591-.392-2.292-.022c-.316.167-.463.214-.567.227a1.25 1.25 0 0 1-.924-.247c-.066-.051-.15-.138-.285-.338a17.055 17.055 0 0 1-.537-.895c-.238-.412-.397-.69-.506-.912c-.107-.217-.14-.333-.15-.416a1.25 1.25 0 0 1 .247-.924c.064-.083.178-.187.48-.377c.672-.422 1.128-1.158 1.128-1.996c0-.838-.456-1.574-1.128-1.996c-.302-.19-.416-.294-.48-.377a1.25 1.25 0 0 1-.247-.924c.01-.083.044-.2.15-.416c.109-.223.268-.5.506-.912c.238-.412.399-.689.537-.895c.135-.2.219-.287.285-.338a1.25 1.25 0 0 1 .924-.247c.104.013.25.06.567.227c.7.37 1.566.398 2.292-.022c.726-.419 1.135-1.182 1.165-1.974c.013-.357.046-.508.086-.604c.127-.307.37-.55.677-.677" />
              </g>
            </svg>

            <span>Settings</span>
          </button>
        </div>
      </div>

      <!-- Filters Section -->
      <IndexFilters v-model:search="search" v-model:filters="filters" @filter="handlePerPageChange(per_page)"
        @clear="handleClearFilters" @per-page-change="handlePerPageChange" @fresh="paginateOrders"
        :loading="fetching" />

      <div>
        <IndexTable @update="handleItemUpdate" @page-change="handlePageChange" @sort-order="handleSortOrderChange"
          :loading="fetching" :from="from" :to="to" :last-page="last_page" :per-page="per_page" :total="total"
          :current-page="current_page" :items="items" />
      </div>
    </section>

    <div v-if="settings_popup">
      <SettingsPopup v-model:visible="settings_popup" />
    </div>

  </div>
</template>

<script>
  import Factorisation from '@/api/Factorisation';
  import IndexTable from '@/views/newfactorisation/partials/IndexTable'
  import IndexFilters from '@/views/newfactorisation/partials/filters/IndexFilters';
  import SettingsPopup from '@/views/newfactorisation/partials/components/SettingsPopup'
  import { getPath } from '@/helpers/methods';

  export default {
    components: { IndexTable, IndexFilters, SettingsPopup },

    data() {
      return {
        fetching: true,
        settings_popup: false,

        items: [],

        first_page_url: null,
        lase_page_url: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: 1,
        from: 1,
        to: 1,
        total: 0,
        totalOrders: 0,
        links: null,
        search: '',

        sort_by: 'created_at',
        sort_order: 'desc',
        per_page: 10,
        current_page: 1,

        filters: {
          user_id: 'all',
          close: 'all',
          paid: 'all'
        }

      }
    },

    methods: {

      paginateOrders() {

        const url = '?page=' + this.current_page;
        const options = {
          sort_by: this.sort_by,
          sort_order: this.sort_order,
          per_page: this.per_page,
          current_page: this.current_page,
          search: this.search,
          filters: this.filters
        };

        this.fetching = true

        return Factorisation.paginate(url, options)
          .then(({ data }) => {
            const options = data.data.factorisation;
            this.setOptions(options);
          })
          .then(() => {
            this.fetching = false
          })
      },

      handleClearFilters() {
        this.filters = {
          user_id: 'all',
          close: 'all',
          paid: 'all'
        };

        this.handlePageChange(1);
      },
      setOptions(options) {
        this.items = (options.data)
        console.log(this.items)
        this.first_page_url = getPath(options.first_page_url)
        this.lase_page_url = getPath(options.last_page_url)
        this.next_page_url = getPath(options.next_page_url)
        this.prev_page_url = getPath(options.prev_page_url)
        this.last_page = parseInt(options.last_page)
        this.from = parseInt(options.from)
        this.to = parseInt(options.to)
        this.per_page = parseInt(options.per_page)
        this.total = parseInt(options.total)
        this.totalOrders = !this.search ? parseInt(options.total) : this.totalOrders;
        this.links = (options.links)
      },

      handleNext() {

      },

      handlePrev() {

      },

      handleItemUpdate(item) {
        this.items = this.items.map(i => i.id == item.id ? item : i);
      },

      handlePageChange(page) {
        this.current_page = page
        this.paginateOrders()
      },

      handlePerPageChange(n) {
        this.per_page = parseInt(n);
        this.handlePageChange(1)
      },

      handleSortOrderChange() {
        this.sort_order = this.sort_order == 'asc' ? 'desc' : 'asc';
        this.paginateOrders()
      }

    },


    mounted() {
      this.paginateOrders()
    }
  };
</script>

<style>
</style>