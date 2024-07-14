<template>
  <div class="px-2 py-5 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5">
    <section class="tw-px-3">
      <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <div>
          <div class="tw-flex tw-items-center tw-gap-x-3">
            <h2 class="tw-text-lg tw-font-medium tw-text-gray-800 darkx:tw-text-white">
              Profit Per Product
            </h2>
          </div>

          <p class="tw-mt-1 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">
            List of products.
          </p>
        </div>

      </div>

      <!-- Filters Section -->
      <IndexFilters v-model:filters="filters" @filter="handlePerPageChange(per_page)" @clear="handleClearFilters"
        @per-page-change="handlePerPageChange" @fresh="paginateProducts" :loading="fetching" :per-page="per_page" />

      <div>
        <IndexTable @page-change="handlePageChange" @sort-order="handleSortOrderChange" :loading="fetching" :from="from"
          :to="to" :last-page="last_page" :per-page="per_page" :total="total" :current-page="current_page"
          :items="items" />
      </div>

    </section>
  </div>
</template>

<script>
import Admin from "@/api/Admin";
import IndexTable from "@/views/dashboardproduct/partials/IndexTable";
import IndexFilters from "@/views/dashboardproduct/partials/filters/IndexFilters";
import { getPath } from "@/helpers/methods";

export default {
  components: { IndexTable, IndexFilters },

  data() {
    return {
      fetching: true,

      items: [],
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

      sort_by: "total_spend",
      sort_order: "desc",
      per_page: 10,
      current_page: 1,

      filters: {
        delivered_from: null,
        delivered_to: null,
        user_id: "all",
        product_id: "all",
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
      return Admin.products(url, options)
        .then(({ data }) => {
          console.log(data)
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
        delivered_from: null,
        delivered_to: null,
        product_id: "all",
      };

      this.handlePageChange(1);
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

<style></style>