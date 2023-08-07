<template>
    <tr>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div>
          <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white">{{ item.id }}</h2>
        </div>
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div>
          <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white">
            <!-- {{ getDate(item.created_at) }} -->
            <p>{{ moment(item.created_at).format("MM[/]DD[/]YY") }}</p>
            <p v-if="false">{{ moment(item.created_at).format("HH[:]mm[:]ss") }}</p>
          </h2>
        </div>
      </td>
      <td
        class="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div>
          <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white tw-font-[cairo]">
            {{ item.fullname }}
          </h2>
        </div>
      </td>
      <td
        class="tw-px-12 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div
          class="tw-inline tw-px-3 tw-py-1 tw-text-sm tw-font-normal tw-text-green-500 tw-bg-green-100 tw-rounded-full darkx:tw-text-green-400 tw-gap-x-2 darkx:tw-bg-green-800"
        >
          Confirmed
        </div>
      </td>
      <td
        class="tw-px-12 tw-py-2 tw-text-sm tw-font-medium tw-whitespace-nowrap"
      >
        <div
          class="tw-inline tw-px-3 tw-py-1 tw-text-sm tw-font-normal tw-text-red-500 tw-bg-red-100 tw-rounded-full darkx:tw-text-red-400 tw-gap-x-2 darkx:tw-bg-red-800"
        >
          Cancelled
        </div>
      </td>
      <td class="tw-px-12 tw-py-2 tw-text-sm tw-whitespace-nowrap">
        <div>
          <h4 class="tw-text-gray-700 darkx:tw-text-gray-200">
            Design software
          </h4>
        </div>
      </td>

      <td class="tw-px-4 tw-py-2 tw-text-sm tw-whitespace-nowrap">
        <button
          class="tw-px-1 tw-py-1 tw-text-gray-500 tw-transition-colors tw-duration-200 tw-rounded-lg darkx:tw-text-gray-300 hover:tw-bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="tw-w-6 tw-h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>
      </td>
    </tr>
</template>

<script>
import moment from 'moment';
export default {
  props: {
    item: {
      required: true,
    }
  },

  data() {
    return {
      moment: moment
    }
  },

  methods: {
  }
};
</script>

<style>
</style>