<template>
  <v-card
    class="mx-auto"
    flat
    border
  >
    <v-card-item>
        <template v-slot:title>
            <p class="tw-w-full tw-whitespace-normal">
                Azli marrakech loudaya yhandsq
            </p>
        </template>
      <template v-slot:subtitle>
        <!-- <v-icon
          icon="mdi-alert"
          size="18"
          color="error"
          class="me-1 pb-1"
        ></v-icon> -->

        Oulaid Abdelmounaim
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
          class="tw-flex tw-items-center tw-gap-2"
          cols="12"

        >
            <v-icon class="tw-text-gray-400">mdi-shopping-outline</v-icon>
            <p class="text-h6">Backpack</p>
            <p class="tw-min-w-fit tw-w-[30px] tw-h-[30px] tw-flex tw-items-center tw-justify-center tw-text-lg tw-font-bold tw-p-1 tw-rounded tw-text-orange-400 tw-bg-orange-400/10"><span class="tw-text-sm">x</span> 1</p>
        </v-col>
        <v-col
          class="text-h4"
          cols="6"
        >
          240 DH
        </v-col>

        <v-col cols="6" class="text-right">
          <!-- <v-icon
            color="error"
            icon="mdi-weather-hurricane"
            size="88"
          ></v-icon> -->
        </v-col>
      </v-row>
    </v-card-text>

    <div v-if="false" class="d-flex py-3 justify-space-between">
      <v-list-item
        density="compact"
        prepend-icon="mdi-weather-windy"
      >
        <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        density="compact"
        prepend-icon="mdi-weather-pouring"
      >
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand" >
        <div class="tw-px-5 tw-py-2 tw-my-2 tw-border-y tw-border-solid">
            <p class="tw-text-lg tw-font-bold tw-text-red-500">Note</p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, laborum.
            </p>
        </div>
        <v-list class="bg-transparent !tw-px-5">
          <v-list-item
          class="!tw-px-0"
            v-for="item in forecast"
            :key="item.day"
            :title="item.day"
            :prepend-icon="item.icon"
            subtitle="0608970645"
          >
          </v-list-item>
        </v-list>
        <div class="tw-px-3 tw-flex tw-justify-end">
            <v-btn class="tw-capitalize" color="green"  variant="outlined" >
                <v-icon>mdi-check</v-icon>
                <p class="tw-ml-2">Delivered</p>
            </v-btn>
        </div>
      </div>

      
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions class="tw-flex tw-justify-end tw-gap-2 tw-flex-wrap">
      
        <v-spacer></v-spacer>
      <v-btn class="tw-capitalize" color="blue" icon rounded="lg" variant="flat" density="comfortable">
        <v-icon>mdi-phone</v-icon>
      </v-btn>

      <v-btn class="tw-capitalize" color="green" icon rounded="lg" variant="flat" density="comfortable">
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>

      <v-btn class="tw-capitalize" color="primary-color" rounded="lg" density="comfortable" icon variant="flat"  @click="expand = !expand">
        <v-icon class="tw-text-white">{{ expand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      labels: { 0: 'SU', 1: 'MO', 2: 'TU', 3: 'WED', 4: 'TH', 5: 'FR', 6: 'SA' },
      expand: false,
      time: 0,
      forecast: [
        { day: 'Telephone', icon: 'mdi-phone', temp: '24\xB0/12\xB0' },
        { day: 'Address', icon: 'mdi-home', temp: '22\xB0/14\xB0' },
        { day: 'Date', icon: 'mdi-calendar', temp: '25\xB0/15\xB0' },
      ],
    }),
  }
</script>