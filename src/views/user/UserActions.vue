<template>
  <div>
    <v-btn v-if="$can(`${prop}_update`)" :to="'/users/update/' + model.id" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>
    <v-btn v-if="$can(`${prop}_show`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
    </v-btn>
    <v-btn @click="showPopup = true" v-if="$can(`${prop}_delete`) && model.role_name !== 'admin'" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
    </v-btn>
    <!--  -->
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this user?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleResolved" />
  </div>
</template>
<script>
import User from '@/api/User';
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "prop", "model"],
  name: "userActions",
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
        User.delete(this.model.id)
        .then((res) => {
          if (res.data.code == 'USER_DELETED') {
            this.isLoading = false
            this.$alert({
              type: 'success',
              title: 'User Deleted Successfully'
            })
          }
          User.all().then(res => {
            if(res.data.code == 'SHOW_ALL_USERS') {
              this.$store.dispatch('user/setUsers', res.data.data.users)
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