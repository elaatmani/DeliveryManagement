<template>
  <div class="tw-bg-white tw-p-5">
    <div class="tw-flex tw-items-center tw-justify-between">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium">Users</h1>
        <div class="tw-relative tw-flex tw-items-center">
            <span class="tw-text-xs tw-absolute tw-right-0 tw-top-0 -tw-translate-y-full tw-whitespace-nowrap">Show All</span>
            <label class="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer tw-scale-75">
                <input type="checkbox" v-model="showAll" class="tw-sr-only tw-peer">
                <div class="tw-w-11 tw-h-6 tw-bg-gray-200 peer-focus:tw-outline-none peer-focus:tw-ring-4 peer-focus:tw-ring-orange-200 dark:peer-focus:tw-ring-orange-500 tw-rounded-full tw-peer dark:tw-bg-neutral-600 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600 peer-checked:tw-bg-orange-500"></div>
            </label>
        </div>
    </div>
    <div
      v-if="!isLoaded"
      class=""
    >
      <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-2">
        <div v-for="user in 4" :key="user">
          <div class="tw-w-[120px] tw-h-[55px] tw-bg-neutral-300/10 tw-animate-pulse tw-rounded tw-border tw-grid tw-grid-cols-12">
                
            </div>
        </div>
      </div>
    </div>


    <div
      v-if="isLoaded"
      class="tw-min-h-[50px]"
    >

      <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-2">
        <div v-for="user in users" :key="user.id">
          <div class="py-2 px-3 tw-rounded  tw-bg-white tw-shadow-sm tw-grid tw-grid-cols-12 tw-relative tw-overflow-hidden">
                <div class="tw-col-span-12 tw-flex tw-items-center tw-gap-2 tw-font-medium tw-capitalize tw-text-sm tw-text-neutral-600 tw-whitespace-nowrap">
                    <div class="tw-w-full tw-pt-1 tw-rounded-full tw-bg-red-400 tw-absolute tw-top-0 tw-right-0" v-if="!user.last_action"></div>
                    <div v-else-if="isOnline(lastSeen(user.last_action)) == true" class="tw-w-full tw-pt-1 tw-rounded-full tw-bg-green-500 tw-absolute tw-top-0 tw-right-0"></div>
                    <div v-else class="tw-w-full tw-pt-1 tw-rounded-full  tw-bg-yellow-400 tw-absolute tw-top-0 tw-right-0"></div>
                    <span class="tw-font-bold">
                        {{ user.firstname }} {{ user.lastname }}
                    </span>
                </div>
                <div class="tw-col-span-12 tw-whitespace-nowrap tw-text-xs tw-mt-1">
                    <div class="tw-text-red-500 tw-flex tw-items-center tw-gap-2" v-if="!user.last_action">
                        <!-- <div class="tw-p-1 tw-rounded-full tw-bg-red-400"></div> -->
                        Never Connected
                    </div>
                    <div v-else>
                        <div
                            class="tw-text-green-500 tw-flex tw-items-center tw-gap-2"
                            v-if="isOnline(lastSeen(user.last_action)) == true"
                        >
                            <!-- <div class="tw-p-1 tw-rounded-full tw-bg-green-500"></div> -->
                            Online
                        </div>
                        <div class="tw-flex tw-items-center tw-gap-2" v-else>
                            <!-- <div class="tw-p-1 tw-rounded-full  tw-bg-yellow-400"></div> -->
                            {{ lastSeen(user.last_action) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import User from "@/api/User";

import { getLastSeen } from "last-seen-ago";
import moment from 'moment';

export default {
  components: {},
  data() {
    return {
      isLoaded: false,
      showAll: false,
    };
  },

  computed: {
    users() {
        if(this.showAll) {
            return this.$store.getters["user/users"].filter(u => u.role_name != 'admin').sort((a, b) => !b.last_action ? -1 : moment(a.last_action).isAfter(b.last_action) ? -1 : 1);
        }

        return this.$store.getters["user/users"].filter(u => u.role_name != 'admin').sort((a, b) => !b.last_action ? -1 : moment(a.last_action).isAfter(b.last_action) ? -1 : 1).slice(0, 8);
    },
  },

  methods: {
    getUsers() {
      User.all()
        .then((res) => {
          if (res?.data.code == "SHOW_ALL_USERS") {
            const users = res.data.data.users;
            this.$store.dispatch("user/setUsers", users);
            this.isLoaded = true;
          }
        })
        .catch(this.$handleApiError);
    },
    lastSeen(last_action) {
      let t = Date.parse(last_action.replace("-", "/")) / 1000;
      return getLastSeen(t);
    },
    isOnline(time) {
      let times = ["Just Now", "1 minute ago", "2 minute ago"];

      return times.includes(time);
    },
  },

  mounted() {
    this.getUsers();
  },
};
</script>

<style>
</style>