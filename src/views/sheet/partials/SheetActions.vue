<template>
  <div v-if="sheet">
    <v-btn @click="sync" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="blue" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon :class="[isLoadingSheet && 'tw-animate-spin']" color="white">mdi-autorenew</v-icon>
    </v-btn>
    <v-btn  @click="showUpdatePopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="orange" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-pencil-outline</v-icon>
    </v-btn>
    <v-btn @click="showPopup = true" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-delete-outline</v-icon>
    </v-btn>

    <UpdateSheet v-model:visible="showUpdatePopup" :sheet="sheet" @cancel="showUpdatePopup = false" />
    <SheetOrders v-model:visible="showSheetPopup" :sheet="sheet" :orders="orders" @cancel="showSheetPopup = false" />

    <!--  -->
    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this sale?</p> You won't be able to revert this!" :loading="isLoading" :visible="showPopup" @resolved="handleDelete" />
  </div>
</template>
<script>
import UpdateSheet from '@/views/sheet/partials/UpdateSheet';
import SheetOrders from '@/views/sheet/partials/SheetOrders'
import Sheet from '@/api/Sheet';

// your vue component
export default {
  // access any cell properties here
  props: [ "sheet"],
  name: "sheetActions",
  components: { UpdateSheet, SheetOrders },
  data() {
    return {
      showPopup: false,
      showUpdatePopup: false,
      showSheetPopup: false,
      isLoading: false,
      isLoadingSheet: false,

      orders: []

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
    },

    sync() {
      this.isLoadingSheet = true
      Sheet.sync(this.sheet.id)
      .then(
        res => {
          if(res.data.code == 'SUCCESS') {
            if(res.data.data.orders.length == 0) {
              this.$alert({
                'title': '0 Orders found',
                'type': 'info'
              })
            } else {
              this.orders = res.data.data.orders;
              this.showSheetPopup = true;
            }
          }
          console.log(res.data);
        },
        err => { 
            this.$handleApiError(err);
            console.log(err);
            if(err?.response?.data?.code == 'PERMISSION_DENIED') {
              this.$alert({
                title: 'Access denied to this Google Sheet',
                type: 'error'
              })
            }
          }
      ).finally(
        () => {
          this.isLoadingSheet = false
        }
      )
    }
  },

  mounted() {
  }
};
</script>