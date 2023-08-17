<template>
    <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >Agent</label
        >

        <select
          @change="e=> $emit('update', {...filters, agente_id: e.target.value})"
          :value="filters.agente_id"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
          <option value="all"  >All</option>
          <option value=""  >No Agent</option>
          <option :value="d.id" class="tw-capitalize" v-for="d in agents" :key="d.id">
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
            return this.$store.getters['user/users']
        },
        agents() {
            return this.fetched ? this.users.filter(u => u.role.name == 'agente') : []
        },
        fetched() {
            return this.$store.getters['user/fetched']
        },
    }
}
</script>

<style>

</style>