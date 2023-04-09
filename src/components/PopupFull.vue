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
            @click.self="resolve(false)"
            class="tw-z-[50999] tw-w-full md:tw-min-w-[300px] tw-overflow-y-auto tw-max-h-screen   tw-flex tw-flex-col md:tw-min-h-[170px]"
          >
            <slot></slot>
            
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
  props: ["visible", "loading", "title", "body", "type", 'noConfirm', 'btnColor'],
  data() {
    return {
      show: true,
      types: {
        warning: {
          class: 'tw-text-orange-400',
          icon: 'mdi-alert-circle-outline'
        },
        info: {
          class: 'tw-text-blue-400',
          icon: 'mdi-information-outline'
        }
      }
    };
  },
  watch: {
    visible(value) {
      this.show = value;
    },
  },
  methods: {
    resolve(value) {
      this.$emit("cancel", value);
    },
  },
  computed: {
    currentType() {
      return this.types[this.type]
    }
  }
};
</script>

<style>
</style>