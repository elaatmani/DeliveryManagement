<template>
    <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Seller</label
        >

        <select
          @change="e=> $emit('update', {...filters, user_id: e.target.value})"
          :value="filters.user_id"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
          <option value="all"  >All</option>
          <option :value="d.id" class="tw-capitalize" v-for="d in sellers" :key="d.id">
            {{ d.firstname }} {{ d.lastname }}
          </option>
        </select>
      </div>
</template>

<script>
export default {

    props: {
        filters: {
            required: true,
        }
    },

    data() {
        return {
        }
    },

    computed: {
        users() {
            return this.$store.getters['user/users'].filter(u => u.status == 1);
        },
        sellers() {
            return this.fetched ? this.users.filter(u => u.role.name == 'seller') : []
        },
        fetched() {
            return this.$store.getters['user/fetched']
        },
    }
}
</script>

<style>

</style>