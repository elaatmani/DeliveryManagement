<template>
  <div>
    <p class="tw-text-xs tw-mb-2">Showing {{ from }} to {{ to }} of {{ total }}</p>
    <nav aria-label="Page navigation example">
      <ul class="tw-flex tw-items-center tw--space-x-px tw-h-8 tw-text-sm">
        <li>
          <button
            :disabled="currentPage <= 1" 
            @click="changePage(currentPage - 1)"
            href="#"
            class="tw-flex tw-items-center tw-justify-center tw-border-solid tw-px-3 tw-h-8 tw-ml-0 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 tw-rounded-l-lg hover:tw-bg-gray-100 hover:tw-text-gray-700"
          >
            <span class="tw-sr-only">Previous</span>
            <svg
              class="tw-w-2.5 tw-h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        <li
        v-if="showEllipsisStart && currentPage > 2" 
        >
          <button
            @click="changePage(1)"
            :class="[
                currentPage == 1 && 'tw-text-orange-600 tw-border tw-border-orange-300 tw-bg-orange-50 hover:tw-bg-orange-100 hover:tw-text-orange-700 tw-relative tw-z-10',
                currentPage != 1 && 'tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 hover:tw-bg-gray-100 hover:tw-text-gray-700'
            ]"
            href="#"
            aria-current="page"
            class="tw-flex tw-items-center tw-justify-center tw-border-solid tw-px-3 tw-h-8 tw-leading-tight"
          >
            1
          </button>
        </li>
        <li
            v-if="showEllipsisStart"
        >
          <button
            href="#"
            disabled
            class="tw-flex tw-items-center tw-justify-center tw-border-solid tw-px-3 tw-h-8 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 hover:tw-bg-gray-100 hover:tw-text-gray-700"
          >
            ...
          </button>
        </li>
        <li
            v-for="i in visiblePages" :key="i" 
           @click="changePage(i)"
        >
          <button
            @click="changePage(i)"
            :class="[
                currentPage == i && 'tw-text-orange-600 tw-border tw-border-orange-300 tw-bg-orange-50 hover:tw-bg-orange-100 hover:tw-text-orange-700 tw-relative tw-z-10',
                currentPage != i && 'tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 hover:tw-bg-gray-100 hover:tw-text-gray-700'
            ]"
            href="#"
            aria-current="page"
            class="tw-flex tw-items-center tw-justify-center tw-border-solid tw-px-3 tw-h-8 tw-leading-tight"
          >
            {{ i }}
          </button>
        </li>
        <li
            v-if="showEllipsisEnd"
        >
          <button
            href="#"
            disabled
            class="tw-flex tw-items-center tw-justify-center tw-border-solid tw-px-3 tw-h-8 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 hover:tw-bg-gray-100 hover:tw-text-gray-700"
          >
            ...
          </button>
        </li>
        <li
        v-if="currentPage < totalPages - 1"
        >
          <button
           @click="changePage(totalPages)"
            :class="[
                currentPage == totalPages && 'tw-text-orange-600 tw-border tw-border-orange-300 tw-bg-orange-50 hover:tw-bg-orange-100 hover:tw-text-orange-700 tw-relative tw-z-10',
                currentPage != totalPages && 'tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 hover:tw-bg-gray-100 hover:tw-text-gray-700'
            ]"
            href="#"
            aria-current="page"
            class="tw-flex tw-items-center tw-justify-center tw-border-solid tw-px-3 tw-h-8 tw-leading-tight"
          >
            {{ totalPages }}
          </button>
        </li>
        <li
        >
          <button
            :disabled="currentPage >= totalPages"
            @click="changePage(currentPage + 1)"
            class="tw-flex tw-items-center tw-justify-center tw-border-solid tw-px-3 tw-h-8 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 hover:tw-bg-gray-100 hover:tw-text-gray-700 tw-rounded-tr-lg tw-rounded-br-lg"
          >
            <span class="tw-sr-only">Next</span>
            <svg
              class="tw-w-2.5 tw-h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
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