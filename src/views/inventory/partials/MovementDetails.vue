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
                          <tr v-for="(item) in movement.inventory_movement_variations" :key="item.id" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
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
                                {{ item.quantity }}
                              </td>
                          </tr>
                          
                      </tbody>
                  </table>
    </div>
  </div>
</template>

<script>

export default {
    props: ['movement'],

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
    }
}
</script>

<style>

</style>