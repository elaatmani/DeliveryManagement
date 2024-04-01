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
      <template #text>
            <p>
              {{ Alertnotif.message }}
            </p>

            <div class="tw-flex tw-items-center tw-justify-between tw-text-neutral-400 tw-mt-2">
              <span class="tw-text-xs">
                {{ moment(Alertnotif.created_at).fromNow() }}
              </span>
              <button :disabled="loading" @click="ChangeStatus" class="tw-p-0.5 tw-px-4 hover:tw-bg-neutral-100 tw-text-sm">
                {{ loading ? 'Closing...' : 'Close' }}
              </button>
            </div>
          </template>
      
      </v-alert>
    </div>
  </teleport>
</template>

<script setup>
import { ref,computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import App from "@/api/App";


const loading = ref(false);

const showAlert = ref(true);
const store = useStore();

const ChangeStatus = async () => { 
    loading.value = true;
    await App.Changestatus().then((res) => { if (res.data.code == "SUCCESS") {
          store.dispatch("app/updatestatus", res.data.data);
        }}).catch((error) =>{     
           console.error("API Error", error);
      })
      showAlert.value = false;
      loading.value = false;
   }
const Alertnotif = computed(() => store.getters["app/notifications"].highlighted);
console.log(Alertnotif.value);

</script>
