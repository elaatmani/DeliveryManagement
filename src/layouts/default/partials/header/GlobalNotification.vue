<template>
  <div v-click-outside="closeMenu" class="tw-relative">
    <v-btn @click="toggleMenu" icon width="35" height="35" class="tw-relative">
      <v-img
        width="22"
        height="22"
        :src="localUrl + 'assets/img/icons/notification-bing.svg'"
      ></v-img>

      <v-badge
        v-if="isLoaded && notifications.count > 0"
        class="tw-animate-bounce tw-scale-50"
        floating
        offset-y="20"
        offset-x="5"
        color="red"
        :bordered="true"
        location="bottom right"
        
        :content="notifications.count"
      ></v-badge>
    </v-btn>

    <v-fade-transition>
      <div v-if="isActive" class="!tw-duration-100">
        <div
          class="tw-absolute tw-text-sm tw-bg-white tw-border tw-border-solid tw-border-neutral-200 tw-rounded-md tw-bordesr !tw-shadow-lg !tw-shadow-gray-400/10 tw-top-14 tw-right-0 tw-w-[350px] tw-min-h-[50px]"
        >
          <p class="tw-p-2 tw-text-lg">Notifications</p>
          <div v-if="!isLoaded">
            <div class="tw-py-10 tw-flex tw-items-center tw-justify-center">
              <v-icon size="large" class="tw-animate-spin" color="primary-color"
                >mdi-loading</v-icon
              >
            </div>
          </div>
          <div v-if="isLoaded">
            <div v-if="notifications.data == ''">
                <p class="tw-text-center tw-py-4">No messages available. </p>
            </div>
            <div
              v-for="notification in notifications.data"
              :key="notification.id"
            >
              <div
              :class="{'bg-white': notification.status == 'read'}"
                class="tw-bg-orange-50 tw-p-2 tw-border-y tw-flex tw-flex-col tw-border-neutral-100"   
             >
                  <p class="tw-text-sm">{{ notification.message }}</p>
                <div
                    class="tw-ml-auto tw-mt-2 tw-text-xs tw-font-normal tw-text-gray-400 tw-whitespace-nowrap"
                  >
                    {{ moment(notification.created_at).fromNow() }}
                  </div>
              </div>
            </div>
          </div>
          <div class="tw-flex tw-justify-evenly tw-items-center tw-p-2">
            <router-link to="/notifications">
                <v-btn class="tw-text-center tw-w-[150px]" size="small" @click="isActive = false">View All</v-btn>
            </router-link>
              <v-btn class="tw-text-center tw-w-[150px]" size="small" @click="ChangeStatus">Mark all as Read</v-btn>
          </div>
        </div>
      </div>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { localUrl } from "@/config/config";
import App from "@/api/App";
import moment from "moment";


const store = useStore();
const isActive = ref(false);
const isLoaded = ref(false);

const toggleMenu = () => {
  isActive.value = !isActive.value;
};

const closeMenu = () => {
  isActive.value = false;
};

const getNotifications = () => {
  App.notifications()
    .then((res) => {
      if (res.data.code == "SUCCESS") {
        console.log("success");
        store.dispatch("app/setData", res.data.data);
        store.dispatch("app/setCount", res.data.count);
        store.dispatch("app/sethighlighted", res.data.highlighted);
      }
    })
    .catch((error) => {
      // Assuming you have a method to handle API errors
      console.error("API Error", error);
    })
    .finally(() => {
      isLoaded.value = true;
    });
};
const ChangeStatus = () => { 
  App.Changestatus().then((res) => { if (res.data.code == "SUCCESS") {
        store.dispatch("app/updatestatus", res.data.data);
      }}).catch((error) =>{     
         console.error("API Error", error);
    }).finally(() => {
      isLoaded.value = true;
    });

}
onMounted(() => {
  getNotifications();
});

const notifications = computed(() => store.getters["app/notifications"]);
</script>

<style></style>
