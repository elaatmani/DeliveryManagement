<template>
  <div class="tw-flex tw-items-center tw-gap-2">


    <div>
      <UserFilter />
    </div>
    
    <div>
      <DateFilter />
    </div>
  </div>
</template>

<script setup>
import DateFilter from './DateFilter.vue';
import UserFilter from './UserFilter.vue';
</script>

<style>

</style>