<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Category List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">View/Search product category</h2>
      </div>
      <div>
        <v-btn color="primary-orange" link :to="{name: 'category/add'}" variant="flat" class="text-capitalize">
          <v-icon icon="mdi-plus" class="mr-2 text-white "></v-icon>
          <span class="text-white ">
            Add Category
          </span>
        </v-btn>
      </div>
    </div>

    <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <v-btn>Test</v-btn>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>