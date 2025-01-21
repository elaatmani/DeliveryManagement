<template>
    <div>
      <popup-new :visible="visible" :closeable="false" @cancel="cancel">
        <div
          v-if="!loading"
          class="tw-mx-auto tw-w-[95%] md:tw-max-w-[800px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-xl tw-my-5 tw-rounded-lg tw-transform tw-animate-fadeIn">
          
          <div class="tw-flex tw-justify-between tw-items-center tw-p-4 tw-bg-gradient-to-r from-orange-500 to-orange-400 dark:tw-bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-700 tw-rounded-t-lg">
            <div class="tw-text-xl tw-font-semibold">
              Goal Progression for {{ currentMonthName() }}
            </div>
          
            <button
              @click="cancel"
              class="tw-py-2 tw-px-4 tw-rounded-full tw-text-sm tw-border tw-border-solid tw-border-transparent dark:hover:tw-bg-neutral-600 hover:tw-bg-gray-300 tw-bg-gray-100 dark:tw-bg-neutral-700 tw-text-neutral-800 dark:tw-text-neutral-300 tw-transition tw-duration-300">
              ×
            </button>
          </div>
  
          <div v-if="user.role == 'admin'" class="tw-p-6">
            <div
              v-for="(m, index) in sortedData"
              :key="m.marketer_id"
              class="tw-bg-gray-50 dark:tw-bg-neutral-800 tw-p-4 tw-rounded-lg tw-shadow-md tw-mb-4">
              
              <div class="tw-flex tw-justify-between tw-items-center">
                <div class="tw-font-bold tw-text-lg tw-text-gray-800 dark:tw-text-gray-200">
                  #{{ index + 1 }} {{ m.marketer_name }}
                </div>
                <div class="tw-text-sm tw-text-gray-500">
                  Leads: {{ m.leads }}
                </div>
              </div>
  
              <div class="tw-h-8 tw-rounded-full tw-bg-gray-300 dark:tw-bg-neutral-700 tw-mt-4 tw-relative">
                <div
                  :style="{
                    width: `${Math.min((m.leads / m.goal) * 100, 100)}%`,
                    background: getProgressColor(m.leads, m.goal),
                  }"
                  class="tw-h-full tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-sm tw-transition-all tw-duration-700">
                  {{ ((m.leads / m.goal) * 100).toFixed(0) }}%
                </div>
              </div>
            </div>
          </div>
          <div v-if="user.role == 'admin' " class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid">
                <button @click="previousMonth" class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-bg-gray-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-gray-600 dark:tw-border-neutral-900 dark:hover:tw-border-gray-500 hover:tw-bg-gray-500/80 dark:hover:tw-bg-gray-400 tw-duration-300 tw-text-white">
                    Previous
                </button>
                <button @click="nextMonth" class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-bg-gray-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-gray-600 dark:tw-border-neutral-900 dark:hover:tw-border-gray-500 hover:tw-bg-gray-500/80 dark:hover:tw-bg-gray-400 tw-duration-300 tw-text-white">
                    Next
                </button>
            </div>
        <div class="tw-flex tw-justify-end tw-p-6 tw-border-t dark:tw-border-neutral-700 tw-border-gray-300">
            <div class="tw-flex tw-items-center tw-space-x-4">
        <transition name="slide-fade">
        <div v-if="showInput" class="tw-relative tw-animate-slideIn">
            <input
            v-model="goal"
            type="number"   
            class="tw-py-2 tw-px-4 tw-border tw-rounded-lg tw-shadow-inner tw-border-gray-300 dark:tw-border-neutral-700 dark:tw-bg-neutral-800 tw-bg-gray-100 tw-text-gray-800 dark:tw-text-gray-200 focus:tw-ring-2 focus:tw-ring-orange-500 tw-outline-none tw-transition tw-duration-300 tw-w-40 md:tw-w-60"
            />
            <span
            v-if="goal === null || goal === ''"
            class="tw-absolute tw-top-1/2 tw-left-4 tw-transform -tw-translate-y-1/2 tw-text-gray-400 tw-pointer-events-none tw-text-sm">
            Set your goal
            </span>
        </div>
        </transition>

    <transition name="fade">
      <button
        v-if="showInput"
        @click="cancelGoal"
        class="tw-py-2 tw-px-5 tw-rounded-lg tw-bg-red-400 hover:tw-bg-red-500 dark:tw-bg-red-500 dark:hover:tw-bg-red-600 tw-text-white tw-font-medium tw-border tw-border-transparent hover:tw-border-red-600 dark:hover:tw-border-red-700 tw-shadow-md tw-transition-all tw-duration-300 tw-animate-pulse">
        Cancel
      </button>
    </transition>

    <button
      @click="showInput ? updateGoall() : showInput = true"
      class="tw-py-2 tw-px-6 tw-rounded-lg tw-bg-orange-500 hover:tw-bg-orange-600 dark:tw-bg-orange-600 dark:hover:tw-bg-orange-700 tw-text-white tw-font-medium tw-border tw-border-transparent hover:tw-border-orange-600 dark:hover:tw-border-orange-700 tw-shadow-lg tw-transition-all tw-duration-300 tw-transform hover:tw-scale-110">
      {{ showInput ? 'Add Goal' : 'Set Goal' }}
    </button>
  </div>
          </div>

        </div>
  
        <div v-else class="tw-flex tw-justify-center tw-items-center tw-h-64">
          <Loading />
        </div>
      </popup-new>
    </div>
  </template>

<style>
.slide-fade-enter-active {
  transition: all 0.4s ease-in-out;
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-in-out;
  transform: translateX(-20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.tw-animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
</style>

<script>
import Analytics from '@/api/Analytics'
import store from '@/store/'

export default {
    props: {
      visible: {
        required: true,
      },
    },
    data() {
        return {
            currentMonth: '',
            currentDate: new Date(), 
            loading: false,
            data: [
            ],
            errors: [{
                marketer_id: null,
            }],
            items: [{
                marketer_id: 0,
            }],
            showInput: false,
            goal: null,
        }
    },
    computed: {
       
        user() {
            return store.getters["user/user"];
        },
        users() {
            return store.getters['user/users']
        },
        marketers() {
            return this.fetched ? this.users.filter(u => u.role.name == 'marketer') : []
        },
        fetched() {
            return store.getters['user/fetched']
        },
        sortedData() {
         return [...this.data].sort((a, b) => b.leads - a.leads);
        },
    },
    methods: {
        currentMonthName() {
            return this.currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        },
        getProgressColor(leads, goal) {
            const percentage = (leads / goal) * 100;
            if (percentage < 50) {
                return 'linear-gradient(to right, #FFB199, #FF0844)'; 
            } else if (percentage < 75) {
                return 'linear-gradient(to right, #FFD54F, #FFA726)'; 
            } else {
                return 'linear-gradient(to right, #66BB6A, #43A047)'; 
            }
        },
        previousMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.currentMonth = this.currentDate.toISOString().slice(0, 7);
            this.getData();
        },

        nextMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.currentMonth = this.currentDate.toISOString().slice(0, 7);
            this.getData();
        },

        async updateGoall() {
            await Analytics.updateGoal({ goal: this.goal })
                .then(
                
                    this.$alert({
                        type: "success",
                        title: "Your goal has been set",
                    })
               
                )
            this.showInput = false;
            this.goal = null;
        },
        async getData() {
            this.loading = true;
            await Analytics.Goalprogression(this.currentDate.toISOString().slice(0, 7))
                .then(
                    res => {
                        if (res.data.code == 'SUCCESS') {
                            this.data = res.data.data.leads_per_month;
                        }
                    },
                    err => {
                        console.log(err)
                    }
                )
            this.loading = false;
        },
        cancelGoal() {
            this.showInput = false;
            this.goal = null;
        },
        cancel() {
            if (this.isLoading) return false;
            this.$emit("update:visible", false);
        },
    },
    created() {
        this.currentMonth = this.currentDate.toISOString().slice(0, 7);
        this.getData();
    }
}
</script>