<template>
<div v-if="$can(link.gate) || link.gate == 'all'">

  <v-list-item
    class="mx-3 mb-2"
    :class="{ 'bg-secondary-color': isActive }"
    @click="handleClick()"
    density="comfortable"
    :active="false"
    :ripple="false"
    :to="link.hasChildren ? '' : link.to"
    link
  >
    <div class="d-flex align-center">
      <!-- Prepend Icon -->
      <v-icon
        v-if="link.icon.type == 'icon'"
        :icon="link.icon.value"
        :color="isActive ? 'white' : 'grey-darken-2'"
        class="mr-2"
        size="small"
      ></v-icon>
      <v-img
        v-if="link.icon.type == 'svg'"
        :src="localUrl + link.icon.value"
        max-width="18"
        :class="{ active: isActive }"
        class="mr-2 tw-fill-white"
        size="small"
      ></v-img>
      <!-- /Prepend Icon -->

      <!-- Item Title -->
      <v-list-item-title
        class="text-body-2 font-weight-regular"
        :class="{'text-white': isActive}"
        v-text="link.title"
      ></v-list-item-title>
      <!-- /Item Title -->

      <v-spacer></v-spacer>

      <!-- Prepend Icon -->
      <v-icon
        v-if="link.hasChildren"
        class="item-icon"
        :class="{ activeRotate: isActive }"
        icon="mdi-chevron-right"
      ></v-icon>
      <!-- /Prepend Icon -->
    </div>
  </v-list-item>
  
  <!-- Item Children -->
    <div v-if="link.hasChildren" :class="{'!tw-max-h-[1000px] mb-2 mt-n3': isActive}" class="tw-max-h-0 tw-w-auto mx-3 tw-overflow-hidden tw-duration-300">
        <div class="tw-rounded-md tw-bg-gray-50">
            <v-list density="compact">
                <v-list-item   v-for="child in allowedChildren" :key="child.id" link exact :active="false" :to="child.to"  height="10" class="!tw-h-fit !tw-py-0">
                    <div class="tw-h-full py-2">
                        <v-icon size="x-small" class="mr-2" :color="isSublinkActive(child) ? 'primary-color' : 'secondary-color'" :icon="isSublinkActive(child) ? 'mdi-chevron-double-right': 'mdi-circle-medium'"></v-icon>
                        <span class="tw-text-sm" :class="{'text-primary-color': isSublinkActive(child) }">{{ child.title }}</span>
                    </div>
                </v-list-item>
            </v-list>
        </div>
    </div>
  <!-- /Item Children -->
</div>
</template>

<script>
import { localUrl } from '@/config/config'

export default {
  props: ["link"],

  data() {
    return {
        localUrl,
        isActive: false
    }
  },

  methods: {
    handleClick() {
      if(this.$route.path === this.link.to) {
        this.isActive = true
        return;
      }

      this.isActive = !this.isActive
    },
    isSublinkActive(sublink) {
      return this.$route.path == sublink.to
    },
    isLinkActive() {
      if(this.link.hasChildren) {
        return this.link.module == this.$route.meta.module
      } 
    
      return this.link.to === this.$route.path 
    }
  },

  computed: {
    allowedChildren() {
      // return this.link?.children
      return this.link?.children.filter((item) => this.$can(item.gate))
    }
  },

  watch: {
    $route() {
      this.isActive = this.isLinkActive()
    }
  },

  mounted() {
    this.isActive = this.isLinkActive();
  }
};
</script>

<style scoped>
.active {
  filter: brightness(0) invert(1);
}

.item-icon {
  transform: rotate(0deg);
  transition: all 0.3s ease;
}

.activeRotate {
  transform: rotate(90deg);
}

</style>