<template>
  <div class="md:tw-w-[50%] tw-max-h-full tw-relative tw-w-[95%] tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg ">
    <div v-if="!isLoaded" class="tw-w-full tw-h-full">
        <LoadingAnimation class="text-primary-color" />
    </div>
    
    <v-btn @click="cancel" icon="mdi-close" variant="flat" size="w-small" color="red"
    class="tw-absolute tw-top-3 tw-z-10 tw-right-3"
    ></v-btn>

    <div v-if="isLoaded" class="tw-p-5">

        <v-timeline
      density="compact"
      side="end"
    >

      <v-timeline-item
        v-for="(event) in events" :key="event.id"
        class="mb-4"
        :dot-color="eventColor(event.type)"
        size="x-small"
      >
        <div class="d-flextw-flex-col justify-space-between flex-grow-1">
          <div class="tw-flex tw-items-center tw-gap-2 tw-my-2">
            <v-chip
              class="ms-0 tw-capitalize tw-w-fit"
              :color="eventColor(event.type)"
              label
              size="small"
            >
              {{event.type}}
            </v-chip>
            <v-icon size="x-small" color="grey">mdi-arrow-right</v-icon>
            <v-chip
              class="ms-0 tw-capitalize tw-w-fit"
              color="green"
              label
              size="small"
            >
                {{event.historique}}
            </v-chip>
            
          </div>
        <div class="tw-text-sm tw-capitalize tw-text-neutral-600">
            {{ event.users.firstname }} {{ event.users.lastname }}
        </div>
          <div class="flex-shrink-0 tw-text-neutral-500 tw-flex tw-items-center tw-gap-2 tw-text-sm">
            <span>
                {{ event.created_at?.split('T')[0] }} 
            </span>
            <span>
                {{ event.created_at?.split('T')[1].split('.')[0] }}
            </span>
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item
        class="mb-4"
        dot-color="green"
        size="x-small"
        
      >
        <div class="d-flextw-flex-col justify-space-between flex-grow-1">
          <div class="tw-flex tw-flex-col tw-my-2">
            <v-chip
              class="ms-0 tw-capitalize tw-w-fit"
              color="green"
              label
              size="small"
            >
              Order Created
            </v-chip>
            <div>
                New Order Created
            </div>
          </div>
          <div class="flex-shrink-0 tw-flex tw-items-center tw-gap-2 tw-text-sm">
            <span>
                {{ sale.created_at?.split('T')[0] }} 
            </span>
            <span>
                {{ sale.created_at?.split('T')[1].split('.')[0] }}
            </span>
          </div>
        </div>
      </v-timeline-item>    

    </v-timeline>

    </div>
  </div>
</template>

<script>
import Sale from '@/api/Sale'
export default {
    props: ['sale'],

    data() {
        return {
            isLoaded: false,

            allEvents: []
        }
    },

    computed: {
        events() {
            return [...this.allEvents].reverse()
        }
    },

    methods: {
      cancel() {
        this.$emit('cancel')
      },
        getHistory() {
            this.isLoaded = false
            Sale.history(this.sale.id)
            .then(
                res => {
                    console.log(res.data);
                    this.allEvents = res.data.data.orders
                },
                this.$handleApiError
            )
            .finally(
                () => {
                    this.isLoaded = true
                }
            )
        },
        eventColor(type) {
            let colors = {
                'confirmation': 'primary-color',
                'delivery': 'blue',
                'upsell': 'purple',
                'affectation': 'cyan'
            }

            return ['confirmation', 'delivery', 'upsell', 'affectation'].includes(type) ? colors[type] : 'primary-color'
        }
    },

    mounted() {
        this.getHistory()
    }
}
</script>

<style>

</style>