<template>
  <tr
                
                class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50"
              >
                <td class="tw-w-4 tw-px-2 tw-py-1">
                  {{ item.id }}
                </td>
                <td class="tw-w-4 tw-px-2 tw-py-1">
                  {{ item.size }}
                </td>
                <td class="tw-w-4 tw-px-2 tw-py-1">
                  {{ item.color }}
                </td>
                <td class="tw-w-4 tw-px-2 tw-py-1">
                  <div>
                    <div
                      class="tw-w-fit tw-min-w-[200px] tw-flex tw-items-center"
                    >
                      <button
                        @click="showDetails = !showDetails"
                        class="tw-bg-blue-400/10 tw-py-1 tw-px-4 tw-rounded tw-text-blue-400 tw-flex tw-gap-2 tw-items-center tw-justify-between"
                      >
                        <p>
                          Total:
                          {{ item.on_hand_quantity }}
                        </p>
                        <v-icon>{{
                          showDetails ? "mdi-chevron-up" : "mdi-chevron-down"
                        }}</v-icon>
                      </button>
                    </div>
                    <v-expand-transition>
                      <div class="tw-h-fit tw-py-2" v-if="showDetails">
                        <table>
                          <tbody>
                            <tr>
                              <td
                                class="tw-px-3 tw-py-1 tw-bg-emerald-100 tw-border tw-text-emerald-500"
                              >
                                Received:
                              </td>
                              <td
                                class="tw-px-3 tw-py-1 tw-border tw-text-emerald-500"
                              >
                                {{
                                  item.movements_total_confirmed_quantity
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="tw-px-3 tw-py-1 tw-bg-red-100 tw-text-red-500 tw-border"
                              >
                                Not Received:
                              </td>
                              <td
                                class="tw-px-3 tw-py-1 tw-border tw-text-red-500"
                              >
                                {{
                                  item.movements_total_not_confirmed_quantity
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="tw-px-3 tw-py-1 tw-bg-purple-100 tw-border tw-text-purple-500"
                              >
                                Shipped:
                              </td>
                              <td
                                class="tw-px-3 tw-py-1 tw-border tw-text-purple-500"
                              >
                                {{
                                  item.total_shipped_quantity
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="tw-px-3 tw-py-1 tw-bg-blue-100 tw-border tw-text-blue-500"
                              >
                                Delivered:
                              </td>
                              <td
                                class="tw-px-3 tw-py-1 tw-border tw-text-blue-500"
                              >
                                {{
                                  item.total_delivered_quantity
                                }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </v-expand-transition>
                  </div>

                </td>
              </tr>
</template>

<script>
export default {
    props: ['type', 'item'],
    data() {
        return {
            showDetails: false
        }
    }
}
</script>

<style>

</style>