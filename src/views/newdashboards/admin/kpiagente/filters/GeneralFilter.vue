<template>
    <div class="tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-3">
      <div class="tw-p-1 tw-bg-gray-100 tw-rounded tw-w-full md:tw-flex tw-flex-wrap tw-justify-center md:tw-justify-between">
        <div class=" tw-w-full md:tw-w-fit tw-mb-2 md:tw-mb-0">
          <button 
            class="tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-w-full tw-px-2 tw-py-2 tw-shadow-sm" 
            @click="toggleDatePicker"
          >
            Date : {{ selectedRange }} 
          </button>
        </div>
        <!-- <div class="tw-w-full md:tw-w-fit tw-mb-2 md:tw-mb-0">
          <span v-if="comparisonResult.date">Comparison Date: {{ comparisonResult.date }}</span>
          <span v-if="comparisonResult.facebook">Facebook: {{ comparisonResult.facebook.comparison }} ({{ comparisonResult.facebook.percentageChange }}%)</span>
          <span v-if="comparisonResult.tiktok">TikTok: {{ comparisonResult.tiktok.comparison }} ({{ comparisonResult.tiktok.percentageChange }}%)</span>
        </div> -->
        <div v-if="showDatePicker" class="tw-z-50 tw-bg-white tw-rounded tw-shadow-lg tw-p-4 md:tw-mt-12 tw-mt-0 tw-w-3/4 md:tw-w-1/4 tw-absolute">
          <div class="tw-w-fit tw-flex tw-justify-center md:tw-flex-wrap" v-show="!isMobile">
            <button
              v-for="option in dateOptions"
              :key="option.value"
              class="tw-bg-white tw-z-50 tw-my-2 tw-border tw-border-gray-500 tw-rounded tw-px-4 tw-py-2 tw-mr-2 tw-w-[150px] tw-shadow-md hover:tw-bg-orange-500 hover:tw-text-white"
              @click="selectDateRange(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
          <select 
            class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
            v-show="isMobile" 
            v-model="selectedRange" 
            @change="selectDateRange(selectedRange)"
          >
            <option v-for="option in dateOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <hr class="tw-my-2"/>
          <div class="tw-flex-1">
            <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <input 
                type="date" 
                class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-mr-2 tw-p-2.5"
                v-model="startDate"
              >
              <span>→</span>
              <input 
                type="date" 
                class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-ml-2 tw-p-2.5"
                v-model="endDate"
              >
            </div>
            <div class="tw-flex md:tw-justify-end">
              <button class="tw-bg-gray-200 tw-border tw-border-gray-300 tw-rounded tw-px-4 tw-py-2 tw-mr-2" @click="cancel">Cancel</button>
              <button class="tw-bg-gray-900 tw-text-white tw-rounded tw-px-4 tw-py-2" @click="apply">Apply</button>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full md:tw-w-[200px] tw-mb-2 md:tw-mb-0 md:tw-mr-2 tw-mr-0 ">
            <vue-select 
              :multiple="true"
              :reduce="agente => agente.agente_id" 
              :clearable="false" 
              class="tw-bg-white tw-items-center tw-border-solid tw-outline-none tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block md:tw-w-[200px] tw-w-full"
              v-model="selectedAgenteId" 
              :options="[...agenteOptions]" 
              label="name"
              placeholder="Select a agente" 
            >
            </vue-select>
          </div>
        
          <div class="tw-w-full md:tw-w-fit tw-mb-2 md:tw-mb-0 md:tw-mr-2 tw-mr-0">
          <button class="tw-bg-orange-500 tw-text-white tw-rounded tw-px-4 tw-h-[33px] md:tw-ml-2 tw-ml-0 tw-w-full" @click="send">Filter</button>
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted, defineComponent,watch,defineEmits } from 'vue';
  import { useStore } from 'vuex';
  // import Dashboard from '@/api/Dashboard';

  import vueSelect from 'vue-select';
  
  defineComponent({
    components: {
      'vue-select': vueSelect
    },
  });
  const emit = defineEmits(['filter-changed']);
  const store = useStore();
  const selectedAgenteId = ref(null); 
  
  const users = computed(() => store.getters['user/users']);
  const fetched = computed(() => store.getters['user/fetched']);
  const agentes = computed(() => fetched.value ? users.value.filter(u => u.role.name == 'agente') : []);
  const agenteOptions = computed(() => agentes.value.map(({ id, firstname, lastname }) => ({ agente_id: id, name: `${firstname} ${lastname}` })));

  
  const selectedRange = ref('Last 7 days');
  const isMobile = ref(window.innerWidth <= 850);
  const showDatePicker = ref(false);
  const today = new Date();
  const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const startDate = ref(sevenDaysAgo.toISOString().split('T')[0]);
  const endDate = ref(today.toISOString().split('T')[0]);
  
  
  const dateOptions = [
    { label: 'Today', value: 'Today' },
    { label: 'Yesterday', value: 'Yesterday' },
    { label: 'Last 7 days', value: 'Last 7 days' },
    { label: 'Last 30 days', value: 'Last 30 days' },
    { label: 'Last 90 days', value: 'Last 90 days' },
    { label: 'This month', value: 'This month' },
    { label: 'Last month', value: 'Last month' },
    { label: 'Last year', value: 'Last year' },
  ];
  
  const updateViewport = () => {
    isMobile.value = window.innerWidth <= 850;
  };
  
  onMounted(() => {
    window.addEventListener('resize', updateViewport);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateViewport);
  });
  
  const toggleDatePicker = () => {
    showDatePicker.value = !showDatePicker.value;
  };
  
  const selectDateRange = (range) => {
  const today = new Date();
  selectedRange.value = range;

  const dateRanges = {
    'Today': [today, today],
    'Yesterday': [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), new Date()],
    'Last 7 days': [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7), new Date()],
    'Last 30 days': [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30), new Date()],
    'Last 90 days': [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90), new Date()],
    'This month': [new Date(today.getFullYear(), today.getMonth(), 1), new Date(today.getFullYear(), today.getMonth() + 1, 0)],
    'Last month': [new Date(today.getFullYear(), today.getMonth() - 1, 1), new Date(today.getFullYear(), today.getMonth(), 0)],
    'Last year': [new Date(today.getFullYear() - 1, 0, 1), new Date(today.getFullYear() - 1, 11, 31)],

  };

  [startDate.value, endDate.value] = dateRanges[range].map(date => date.toISOString().split('T')[0]);
  showDatePicker.value = false;

};
  
  const cancel = () => {
    selectedRange.value = 'Last 7 days';
    showDatePicker.value = false;
  };
  
  const apply = () => {
    showDatePicker.value = false;
  };
  const send = () => {
  emit('filter-changed', { 
    dateRange: { startDate: startDate.value, endDate: endDate.value },
    filter: { selectedAgenteId: selectedAgenteId.value }
  });
  //  compareFbTiktok();
};
  watch([startDate, endDate], () => {
    selectedRange.value = `${startDate.value} → ${endDate.value}`;
  });
  </script>