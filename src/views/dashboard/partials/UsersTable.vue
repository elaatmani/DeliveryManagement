<template>
  <div>
    <!-- <h2 class="mb-2">Users</h2> -->
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
          <div class="py-2 px-3 tw-rounded tw-border tw-grid tw-grid-cols-12">
                <div class="tw-col-span-12 tw-font-medium tw-capitalize tw-text-sm tw-text-neutral-600 tw-whitespace-nowrap">
                    {{ user.firstname }} {{ user.lastname }}
                </div>
                <div class="tw-col-span-12 tw-whitespace-nowrap tw-text-xs">
                    <div class="tw-text-red-500 tw-flex tw-items-center tw-gap-2" v-if="!user.last_action">
                        <div class="tw-p-1 tw-rounded-full tw-bg-red-400"></div>
                        Never Connected
                    </div>
                    <div v-else>
                        <div
                            class="tw-text-green-500 tw-flex tw-items-center tw-gap-2"
                            v-if="isOnline(lastSeen(user.last_action)) == true"
                        >
                            <div class="tw-p-1 tw-rounded-full tw-bg-green-500"></div>
                            Online
                        </div>
                        <div class="tw-flex tw-items-center tw-gap-2" v-else>
                            <div class="tw-p-1 tw-rounded-full  tw-bg-yellow-400"></div>
                            {{ lastSeen(user.last_action) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div v-if="false" class="tw-flex tw-flex-col tw-gap-1">
        <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
          <thead class="tw-text-xs tw-text-gray-700 tw- tw-bg-gray-50">
            <tr>
              <th scope="col" class="tw-px-6 tw-py-3 text-truncate">
                <div class="tw-w-fit tw-flex tw-whitespace-nowrap">Name</div>
              </th>
              <th scope="col" class="tw-px-6 tw-py-3 text-truncate">
                <div class="tw-w-fit tw-flex tw-whitespace-nowrap">Status</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50"
            >
              <td class="tw-px-6 tw-py-4">
                {{ user.firstname }} {{ user.lastname }}
              </td>
              <td class="tw-px-6 tw-py-4">
                <div class="tw-text-red-500" v-if="!user.last_action">
                  Never Connected
                </div>
                <div v-else>
                  <div
                    class="tw-text-green-500 tw-flex tw-items-center tw-gap-2"
                    v-if="isOnline(lastSeen(user.last_action)) == true"
                  >
                    <div class="tw-p-1 tw-rounded-full tw-bg-green-500"></div>
                    Online
                  </div>
                  <div class="tw-text-neutral-700" v-else>
                    {{ lastSeen(user.last_action) }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/api/User";

import { getLastSeen } from "last-seen-ago";

export default {
  components: {},
  data() {
    return {
      isLoaded: false,
    };
  },

  computed: {
    users() {
      return this.$store.getters["user/users"].slice(0, 5);
    },
  },

  methods: {
    getUsers() {
      User.all()
        .then((res) => {
          if (res?.data.code == "SHOW_ALL_USERS") {
            const users = res.data.data.users;
            this.$store.dispatch("user/setUsers", users);
            console.log(res);
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