<template>
    <div class="py-5 tw-min-h-[calc(100dvh-110px)] px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <h1 class="tw-text-lg tw-pl-1">Notifications</h1>
      <div v-if="!isLoaded">
            <div class="tw-py-10 tw-flex tw-items-center tw-justify-center">
              <v-icon size="large" class="tw-animate-spin" color="primary-color"
                >mdi-loading</v-icon
              >
            </div>
          </div>
        <div v-if="isLoaded"  class="tw-relative tw-h-full tw-flex-col tw-flex tw-overflow-x-auto sm:tw-rounded-lg">
          <div v-if="notifications.data == ''">
                <p class="tw-text-center tw-py-4">No messages available. </p>
            </div>
            <table class="tw-w-full tw-text-left tw-text-gray-500">
               <div  v-for="(notification) in notifications.data" :key="notification.id" scope="col"
               :class="{'bg-white': notification.status == 'read'}"
                           class="tw-bg-orange-50 tw-py-3 tw-px-1 text-truncate">
                            <div class="tw-w-fit tw-flex tw-flex-col tw-whitespace-nowrap text-black"  >
                                {{ notification.message }}
                            </div>
                            <div
                    class="tw-mb-1 tw-text-xs tw-font-normal tw-text-gray-400 tw-whitespace-nowrap"
                  >
                    {{ moment(notification.created_at).fromNow() }}
                  </div>
               </div>
    
            </table>
            <div class="tw-flex-1 tw-mt-auto"></div>
            <TablePaginationNoNums v-if="isLoaded" @page-change="onPageChange" :per-page="data.per_page" :last-page="data.last_page" :from="data.from" :to="data.to" :total="data.total" :current-page="data.current_page"/>
        </div>

        <!-- Pagination -->
      </div>
      </template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import TablePaginationNoNums from "@/components/TablePaginationNoNums.vue";
import App from "@/api/App";
import moment from "moment";


const store = useStore();
const isLoaded = ref(false);
const data = ref(null)

const onPageChange = (n)=>{
  data.value.page = n;
  getNotifications();
}
const getNotifications = async () => {
  const params = {...data.value,data:null}
  isLoaded.value = false;
  await App.AllNotifications(params)
    .then((res) => {
      if (res.data.code == "SUCCESS") {
        console.log("success");
        store.dispatch("app/setAllNotifications", res.data.data);
        data.value = res.data.data
      }
    })
    .catch((error) => {
      // Assuming you have a method to handle API errors
      console.error("API Error", error);
    });
    isLoaded.value = true;
};
onMounted(() => {
  getNotifications();
});
const notifications = computed(() => store.getters["app/notifications"].all);


</script>