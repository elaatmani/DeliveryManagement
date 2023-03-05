<template>
  <div v-if="model.name !== 'admin'">
    <v-btn v-if="$can(`users_update`)" :to="'/users/roles/update/' + model.id" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>
    <v-btn v-if="$can(`users_show`)" :to="'/users/roles/' + model.id" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
    </v-btn>
    <v-btn @click="showPopup = true" v-if="$can(`users_delete`) && model.role_name !== 'admin'" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
    </v-btn>
    <!--  -->
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this Role?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" />
  </div>
</template>
<script>
import User from '@/api/User';
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "prop", "model"],
  name: "roleActions",
  data() {
    return {
      showPopup: false,
      isLoading: false
    };
  },
  methods: {
    handleResolved(response) {
      if(response) {
        this.isLoading = true
        User.deleteRole(this.model.id)
        .then((res) => {
          if (res.data.code == 'ROLE_DELETED') {
            this.isLoading = false
            this.$alert({
              type: 'success',
              title: 'Role Deleted Successfully'
            })
          }
          User.roles().then(res => {
            if(res.data.code == 'SUCCESS') {
              this.$store.dispatch('user/setRoles', res.data.data.roles)
            }
          }).catch(this.$handleApiError)

        })
        .catch(this.$handleApiError)
        .finally(() => {
          this.isLoading = false
          this.showPopup = false
        });
      } else {
        this.showPopup = false
      }
    },
  },
};
</script>