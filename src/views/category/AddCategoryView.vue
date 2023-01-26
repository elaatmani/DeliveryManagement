<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Add Category</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Create new category</h2>
      </div>
    </div>

    <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <div>

        <v-row>
          <v-col class="!tw-py-2" cols="12" sm="6">
            <div class="tw-w-full">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Category Name</div>
              <v-text-field clearable clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
            </div>
          </v-col>
        </v-row>
      </div>


      <div>
        <v-row>
          <v-col class="!tw-py-2">
            <div>
              <div class="mb-1 text-body-2 tw-text-zinc-700">Description</div>
              <v-textarea variant="outlined" density="compact" color="primary-color"></v-textarea>
            </div>
          </v-col>
        </v-row>
      </div>


      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Cancel</span>
        </v-btn>
        <v-btn color="primary-color" variant="flat" size="large">
          <span class="text-white text-capitalize">Create</span>
        </v-btn>
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