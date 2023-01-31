
<template>
  <div class="tw-flex tw-items-center">
    <v-switch color="primary-color" :flat="true" v-model="checked" density="compact" :hide-details="true"></v-switch>
  </div>
</template>

<script>
export default {
    props: ["rowIndex", "prop", "model"],
    data() {
        return {
            checked: this.model.status == 1 ? true: false
        }
    }

}
</script>

<style>

</style>