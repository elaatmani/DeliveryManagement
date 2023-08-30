<template>
  <div>
    <div class="sm:tw-flex sm:tw-items-center sm:tw-justify-between ">
        <div class="tw-text-sm tw-text-gray-500 darkx:tw-text-gray-400">
            Page <span class="tw-font-medium tw-text-gray-700 darkx:tw-text-gray-100">{{ currentPage }} of {{ lastPage }}</span> 
        </div>

        <div class="tw-flex tw-items-center tw-mt-4 tw-gap-x-4 sm:tw-mt-0">
            <button
            :disabled="currentPage <= 1" 
            @click="changePage(currentPage - 1)"
            :class="[currentPage <= 1 && 'tw-cursor-not-allowed']"
            class="tw-flex tw-items-center tw-justify-center tw-w-1/2 tw-px-5 tw-py-2 tw-text-sm tw-text-gray-700 tw-capitalize tw-transition-colors tw-duration-200 tw-bg-white tw-border  tw-border-solid tw-rounded-md sm:tw-w-auto tw-gap-x-2 hover:tw-bg-gray-100 darkx:tw-bg-gray-900 darkx:tw-text-gray-200 darkx:tw-border-gray-700 darkx:hover:tw-bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-w-5 tw-h-5 rtl:tw--scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>
                    previous
                </span>
            </button>

            <button 
            :disabled="currentPage >= totalPages"
            @click="changePage(currentPage + 1)" 
            :class="[currentPage >= totalPages && 'tw-cursor-not-allowed']"
            class="tw-flex tw-items-center tw-justify-center tw-w-1/2 tw-px-5 tw-py-2 tw-text-sm tw-text-gray-700 tw-capitalize tw-transition-colors tw-duration-200 tw-bg-white tw-border tw-border-solid tw-rounded-md sm:tw-w-auto tw-gap-x-2 hover:tw-bg-gray-100 darkx:tw-bg-gray-900 darkx:tw-text-gray-200 darkx:tw-border-gray-700 darkx:hover:tw-bg-gray-800">
                <span>
                    Next
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-w-5 tw-h-5 rtl:tw--scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        from: {
            type: Number,
            default: 1
        },
        to: {
            type: Number,
            default: 1
        },
        perPage: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 1
        },
        currentPage: {
            type: Number,
            default: 1
        },
        lastPage: {
          type: Number,
          default: 1
        }
    },

    data() {
        return {
            totalItems: 100,
            itemsPerPage: 5,
            // currentPage: 1,
        }
    },


  computed: {
    totalPages() {
      return this.lastPage;
    },
    showEllipsisStart() {
      return this.currentPage > 3;
    },
    showEllipsisEnd() {
      return this.currentPage < this.totalPages - 2;
    },
    visiblePages() {
      let startPage = Math.max(1, this.currentPage - 1);
      let endPage = Math.min(this.totalPages, this.currentPage + 1);
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },

  methods: {
    changePage(page) {
        this.$emit('pageChange', page);
    }
  }
};
</script>

<style>
</style>