<template>
  <div>
    <!-- Header -->
    <v-app-bar
      color="white"
      density="default"
      elevation="0"
      class="tw-border-b-0 !tw-shadow-lg !tw-shadow-gray-400/10 tw-top-0 !tw-fixed tw-overflow-visible"
      :absolute="false"
    >
      <!-- Left Part -->
      <template v-if="false" v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <!-- / Left Part -->

      <!-- App Logo -->
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="handleClick()"
      ></v-app-bar-nav-icon>
      <!-- / App Logo -->

      <!-- Right Part -->
      <template v-slot:append>
        <!-- <v-btn :ripple="false" class="mr-2"  icon>
            <v-img width="22" height="22" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          </v-btn> -->
          <div  class="tw-flex tw-items-center tw-gap-2">
            <!-- Notifications -->
             <div v-if="user.role == 'admin' " >
            <div @click="create_popup = true" class="tw-flex tw-items-center  tw-gap-x-3">

              <button class="tw-flex tw-items-center tw-justify-center  tw-px-5 tw-py-2 tw-text-sm tw-tracking-wide tw-text-white tw-transition-colors tw-duration-200 tw-bg-orange-500 tw-rounded-lg shrink-0 sm:tw-w-auto tw-gap-x-2 hover:tw-bg-orange-600 darkx:hover:tw-bg-orange-500 darkx:tw-bg-orange-600">

                  <span>Goal Progression</span>
              </button>
              </div>
            
            <div v-if="create_popup">
              <GoalProgressionBtn v-model:visible="create_popup" />
            </div>
          </div>
          <!-- <Notification v-if="false" /> -->
          <GlobalNotification />

          <!-- User Menu -->
          <HeaderMenu />
        </div>
      </template>
      <!-- /Right Part -->
    </v-app-bar>
  </div>
</template>

<script>
import { localUrl } from "@/config/config";
import HeaderMenu from "@/layouts/default/partials/header/HeaderMenu";
import GlobalNotification from "@/layouts/default/partials/header/GlobalNotification";
import GoalProgressionBtn from "@/layouts/default/partials/header/GoalProgressionBtn";
import store from '@/store/'

export default {
  emits: ["toggleSidebar"],
  components: { HeaderMenu, GlobalNotification,GoalProgressionBtn },

  data() {
    return {
      localUrl,
      create_popup: false,
    };
  },

  computed: {
    user() {
            return store.getters["user/user"];
        },
  },

  methods: {
    handleClick() {
      this.$emit("toggleSidebar");
    },
  },
};
</script>

<style></style>
