<template>
  <div class="md:tw-w-[50%] tw-relative tw-max-h-full tw-w-[95%] tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg ">
    <v-btn @click="cancel" icon="mdi-close" variant="flat" size="w-small" color="red"
    class="tw-absolute tw-top-3 tw-z-10 tw-right-3"
    ></v-btn>
    <div class="tw-p-5">
        <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500 tw-rounded-md tw-overflow-hidden">
                      <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                          <tr>
                              <th  scope="col" class="tw-px-4 tw-max-w-[50px] tw-py-3 text-truncate">
                                ID
                              </th>
                              <th scope="col" class="tw-px-6 tw-py-3 text-truncate">
                                SIZE
                              </th>
                              <th scope="col" class="tw-px-4 tw-py-3 text-truncate">
                                COLOR
                              </th>
                              <th scope="col" class="tw-px-4 tw-py-3 text-truncate">
                                QUANTITY
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(item) in state.variations" :key="item.id" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                              <td class="tw-w-4 tw-p-4">
                                {{ item.id }}
                              </td>
                              <td class="tw-w-4 tw-p-4">
                                {{ item.size }}
                              </td>
                              <td class="tw-w-4 tw-p-4">
                                {{ item.color }}
                              </td>
                              <td class="tw-w-4 tw-p-4">
                                  <div class=" tw-flex tw-items-center tw-gap-1">
                                    <span class="tw-text-green-500">{{ item.available_quantity }} </span>
                                    <span>/ {{ item.quantity }}</span>
                                    <span v-if="item.on_hold > 0">
                                      / <span class="tw-text-red-400 ">{{ item.on_hold }}</span>
                                    </span>
                                  </div> 
                              </td>
                          </tr>
                          
                      </tbody>
                  </table>

                  <div class="tw-flex tw-flex-col tw-gap-1 mt-5">
                    <div class="tw-flex tw-items-center tw-gap-1 tw-text-xs">
                      <div class="tw-w-[10px] tw-h-[10px] tw-rounded-full tw-bg-green-500"></div>
                      <span>Available quantity</span>
                    </div>
                    <div class="tw-flex tw-items-center tw-gap-1 tw-text-xs">
                      <div class="tw-w-[10px] tw-h-[10px] tw-rounded-full tw-bg-neutral-700"></div>
                      <span>Initial quantity</span>
                    </div>
                    <div class="tw-flex tw-items-center tw-gap-1 tw-text-xs">
                      <div class="tw-w-[10px] tw-h-[10px] tw-rounded-full tw-bg-red-400"></div>
                      <span>Not Received quantity</span>
                    </div>

                  </div>
    </div>
  </div>
</template>

<script>

export default {
    props: ['state'],

    data() {
        return {
        }
    },

    computed: {
    },

    methods: {
        cancel() {
            this.$emit('cancel')
        },
    },

    mounted() {
      console.log(this.state);
    }
}
</script>

<style>

</style>