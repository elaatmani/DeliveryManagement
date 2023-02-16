
<template>
<div>

  <div :key="model.id">
    <UserStatus :rowIndex="rowIndex" :prop="prop" :model="model" />
  </div>        
</div>
</template>

<script>
import UserStatus from './UserStatus.vue'
export default {
    components: { UserStatus },
    props: ["rowIndex", "prop", "model"],
    data() {
        return {
            isRendred: true
        }
    },

    watch: {
    },

    methods: {
    }

}
</script>

<style>

</style>