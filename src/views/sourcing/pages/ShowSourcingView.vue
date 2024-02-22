<template>
    <div v-if="fetching" class="tw-h-[calc(100vh-170px)] tw-flex tw-items-center tw-justify-center tw-rounded-md tw-border tw-bg-white">
        <loading />
    </div>
    <template v-if="!fetching">
      <AdminShowSourcingView :sourcing="sourcing" :loading="fetching" v-if="user.role == 'admin'" />
    </template>
  </template>
  
  
  <script setup>
  import { useStore } from "vuex";
  import AdminShowSourcingView from './admin/ShowSourcingView';
  import { useRoute, useRouter } from "vue-router";
  import Sourcing from "@/api/Sourcing";
  import { ref, provide } from "vue";
  
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const id = route.params.id;
  const fetching = ref(true);
  const sourcing = ref(null);
  const user = store.getters['user/user'];
  
  
  const getSourcing = async () => {
    fetching.value = true;
    await Sourcing.get(id)
    .then(
      res => {
        if(res.data.code == 'SUCCESS') {
          sourcing.value = res.data.sourcing;
        }
  
        if(res.data.code == 'NOT_FOUND') {
          router.push({ name: '404' })
        }
      }
    )
    fetching.value = false;
  }
  
  const updateSourcing = (newSourcing) => {
    sourcing.value = newSourcing;
  }
  
  provide('sourcing', {
    updateSourcing
  })
  
  getSourcing();
  
  </script>