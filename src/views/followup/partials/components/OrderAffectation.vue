<template>
  <div>
    <label
        class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
        >Affectation</label
    >
    <div v-if="fetched" class="tw-relative">
        <select
        :value="affectation"
        @change="e => $emit('update:affectation', e.target.value)"
        class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
        <option :value="null" selected>Choose a Delivery</option>
        <option v-for="u in users" :value="u.id" :key="u.id">{{ u.firstname + ' ' + u.lastname }}</option>
        </select>
        <div
        class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
        >
        <svg
            class="tw-fill-current tw-h-4 tw-w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
            <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
        </svg>
        </div>
    </div>
    <div v-if="!fetched" class="tw-relative">
        <div class="tw-absolute tw-scale-75 tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-z-10">
            <loading />
        </div>

        <select
        disabled
        class="tw-opacity-30 tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
            <option :value="null" selected>Loading...</option>
        </select>
        <div
        class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
        >
        </div>
    </div>
  </div>
</template>

<script>
import User from "@/api/User";

export default {
    props: {
        affectation: {
            required: true
        }
    },

    data() {
        return {
            users: [],
            fetched: false,
        }
    },

  methods: {
    getDeliveries() {
        this.fetched = false;
        User.all()
        .then((res) => {
            if (res?.data.code == "SHOW_ALL_USERS") {
            const users = res.data.data.users;
            this.users = users.filter(u => u.role_name == 'delivery');
            this.fetched = true;
            }
        })
        .catch(this.$handleApiError);
    },
  },

  mounted() {
    this.getDeliveries()
  }
};
</script>

<style>
</style>