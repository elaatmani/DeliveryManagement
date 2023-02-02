<template>
  <div>
    <v-btn v-if="$can(`${prop}_update`)" :to="'/users/update/' + model.id" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Edit</span> -->
    </v-btn>
    <v-btn v-if="$can(`${prop}_show`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
      <!-- <span class="text-white text-capitalize">View</span> -->
    </v-btn>
    <v-btn v-if="$can(`${prop}_delete`) && model.role_name !== 'admin'" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
      <!-- <span class="text-white text-capitalize">Delete</span> -->
    </v-btn>
  </div>
</template>
<script>
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "prop", "model"],
  name: "myVue",
  data() {
    return {
    };
  },
  methods: {}
};
</script>