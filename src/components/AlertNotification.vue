<template>
  <teleport to="body">
    <div
      v-if="Alertnotif && showAlert"
      class="tw-w-[400px] tw-fixed tw-top-[70px] !tw-z-[510000] tw-right-[5px]"
    >
      <v-alert
       :text="Alertnotif.message"
        color="white"
        border="top"
        border-color="success"
        elevation="2"
        density="compact"
      >
        <template v-slot:append>
          <button
            @click="ChangeStatus"
            class="tw-text-gray-400 hover:tw-text-gray-500"
          >
            x
          </button>
        </template>
        <div
          class="tw-mb-1 tw-text-xs tw-font-normal tw-text-gray-400 sm:tw-order-last sm:tw-mb-0 tw-whitespace-nowrap tw-ml-[70%]"
        >
          {{ moment(Alertnotif.created_at).fromNow() }}
        </div>
      </v-alert>
    </div>
  </teleport>
</template>

<script setup>
import { ref,computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import App from "@/api/App";



const showAlert = ref(true);
const store = useStore();

const ChangeStatus = () => { 
  console.log("ixi");
  App.Changestatus().then((res) => { if (res.data.code == "SUCCESS") {
        store.dispatch("app/updatestatus", res.data.data);
      }}).catch((error) =>{     
         console.error("API Error", error);
    }).finally(() =>{
      showAlert.value = false;
    }
    )
 }
const Alertnotif = computed(() => store.getters["app/notifications"].highlighted);
console.log(Alertnotif.value);

</script>
