<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Order</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Order Details</h2>
      </div>


      <!-- <div v-if="$can('users_create')">
        <v-btn color="primary-color" link :to="{name: 'user/add'}" variant="flat" class="text-capitalize">
          <v-icon icon="mdi-plus" class="mr-2 text-white "></v-icon>
          <span class="text-white">
            Add User
          </span>
        </v-btn>
      </div> -->
    </div>

    <div v-if="!isLoaded">
          <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <div class="">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isOrderFetched: false,
      isLoaded: true,
      
    };
  },

  computed: {
    
  },

  methods: {
    
  },

  async mounted() {
    
  },
};
</script>

<style>
</style>