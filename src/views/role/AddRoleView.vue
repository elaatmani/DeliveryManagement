<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">
        Add New Role
      </h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Create new Role</h2>
    </div>

    <div v-if="!isFormReady">
      <LoadingAnimation />
    </div>

    <div
      v-if="isFormReady"
      class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md"
    >
      <div>
        <v-row>
          <v-col cols="12" md="12">
            <v-row>
              <v-col class="!tw-py-2" cols="12" md="12">
                <div class="md:tw-w-1/2 tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Role Name</div>
                  <v-text-field
                    :error="!formStatus.name.valid"
                    :hide-details="true"
                    @keyup="resetError('firstname')"
                    v-model="name"
                    clearable
                    clear-icon="mdi-close"
                    class="tw-w-full"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-text-field>
                  <div
                    class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs"
                  >
                    {{ formStatus.name.message }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <div>
                  <div class="mb-3 text-body-2 tw-text-zinc-700">
                    Select Permissions:
                    <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-text-xs">
                      {{ formStatus.permissions.message }}
                    </div>
                  </div>
                  <div class="tw-flex tw-flex-wrap tw-gap-2 tw-mt-5">
                    <div
                      @click="handleClick(permission)"
                      :class="{
                        '!tw-bg-orange-500 !tw-text-white':
                          selectedPermissions.includes(permission),
                      }"
                      class="tw-py-1 tw-px-2 tw-bg-gray-900/10 tw-text-gray-900 tw-rounded-lg tw-cursor-pointer"
                      v-for="permission in permissions"
                      :key="permission"
                    >
                      <span>{{ permission }}</span>
                      <!-- <span>{{ permission.description }}</span> -->
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <div v-if="show">
              {{ selectedPermissions }}
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn link to="/" color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Cancel</span>
        </v-btn>
        <v-btn
          @click="create"
          :loading="isLoading"
          color="primary-color"
          variant="flat"
          size="large"
        >
          <span class="text-white text-capitalize">Create</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/api/User";
import { localUrl } from "@/config/config";
import { validateName, validatePermissions } from "@/helpers/validators";

export default {
  data() {
    return {
      localUrl,
      isFormReady: false,
      isLoading: false,
      show: false,

      formStatus: {
        name: {
          valid: true,
          message: "",
        },
        permissions: {
          valid: true,
          message: "",
        },
      },

      name: "",
      permissions: [],
      selectedPermissions: [],
    };
  },

  computed: {
    roles() {
      return this.$store.getters["user/roles"];
    },
  },

  methods: {
    create() {
      if (!this.validate()) {
        return false;
      }

      this.isLoading = true;
      User.createRole({
        name: this.name,
        permissions: this.selectedPermissions,
      })
        .then((res) => {
          if (res.data.code === "ROLE_ADDED") {
            this.$alert({
              type: "success",
              title: res.data.message,
            });

            this.getRoles();

            this.name = "";
            this.selectedPermissions = [];
          }
        })
        .catch((err) => {
          this.$handleApiError(err);
          const res = err?.response?.data;

          if (res?.code == "VALIDATION_ERROR") {
            for (let error in res.error) {
              this.formStatus[error] = {
                valid: false,
                message: res.error[error][0],
              };
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    handleClick(permission) {
      if (this.selectedPermissions.includes(permission)) {
        this.selectedPermissions = this.selectedPermissions.filter(
          (i) => i !== permission
        );
      } else {
        this.selectedPermissions.push(permission);
      }
    },

    resetError(field) {
      this.formStatus[field] = {
        valid: true,
        message: "",
      };
    },

    validate() {
      this.formStatus.name = validateName(this.name, "Name");
      this.formStatus.permissions = validatePermissions(
        this.selectedPermissions
      );

      return this.formStatus.name.valid && this.formStatus.permissions.valid;
    },

    getRoles() {
      User.roles()
        .then((res) => {
          if (res?.data.code == "SUCCESS") {
            const roles = res.data.data.roles;
            this.$store.dispatch("user/setRoles", roles);
            this.isFormReady = true;
          }
        })
        .catch(this.$handleApiError);
    },

    async getPermissions() {
      return await User.permessions()
        .then((res) => {
          if (res?.data.code == "SUCCESS") {
            const permissions = res.data.permissions;
            this.permissions = permissions.map(p => p.name);
            this.isFormReady = true;
          }
        })
        .catch(this.$handleApiError);
    },
  },

  async mounted() {
    // if (this.roles.length == 0) {
    //   await this.getRoles();
    // } else {
      // this.isFormReady = true;
      // }
      
    await this.getPermissions();
    this.isFormReady = true;
    // this.permissions = this.$store.getters["user/permissions"];
  },
};
</script>

<style>
</style>