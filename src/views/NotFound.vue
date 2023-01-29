<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Page not found</h1>
        <!-- <h2 class="tw-text-gray-500 tw-text-sm">Page Not Found</h2> -->
      </div>
    </div>
    <div class="py-5 px-5 tw-border bg-white tw-w-full tw-flex tw-items-center tw-justify-center tw-rounded-md tw-min-h-[500px]">
      <div class="tw-flex tw-items-center tw-flex-col">
        <div class="md:tw-text-6xl tw-text-4xl tw-font-black text-primary-color">404</div>
        <div class="tw-w-fit tw-flex tw-items-center md:tw-text-2xl tw-text-xl mt-md-5 mt-3 tw-gap-2">
          <v-icon>mdi-alert-circle</v-icon>
          Oops! Page not found!
        </div>
        <div class="tw-max-w-[400px] tw-text-center md:tw-text-lg tw-text-sm mt-5">
          The page you requested was not found or you don't have the permission to access it.
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style>
</style>