<template>
  <div class="py-5 px-2 tw-border tw-bg-white tw-w-full tw-rounded-md tw-mb-5 ">

    <section class="tw-px-3 tw-h-fit">
    <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <div>
            <div class="tw-flex tw-items-center tw-gap-x-3">
                <h2 class="tw-text-lg tw-font-medium tw-text-gray-800 darkx:tw-text-white">New Orders</h2>
            </div>

            <p class="tw-mt-1 tw-text-sm tw-text-gray-500 darkx:tw-text-gray-300">take responsibility for new orders.</p>
        </div>

        <div class="tw-flex tw-items-center tw-mt-4 tw-gap-x-3">

            <button :disabled="fetching" @click="getOrder" class="tw-flex tw-items-center tw-justify-center  tw-px-5 tw-py-2 tw-text-sm tw-tracking-wide tw-text-white tw-transition-colors tw-duration-200 tw-bg-orange-500 tw-rounded-lg shrink-0 sm:tw-w-auto tw-gap-x-2 hover:tw-bg-orange-600 darkx:hover:tw-bg-orange-500 darkx:tw-bg-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="tw-w-5 tw-h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Get Order</span>
            </button>
        </div>
    </div>

    <div v-if="fetching" class="tw-p-5">
        <loading />
    </div>

    <div v-if="!fetching && order_exists" class="tw-mt-5 tw-space-y-5">

        <OrderCard :order="order" @update="o => order = o" />

        <template v-if="doubles.length" >
            <OrderCard :double="true" v-for="db in doubles" :key="db.id" :order="db" @update="o => doubles = doubles.map(d => d.id == o.id ? o : d)" />
        </template>

        <div class="tw-flex tw-items-center tw-justify-end">
            <button @click="save" type="button" class="tw-px-5 tw-py-2 tw-text-sm  tw-gap-2 tw-font-medium tw-text-white tw-inline-flex tw-items-center tw-bg-orange-500 hover:tw-bg-orange-600 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-orange-100 tw-rounded-lg tw-text-center dark:tw-bg-orange-600 dark:hover:tw-bg-orange-700 dark:focus:tw-ring-orange-800">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" d="M21.455 5.416a.75.75 0 0 1-.096.943l-9.193 9.192a.75.75 0 0 1-.34.195l-3.829 1a.75.75 0 0 1-.915-.915l1-3.828a.778.778 0 0 1 .161-.312L17.47 2.47a.75.75 0 0 1 1.06 0l2.829 2.828a.756.756 0 0 1 .096.118Zm-1.687.412L18 4.061l-8.518 8.518l-.625 2.393l2.393-.625l8.518-8.519Z" clip-rule="evenodd"/><path fill="white" d="M19.641 17.16a44.4 44.4 0 0 0 .261-7.04a.403.403 0 0 1 .117-.3l.984-.984a.198.198 0 0 1 .338.127a45.91 45.91 0 0 1-.21 8.372c-.236 2.022-1.86 3.607-3.873 3.832a47.77 47.77 0 0 1-10.516 0c-2.012-.225-3.637-1.81-3.873-3.832a45.922 45.922 0 0 1 0-10.67c.236-2.022 1.86-3.607 3.873-3.832a47.75 47.75 0 0 1 7.989-.213a.2.2 0 0 1 .128.34l-.993.992a.402.402 0 0 1-.297.117a46.164 46.164 0 0 0-6.66.255a2.89 2.89 0 0 0-2.55 2.516a44.421 44.421 0 0 0 0 10.32a2.89 2.89 0 0 0 2.55 2.516c3.355.375 6.827.375 10.183 0a2.89 2.89 0 0 0 2.55-2.516Z"/></svg> -->
                Save
            </button>
        </div>
    </div>

    <div v-if="!fetching && !order_exists">
        <div class="tw-p-5 tw-border tw-border-solid tw-shadow-sm tw-mt-5 tw-text-center tw-font-medium tw-text-xl tw-text-gray-600 tw-bg-gray-100 tw-w-full tw-rounded-lg">
            No Orders
        </div>
    </div>


</section>

      

  </div>
</template>

<script>
import { toConfirm, getOrder, save } from '@/views/newagent/partials/lib/add_order';
import OrderCard from '@/views/newagent/partials/components/OrderCard';

// import UpdatePopup from '@/views/newagent/partials/components/UpdatePopup';

export default {
  components: { OrderCard },

  data() {
    return {
        fetching: true,
        order_exists: false,
        doubles: [],

        order: null,
    }
  },

  methods: {
    toConfirm() {
        toConfirm(this);
    },

    getOrder() {
        getOrder(this);
    },

    save() {
        save(this);
    },
  },


  mounted() {
    this.toConfirm()
  }
};
</script>

<style>
</style>