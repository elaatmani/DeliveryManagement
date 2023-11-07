<template>
    <div>
      <popup-new :visible="visible" :closeable="true" @cancel="cancel">
        <div
          class="tw-mx-auto tw-w-[95%] md:tw-max-w-[800px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg"
        >
          <div
            class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50"
          >
            Order Item History
          </div>
  
          <div class="tw-bg-white tw-p-4">
              <div v-if="!isLoaded">
                  <loading />
              </div>
            <div v-if="isLoaded" class="tw-p-5">
              <v-timeline density="compact" side="end">
                <v-timeline-item
                  v-for="event in events"
                  :key="event.id"
                  class="mb-4"
                  :dot-color="eventColor(event.type)"
                  size="x-small"
                >
                  <div
                    class="d-flextw-flex-col justify-space-between flex-grow-1"
                  >
                  <div v-if="event.old_product.id != event.new_product.id" class="tw-flex tw-items-center tw-gap-2 tw-my-2">
                    <v-chip
                      class="ms-0 tw-capitalize tw-w-fit"
                      color="purple"
                      label
                      size="small"
                    >
                      Product
                    </v-chip>
                    <v-icon
                    v-if="event.type != 'responsibility'"
                    size="x-small"
                    color="grey"
                    >mdi-equal</v-icon
                  >
                    <v-chip
                      class="ms-0 tw-capitalize tw-w-fit"
                      :color="eventColor(event.type)"
                      label
                      size="small"
                    >
                      {{ event.old_product.name }}
                    </v-chip>
                    <v-icon
                      v-if="event.type != 'responsibility'"
                      size="x-small"
                      color="grey"
                      >mdi-arrow-right</v-icon
                    >
                    <v-chip
                      v-if="event.type != 'responsibility'"
                      class="ms-0 tw-capitalize tw-w-fit"
                      color="green"
                      label
                      size="small"
                    >
                      {{ event.new_product.name }}
                    </v-chip>
                  </div>
                  <div v-if="event.old_quantity != event.new_quantity" class="tw-flex tw-items-center tw-gap-2 tw-my-2">
                    <v-chip
                      class="ms-0 tw-capitalize tw-w-fit"
                      color="blue"
                      label
                      size="small"
                    >
                      Quantity
                    </v-chip>
                    <v-icon
                      v-if="event.type != 'responsibility'"
                      size="x-small"
                      color="grey"
                      >mdi-equal</v-icon
                    >
                    <v-chip
                      class="ms-0 tw-capitalize tw-w-fit"
                      :color="eventColor(event.type)"
                      label
                      size="small"
                    >
                      {{ event.old_quantity }}
                    </v-chip>
                    <v-icon
                      v-if="event.type != 'responsibility'"
                      size="x-small"
                      color="grey"
                      >mdi-arrow-right</v-icon
                    >
                    <v-chip
                      v-if="event.type != 'responsibility'"
                      class="ms-0 tw-capitalize tw-w-fit"
                      color="green"
                      label
                      size="small"
                    >
                      {{ event.new_quantity }}
                    </v-chip>
                  </div>
                    <div v-if="event.old_price != event.new_price" class="tw-flex tw-items-center tw-gap-2 tw-my-2">
                      <v-chip
                        class="ms-0 tw-capitalize tw-w-fit"
                        color="#118C4F"
                        label
                        size="small"
                      >
                        Price
                      </v-chip>
                      <v-icon
                      v-if="event.type != 'responsibility'"
                      size="x-small"
                      color="grey"
                      >mdi-equal</v-icon
                    >
                      <v-chip
                        class="ms-0 tw-capitalize tw-w-fit"
                        :color="eventColor(event.type)"
                        label
                        size="small"
                      >
                        {{ event.old_price }}
                      </v-chip>
                      <v-icon
                        v-if="event.type != 'responsibility'"
                        size="x-small"
                        color="grey"
                        >mdi-arrow-right</v-icon
                      >
                      <v-chip
                        v-if="event.type != 'responsibility'"
                        class="ms-0 tw-capitalize tw-w-fit"
                        color="green"
                        label
                        size="small"
                      >
                        {{ event.new_price }}
                      </v-chip>
                    </div>
                    <div class="tw-text-sm tw-capitalize tw-text-gray-500 tw-flex tw-items-center tw-mt-2 tw-gap-2 tw-font-bold tw-font-['cairo']">
                      <v-icon>mdi-account</v-icon><span>{{ event.users.firstname }} {{ event.users.lastname }}</span>
                    </div>
                    <div
                      class="flex-shrink-0 tw-text-neutral-500 tw-flex tw-items-center tw-gap-2 tw-text-sm"
                    >
                      <span>
                        {{ event.created_at?.split("T")[0] }}
                      </span>
                      <span>
                        {{ event.created_at?.split("T")[1].split(".")[0] }}
                      </span>
                    </div>
                  </div>
                </v-timeline-item>
  
                <v-timeline-item class="mb-4" dot-color="green" size="x-small">
                  <div
                    class="d-flextw-flex-col justify-space-between flex-grow-1"
                  >
                    <div class="tw-flex tw-flex-col tw-my-2">
                      <v-chip
                        class="ms-0 tw-capitalize tw-w-fit"
                        color="green"
                        label
                        size="small"
                      >
                        Order Created
                      </v-chip>
                      <div>No Changes Happend Yet</div>
                    </div>
                    <div
                      class="flex-shrink-0 tw-flex tw-items-center tw-gap-2 tw-text-sm"
                    >
                      <span>
                        {{ item.created_at?.split("T")[0] }}
                      </span>
                      <span>
                        {{ item.created_at?.split("T")[1].split(".")[0] }}
                      </span>
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </div>
          </div>
  
          <div
            class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid"
          >
            <button
              @click="cancel"
              class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </popup-new>
    </div>
  </template>
  
  <script>
  import Sale from "@/api/Sale";
  
  export default {
    components: {},
  
    props: {
      visible: {
        required: true,
      },
      item: {
        required: true,
      },
    },
  
    data() {
      return {
        allEvents: [],
        isLoaded: false,
      };
    },
  
    computed: {
      events() {
          return [...this.allEvents].reverse()
      }
    },
  
    methods: {
      cancel() {
        this.$emit("update:visible", false);
      },
  
      getItemHistory() {
        this.isLoaded = false;
        Sale.itemHistory(this.item.id)
          .then((res) => {
            console.log(res.data);
            this.allEvents = res.data.data.orders;
          }, this.$handleApiError)
          .finally(() => {
            this.isLoaded = true;
          });
      },
      eventColor(type) {
              let colors = {
                  'old_product': 'red',
                  'old_price': 'green',
                  'old_quantity': 'blue',
              }
  
          return ['old_product', 'old_price', 'old_quantity'].includes(type) ? colors[type] : 'primary-color'
      }
    },
  
    mounted() {
      this.getItemHistory();
    },
  };
  </script>
  
  <style>
  </style>