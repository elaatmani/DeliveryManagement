<template>
  <div>
    <popup-new :visible="visible" :closeable="false" @cancel="cancel">
      <div
        class="tw-mx-auto tw-w-[95%] md:tw-max-w-[800px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg">
        <div
          class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50">
          Ads Informations
        </div>

        <div class="tw-bg-white tw-p-4">
          <div class="tw-grid tw-gap-6 tw-gap-y-5 tw-grid-cols-1 md:tw-grid-cols-2">
            <div class="tw-col-span-2 md:tw-col-span-1">
              <label
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Ad account id</label>
              <input v-model="items.ad_account_id" @input="errors.ad_account_id = null"
                :class="[errors.ad_account_id && '!tw-border-red-400']" type="text"
                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                required />

              <label v-if="errors.ad_account_id"
                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{ errors.ad_account_id
                }}</label>
            </div>
            <div class="tw-col-span-2 md:tw-col-span-1">
              <label
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Name</label>
              <input v-model="items.name" @input="errors.name = null"
                :class="[errors.name && '!tw-border-red-400']" type="text"
                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                required />

              <label v-if="errors.name"
                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{ errors.name
                }}</label>
            </div>
            <div v-if="user.role == 'admin' " class="tw-col-span-2 md:tw-col-span-1">
              <label
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Marketer </label>
              <select @change="errors.marketer_id = null" v-model="items.marketer_id"
                :class="[errors.marketer_id && '!tw-border-red-400']" required
                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500">
                <option :value="0" selected>Choose Marketer</option>
                <option v-for="m in marketers" :key="m.id" :value="m.id">
                  {{ m.firstname }} {{m.lastname}}
                </option>
              </select>
              <label v-if="errors.marketer_id"
                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                errors.marketer_id }}</label>
            </div>
          </div>
        </div>
        <div class="md:tw-col-span-6 tw-col-span-12 tw-m-5">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Auto Fetch</div>
            <label class="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer tw-w-fit tw-scale-75">
                <input v-model="items.auto_fetch" type="checkbox" class="tw-sr-only tw-peer" />
                <div
                    class="tw-flex tw-items-center peer-checked:tw-bg-emerald-500 tw-w-11 tw-h-6 tw-bg-gray-200 peer-focus:tw-outline-none tw-rounded-full tw-peer dark:tw-bg-neutral-600 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600">
                </div>
            </label>
          </div>
        <div
          class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid">
          <button @click="cancel"
            class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
            Cancel
          </button>
          <button @click="handleCreate" :disabled="isLoading"
            class="tw-py-2 tw-px-7 tw-flex tw-items-center tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
            <v-icon size="small" class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
              :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
            <span>Create</span>
          </button>
        </div>
      </div>
    </popup-new>
  </div>
</template>

<script>
  import { validate } from "../lib/validate";
  import { create } from "../lib/create";
  export default {
    props: {
      visible: {
        required: true,
      },
    },

    data() {
      return {
        isLoading: false,

        items: {
          ad_account_id:null,
          name:null,
          auto_fetch:0,
          marketer_id:0,
          
        },

        errors: {
          ad_account_id:null,
          name:null,
          marketer_id:null,
        
        },
      };
    },

    computed: {
    
      user() {
      return this.$store.getters["user/user"];
      },
      users() {
        return this.$store.getters['user/users']
      },
      marketers() {
        return this.fetched ? this.users.filter(u => u.role.name == 'marketer') : []
      },
      fetched() {
        return this.$store.getters['user/fetched']
      },
    },

    methods: {
      handleCreate() {
        const validated = validate(this, this.items);
        if (!validated) return false;

        create(this, this.items);
      },

      cancel() {
        if (this.isLoading) return false;
        this.$emit("update:visible", false);
      },

    },


  };
</script>

<style></style>