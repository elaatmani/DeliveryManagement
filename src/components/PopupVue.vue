<template>
  <div v-if="visible">
    <teleport to="body">
      <div>
        <div
          ref="popup"
          class="
            tw-fixed tw-top-0 tw-left-0 tw-z-[50999] tw-right-0 tw-bottom-0
            tw-flex tw-items-center tw-justify-center
          "
        >
          <div
            name="body"
            class=" tw-z-[50999] tw-bg-white md:tw-min-w-[300px] tw-flex tw-flex-col md:tw-min-h-[170px] tw-shadow-lg tw-rounded-lg tw-p-5 tw-px-10"
          >
            <div class="tw-font-bold tw-text-lg mb-5 tw-text-center">{{ title }}</div>
            <div class="tw-text-center" v-html="body">
            </div>
            <v-spacer></v-spacer>
            <div class="tw-flex tw-gap-3 tw-justify-center mt-10">
              <v-btn  variant="flat" color="grey" @click="resolve(false)">Cancel</v-btn>
              <v-btn :loading="loading" variant="flat" color="red" @click="resolve(true)">Confirm</v-btn>
            </div>
          </div>

          <div
            @click="resolve(false)"
            class="
            tw-duration-300
              tw-absolute
              tw-top-0
              tw-left-0
              tw-w-full
              tw-h-full
              tw-bg-neutral-900/50
              tw-opacity-0
            "
            :class="{'!tw-opacity-100': visible}"
          ></div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  props: ["visible", "loading", "title", "body"],
  data() {
    return {
      show: true,
    };
  },
  watch: {
    visible(value) {
      this.show = value;
    },
  },
  methods: {
    resolve(value) {
      this.$emit("resolved", value);
    },
  },
};
</script>

<style>
</style>