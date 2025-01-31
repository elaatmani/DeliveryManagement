<template>
    <div class="dashboard-container">
      <!-- Loading State -->
      <div v-if="loading" class="skeleton-loader">
        <div
          v-for="i in 5"
          :key="i"
          class="skeleton-capsule"
          :style="{ '--delay': `${i * 0.1}s` }"
        >
          <div class="skeleton-progress"></div>
        </div>
      </div>
  
      <!-- Content State -->
      <div v-else class="data-visualization">
        <div class="header-section">
          <div>
            <div>
                <div class="tw-flex tw-items-center tw-justify-between tw-gap-2">
                    <h2 class="title tw-font-bold !tw-m-0">Cancellation Overview</h2>
                    <p class="tw-px-1 tw-bg-black tw-text-white tw-text-sm tw-rounded">{{ new
                    Intl.NumberFormat().format(total)
                    }}</p>
                </div>
                <p class="updated-text">Updated: {{ lastUpdated }}</p>
                
            </div>
            
            
          </div>
          <div class="filters tw-min-w-[200px]">
              <v-select
                v-model="selectedProduct"
                :options="products"
                label="name"
                :reduce="product => product.id"
                placeholder="Select a product"
                :clearable="false"
                @input="handleProductChange"
              >
                <template #option="{ name }">
                  {{ name }}
                </template>
                <template #selected-option="{ name }">
                  {{ name }}
                </template>
                <template #no-options>
                  <div class="tw-p-2 tw-text-gray-500 tw-text-sm">
                    No products found
                  </div>
                </template>
              </v-select>
            </div>
            
        </div>
  
        <!-- Empty State -->
        <div v-if="reasons.length === 0" class="empty-state">
          <div class="empty-icon">📊</div>
          <p class="empty-text">No cancellation data available</p>
          <p class="empty-subtext">Start tracking orders to see insights</p>
        </div>
  
        <!-- Data Visualization -->
        <template v-else>
          <!-- Color Legend -->
          <div class="legend-container">
            <div
              v-for="(color, index) in colors"
              :key="index"
              class="legend-item"
              :style="{ backgroundColor: `rgb(${color})` }"
            >
              {{ reasons[index].reason }}
            </div>
          </div>
  
          <!-- Compact Capsule List -->
          <div class="capsule-list">
            <div
              v-for="(reason, index) in reasons"
              :key="index"
              class="data-capsule group"
              :style="{
                '--progress': `${(reason.orders / max) * 100}%`,
                '--color-rgb': colors[index],
              }"
            >
              <div class="capsule-progress"></div>
              <div class="capsule-content">
                <span class="reason-text">{{ reason.reason }}</span>
                <div class="stats-container">
                  <span class="reason-count">{{ reason.orders }}</span>
                  <span class="percentage">
                    {{ ((reason.orders / total) * 100).toFixed(1) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from "vue";
  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';
  import CancelReason from "@/api/CancelReason";
  
  const loading = ref(true);
  const reasons = ref([]);
  const products = ref([]);
  const selectedProduct = ref(null);
  const lastUpdated = ref(new Date().toLocaleDateString());
  const colors = ref([]);
  
  // Generate dynamic colors
  const generateColors = (count) => {
    const hueStep = 360 / Math.max(count, 1);
    return Array.from({ length: count }, (_, i) => {
      const hue = i * hueStep;
      return hslToRgb(hue, 70, 60);
    });
  };
  
  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return `${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}`;
  };
  
  watch(reasons, (newReasons) => {
    colors.value = generateColors(newReasons.length);
  });

  watch(selectedProduct, () => {
    handleProductChange();
  });
  
  const total = computed(() =>
    reasons.value.reduce((sum, item) => sum + item.orders, 0)
  );
  
  const max = computed(() =>
    reasons.value.length > 0 ? Math.max(...reasons.value.map((r) => r.orders)) : 0
  );
  
  const fetchProducts = async () => {
    try {
      const res = await CancelReason.products();
      if (res.data.code === "SUCCESS") {
        products.value = [{ id: null, name: 'All Products' }, ...res.data.data];
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };
  
  const getData = async (productId = null) => {
    loading.value = true;
    try {
      const res = await CancelReason.analytics({ product_id: productId });
      if (res.data.code === "SUCCESS") {
        reasons.value = res.data.data.sort((a, b) => b.orders - a.orders);
        lastUpdated.value = new Date().toLocaleDateString();
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      loading.value = false;
    }
  };
  
  const handleProductChange = () => {
    getData(selectedProduct.value);
  };
  
  onMounted(async () => {
    await fetchProducts();
    await getData();
  });
  </script>
  
  <style scoped>
  .dashboard-container {
    @apply tw-bg-white tw-p-4 tw-rounded-xl tw-shadow-sm tw-border tw-border-gray-100;
    min-width: 380px;
  }
  
  .header-section {
    @apply tw-flex tw-justify-between tw-items-start tw-mb-4;
  }
  
  .title {
    @apply tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-1;
  }
  
  .updated-text {
    @apply tw-text-xs tw-text-gray-400;
  }
  
  .total-badge {
    @apply tw-bg-gray-50 tw-px-3 tw-py-2 tw-rounded-lg tw-text-right;
  }
  
  .total-number {
    @apply tw-block tw-text-lg tw-font-bold tw-text-gray-800;
  }
  
  .total-label {
    @apply tw-text-xs tw-text-gray-500;
  }
  
  .filters {
    @apply tw-mb-4 tw-max-w-xs;
  }
  
  :deep(.vs__dropdown-toggle) {
    @apply tw-border tw-border-gray-200 tw-rounded-lg tw-px-3 tw-py-2 tw-min-h-[42px];
  }
  
  :deep(.vs__search) {
    @apply tw-text-sm tw-m-0;
  }
  
  :deep(.vs__dropdown-menu) {
    @apply tw-border tw-border-gray-200 tw-rounded-lg tw-mt-1 tw-py-1;
  }
  
  :deep(.vs__dropdown-option) {
    @apply tw-px-3 tw-py-2 tw-text-sm hover:tw-bg-gray-50 tw-truncate tw-text-black;
  }
  
  :deep(.vs__dropdown-option--highlight) {
    @apply tw-bg-gray-100;
  }
  
  :deep(.vs__actions) {
    @apply tw-py-0;
  }
  
  .empty-state {
    @apply tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-8 tw-px-4 tw-text-center;
  }
  
  .empty-icon {
    @apply tw-text-4xl tw-mb-4 tw-opacity-50;
  }
  
  .empty-text {
    @apply tw-text-gray-600 tw-font-medium tw-mb-1;
  }
  
  .empty-subtext {
    @apply tw-text-sm tw-text-gray-400;
  }
  
  .capsule-list {
    @apply tw-space-y-2;
  }
  
  .data-capsule {
    @apply tw-relative tw-h-12 tw-bg-gray-50 tw-rounded-full 
           tw-transition-all tw-duration-200 ;
  }
  
  .capsule-progress {
    @apply tw-absolute tw-inset-y-0 tw-left-0 tw-w-[var(--progress)] 
           tw-transition-all tw-duration-500 tw-opacity-90;
    background-color: rgba(var(--color-rgb), 0.08);
  }
  
  .capsule-content {
    @apply tw-absolute tw-inset-0 tw-flex tw-items-center tw-px-4;
  }
  
  .reason-text {
    @apply tw-flex-1 tw-text-sm tw-font-medium tw-text-gray-700 tw-truncate;
  }
  
  .stats-container {
    @apply tw-flex tw-items-center tw-gap-2 tw-pl-2;
  }
  
  .reason-count {
    @apply tw-text-sm tw-font-semibold tw-text-gray-800;
  }
  
  .percentage {
    @apply tw-text-xs tw-text-gray-500;
  }
  
  .legend-container {
    @apply tw-flex tw-flex-wrap tw-gap-2 tw-mb-3;
  }
  
  .legend-item {
    @apply tw-px-2 tw-py-1 tw-text-xs tw-rounded-full tw-text-white 
           tw-shadow-sm tw-truncate tw-max-w-[120px];
  }
  
  .skeleton-loader {
    @apply tw-space-y-2;
  }
  
  .skeleton-capsule {
    @apply tw-relative tw-h-12 tw-bg-gray-100 tw-rounded-full tw-overflow-hidden;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    animation-delay: var(--delay);
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  </style>