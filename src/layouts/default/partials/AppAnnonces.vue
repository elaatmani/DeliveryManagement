<template>
    <transition 
        class="tw-duration-500"
      enter-from-class="!tw-opacity-0"
      leave-to-class="!tw-opacity-0"
    >
        <div v-if="alerts.fetched &&  data.length" class="tw-space-y-2 tw-mb-5 tw-opacity-100">
          <div v-for="a in data" :key="a.id"
          :class="[a.variant == 'danger' && 'tw-bg-rose-500', a.variant == 'info' && 'tw-bg-cyan-500', a.variant == 'warning' && 'tw-bg-amber-500', a.variant == 'success' && 'tw-bg-emerald-500']"
          class="tw-h-fit tw-w-full tw-border tw-border-solid ">
              <div class="tw-flex tw-items-start ">
                  <div class="tw-p-2">
                      <icon icon="line-md:bell-alert-loop" class="tw-text-2xl tw-text-white" />
                  </div>
      
                  <div class="tw-p-2">
                      <p class="tw-text-white tw-font-semibold">{{ a.content }}</p>
                  </div>
                  <div v-if="a.closeable" class="tw-flex-1"></div>
                  <div v-if="a.closeable" class="tw-pt-2 tw-pr-2">
                      <button @click="closeAlert(a.id)" class="tw-p-1 hover:tw-bg-white/10 tw-duration-200 tw-rounded-full">
                        <icon icon="iconamoon:close-duotone" class="tw-text-white tw-text-lg" />
                      </button>
                  </div>
      
              </div>
          </div>
        </div>
    </transition>
</template>

<script setup>
import store from '@/store/'
import { computed, ref } from 'vue';

const alerts = computed(() => store.getters['app/alerts']);
const user = computed(() => store.getters['user/user']);
const closedAlerts = ref([])
const data = computed(() => alerts.value.data.filter(a => !closedAlerts.value.includes( user.value.id + '*' + a.id)));


const closeAlert = (id) => {
    closedAlerts.value.push(user.value.id + '*' +id);
    localStorage.setItem('closed_alerts', JSON.stringify(closedAlerts.value))
}

const getClosed = () => {
    const closed = localStorage.getItem('closed_alerts')
    if(closed == null) {
        localStorage.setItem('closed_alerts', JSON.stringify([]))
    } else {
        closedAlerts.value = JSON.parse(closed)
    }

}

getClosed();

</script>

<style>

</style>