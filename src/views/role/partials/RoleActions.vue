<template>
  <div v-if="!['admin', 'agente', 'delivery'].includes(role.name)">
    <v-btn v-if="$can(`update_role`)" :to="'/users/roles/update/' + role.id" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>
    <!-- <v-btn @click="showPopupShow = true" v-if="$can(`view_role`)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-eye-outline</v-icon>
    </v-btn> -->
    <v-btn @click="showPopupDelete = true" v-if="$can(`delete_role`) && role.name !== 'admin'" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
    </v-btn>
    <!--  -->
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this Role?</p> You won't be able to revert this!" :loading="isLoadingDelete" :visible="showPopupDelete" @resolved="handleResolvedDelete" />
    <popup :noConfirm="true" type="info" title="Permissions" :loading="isLoadingShow" :visible="showPopupShow" @resolved="handleResolvedShow" >
      <div class="tw-flex tw-flex-wrap tw-gap-2">
        <div class="tw-py-1 tw-px-2 tw-bg-gray-900/10 tw-text-gray-900 tw-rounded-lg tw-cursor-pointer" v-for="permission in permissions" :key="permission">{{ permission }}</div>
      </div>
    </popup>
  </div>
</template>
<script>
import User from '@/api/User';
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "prop", "role"],
  name: "roleActions",
  data() {
    return {
      showPopupDelete: false,
      showPopupShow: false,
      isLoadingDelete: false,
      isLoadingShow: false,

      permissions: [
        'create_user',
        'delete_user',
        'update_user',
        'show_user'
      ]
    };
  },
  methods: {
    handleResolvedDelete(response) {
      if(response) {
        this.isLoadingDelete = true
        User.deleteRole(this.role.id)
        .then((res) => {
          if (res.data.code == 'ROLE_DELETED') {
            this.isLoadingDelete = false
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
          this.isLoadingDelete = false
          this.showPopupDelete = false
        });
      } else {
        this.showPopupDelete = false
      }
    },
    handleResolvedShow(response) {
      if(response) {
        console.log(response);
      } else {
        this.showPopupShow = false
      }
    }
  },
};
</script>