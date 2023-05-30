<template>
    <div :key="sheets.length">
      <div class="mb-5 tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Google Sheets</h1>
          <h2 class="tw-text-gray-500 tw-text-sm">Manage your google sheets</h2>
        </div>
        <div >
            <v-btn
            color="primary-color"
            @click="showPopup = true"
            variant="flat"
            class="text-capitalize"
            >
            <v-icon icon="mdi-plus" class="mr-2 text-white"></v-icon>
            <span class="text-white"> Add Sheet </span>
            </v-btn>
        </div>
      </div>
  
      <div v-if="!isLoaded">
            <LoadingAnimation />
      </div>

      <div v-if="isLoaded" class="py-5 px-5 tw-mb-5 tw-border bg-white tw-w-full tw-rounded-md">
        <div class="tw-flex tw-items-center tw-gap-2">
          <h1>Application's email</h1>
          <button @click="copy" class="tw-bg-gray-100 tw-border tw-border-gray-300 tw-rounded tw-w-[30px] tw-h-[30px] tw-text-gray-500 hover:tw-text-gray-700 tw-duration-300 tw-border-solid hover:tw-border-gray-400">
            <v-icon class="tw-text-xs">mdi-content-copy</v-icon>
          </button>
        </div>
        <div class="tw-bg-gray-100 tw-border tw-border-gray-300 tw-rounded tw-py-2 tw-px-2 tw-text-sm tw-mt-2 tw-text-gray-700">
          {{ email }}
        </div>
        <p class="tw-mt-1 tw-text-xs tw-text-gray-400">
          Use this email to give access to Google Sheets
        </p>
      </div>
  
      <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
  
        <div class="mb-5 tw-flex">
          <v-btn @click="showFilters = !showFilters" icon rounded="lg" variant="flat" size="small" color="primary-color" class="text-white">
            <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
          </v-btn>
          <div class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
            <v-img width="18" height="18" max-width="18" class="ma-0 pa-0" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
            <input v-model="search" type="text" class="ml-2 tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by name">
          </div>
        </div>
  
        <div class="tw-max-h-0 tw-duration-500 tw-overflow-hidden" :class="{'!tw-max-h-[500px]': showFilters}">
          <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-mb-4">
            
  
            <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit"> 
              <span class="tw-text-sm tw-text-neutral-600">Date</span>
              <div class="tw-relative">
                <input type="date" v-model="date" class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm" />
              </div>
            </div>
          </div>
        </div>
  
        <div class="">
          <SheetsTable :sheets="sheets" />
        </div>
  
        <AddSheet @cancel="showPopup = false" :visible="showPopup" />
      </div>
    </div>
  </template>
  
  <script>
  import {localUrl} from '@/config/config'
  import SheetsTable from './SheetsTable.vue'
  import AddSheet from './partials/AddSheet'
  import Sheet from '@/api/Sheet'
  
  export default {
    components: {  SheetsTable, AddSheet },
    data() {
      return {
        localUrl,
        isLoaded: false,
        showFilters: false,
        date: null,
        search: '',
        showPopup:false,
        email: 'new-service-account@testing-379416.iam.gserviceaccount.com'
        
      }
    },
    computed: {
      sheets() {
        return this.$store.getters['sheet/sheets'];
      },
    },

    methods: {
        getSheets() {
            this.isLoaded = false;
            return Sheet.all()
            .then(
                (res) => {
                    if(res.data.code == "SUCCESS") {
                        this.$store.dispatch('sheet/setSheets', res.data.data.sheets);
                    }
                    return res;
                },
                this.$handleApiError
            )
            .finally(
                () => {
                    this.isLoaded = true
                }
            )
        },
        copy() {
          navigator.clipboard.writeText(this.email)
          this.$alert({
            title: 'Email Copied !',
            type: 'success'
          })
        }
    },

    mounted() {
        this.getSheets()
    }
  }
  </script>
  
  <style>
  </style>