<template>
  <div>

      <div
        class="py-5 px-2 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5 "
      >
        <IndexTable :loading="fetching" :from="from" :to="to" :last-page="last_page" :per-page="per_page" :total="total" @next="handleNext" @prev="handlePrev" :current-page="current_page" @page-change="handlePageChange" @per-page-change="handlePerPageChange"  :items="items" />
      </div>

  </div>
</template>

<script>
import FollowUp from '@/api/FollowUp';
import IndexTable from '@/views/followup/partials/IndexTable'
import { getPath } from '@/helpers/methods';

export default {
  components: { IndexTable },

  data() {
    return {
      fetching: true,

      items: [],

      first_page_url: null,
      lase_page_url: null,
      next_page_url: null,
      prev_page_url: null,
      last_page: 1,
      from: 1,
      to: 1,
      total: 0,
      links: null,

      sort_by: 'created_at',
      sort_order: 'asc',
      per_page: 5,
      current_page: 1

    }
  },

  methods: {

    paginateOrders() {
      const url = 'followup?page=' + this.current_page;
      const options = {
        sort_by: this.sort_by,
        sort_order: this.sort_order,
        per_page: this.per_page,
        current_page: this.current_page
      };

      return FollowUp.paginate(url, options)
      .then(({data}) => {
        const options = data.data.orders;
        this.setOptions(options)
      })
    },

    setOptions(options) {
      this.items = (options.data)
      this.first_page_url = getPath(options.first_page_url)
      this.lase_page_url = getPath(options.last_page_url)
      this.next_page_url = getPath(options.next_page_url)
      this.prev_page_url = getPath(options.prev_page_url)
      this.last_page = parseInt(options.last_page)
      this.from = parseInt(options.from)
      this.to = parseInt(options.to)
      this.per_page = parseInt(options.per_page)
      this.total = parseInt(options.total)
      this.links = (options.links)
    },

    handleNext() {

    },

    handlePrev() {

    },

    handlePageChange(page) {
      this.fetching = true
      this.current_page = page
      this.paginateOrders()
      .then(() => {
        this.fetching = false
      })
    },

    handlePerPageChange(n) {
      this.per_page = parseInt(n);
      this.handlePageChange(1)
    },

  },


  mounted() {
    this.paginateOrders()
    .then(() => {
        this.fetching = false
    })
  }
};
</script>

<style>
</style>