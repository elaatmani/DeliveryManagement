<template>
  <div v-if="sheet">
    <v-btn  @click="showUpdatePopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>
    <v-btn @click="showPopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
    </v-btn>

    <UpdateSheet v-model:visible="showUpdatePopup" :sheet="sheet" @cancel="showUpdatePopup = false" />

    <!--  -->
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this sale?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleDelete" />
  </div>
</template>
<script>
import UpdateSheet from '@/views/sheet/partials/UpdateSheet';
import Sheet from '@/api/Sheet';

// your vue component
export default {
  // access any cell properties here
  props: [ "sheet"],
  name: "sheetActions",
  components: { UpdateSheet },
  data() {
    return {
      showPopup: false,
      showUpdatePopup: false,
      showHistoryPopup: false,
      isLoading: false,

    };
  },
  computed: {
  },
  methods: {
    handleDelete(resolved) {
        console.log(resolved);
        if(!resolved) {
            this.showPopup = false
            return false;
        }
        this.delete();
    },

    delete() {
        this.isLoading = true;
        Sheet.delete(this.sheet.id)
        .then(
            res => {
                if(res.data.code == "SUCCESS") {
                    this.$alert({
                        title: 'Deleted successfully',
                        type: 'success'
                    })
                    this.$store.dispatch('sheet/delete', this.sheet.id)
                    this.showPopup = false
                }
            },
            this.$handleApiError
        )
        .finally(
            () => {
                this.isLoading = false;
            }
        )
    }
  },

  mounted() {
  }
};
</script>