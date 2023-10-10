<template>
  <div class="py-5 px-2 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5">
    <section class="tw-px-3">
      <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <div>
          <div class="tw-flex tw-items-center tw-gap-x-3">
            <h2
              class="tw-text-lg tw-font-medium tw-text-gray-800 darkx:tw-text-white"
            >
              Products
            </h2>

            <span
              class="tw-px-3 tw-py-1 tw-text-xs tw-text-emerald-600 tw-bg-emerald-100 tw-rounded-full darkx:tw-bg-gray-800 darkx:tw-text-orange-400"
              >{{ totalProducts }} products</span
            >
          </div>

          <p class="tw-mt-1 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">
            List of products.
          </p>
        </div>

      </div>

      <!-- Filters Section -->
      <IndexFilters
        v-model:search="search"
        v-model:filters="filters"
        @filter="handlePerPageChange(per_page)"
        @clear="handleClearFilters"
        @per-page-change="handlePerPageChange"
        @fresh="paginateProducts"
        :loading="fetching"
        :statistics="statistics"
        :per-page="per_page"
        active-statistics
      />

      <div>
        <IndexTable
          v-model:selected="selected"
          @update="handleItemUpdate"
          @page-change="handlePageChange"
          @sort-order="handleSortOrderChange"
          :loading="fetching"
          :from="from"
          :to="to"
          :last-page="last_page"
          :per-page="per_page"
          :total="total"
          :current-page="current_page"
          :items="items"
          :deliveries="deliveries"
        />
      </div>

      <div v-if="create_popup">
        <CreatePopup v-model:visible="create_popup" />
      </div>
    </section>
  </div>
</template>

<script>
import Product from "@/api/Product";
import IndexTable from "@/views/newproducts/partials/IndexTable";
import IndexFilters from "@/views/newproducts/partials/filters/IndexFilters";
import { getPath } from "@/helpers/methods";
import CreatePopup from '@/views/newproducts/partials/components/CreatePopup'

export default {
  components: { IndexTable, IndexFilters, CreatePopup },

  data() {
    return {
      fetching: true,
      create_popup: false,

      items: [],
      selected: [],
      deliveries: {
        fetched: false,
        items: []
      },

      statistics: null,

      first_page_url: null,
      lase_page_url: null,
      next_page_url: null,
      prev_page_url: null,
      last_page: 1,
      from: 1,
      to: 1,
      total: 0,
      totalProducts: 0,
      links: null,
      search: "",

      sort_by: "created_at",
      sort_order: "asc",
      per_page: 10,
      current_page: 1,

      filters: {
        created_from: null,
        created_to: null,
        // user_id: "all",
      },
    };
  },

  methods: {
    paginateProducts() {
      const url = "?page=" + this.current_page;
      const options = {
        sort_by: this.sort_by,
        sort_order: this.sort_order,
        per_page: this.per_page,
        current_page: this.current_page,
        search: this.search,
        filters: this.filters,
      };

      this.fetching = true;
      return Product.paginate(url, options)
        .then(({ data }) => {
          const options = data.data.products;
          this.setOptions(options);
        })
        .then(() => {
          this.fetching = false;
        });
    },

    setOptions(options) {
      this.items = options.data;
      this.first_page_url = getPath(options.first_page_url);
      this.lase_page_url = getPath(options.last_page_url);
      this.next_page_url = getPath(options.next_page_url);
      this.prev_page_url = getPath(options.prev_page_url);
      this.last_page = parseInt(options.last_page);
      this.from = parseInt(options.from);
      this.to = parseInt(options.to);
      this.per_page = parseInt(options.per_page);
      this.total = parseInt(options.total);
      this.totalProducts = !this.search
        ? parseInt(options.total)
        : this.totalProducts;
      this.links = options.links;
    },

    handleClearFilters() {
      this.filters = {
        created_from: null,
        created_to: null,
        user_id: "all",
      };

      this.handlePageChange(1);
    },

    handleBulkUpdate() {
      this.selected = [];
      this.paginateProducts();
    },

    handleItemUpdate(item) {
      this.items = this.items.map((i) => (i.id == item.id ? item : i));
    },

    handlePageChange(page) {
      this.current_page = page;
      this.paginateProducts();
    },

    handlePerPageChange(n) {
      this.per_page = parseInt(n);
      this.handlePageChange(1);
    },

    handleSortOrderChange() {
      this.sort_order = this.sort_order == "asc" ? "desc" : "asc";
      this.paginateProducts();
    },

  },

  mounted() {
    this.paginateProducts();
  },
};
</script>

<style>
</style>