<template>
  <div :key="order.id">
    <!-- new line -->
    <popup-full
      type="info"
      title="Add Note"
      btn-color="blue"
      @cancel="cancel()"
      :visible="visible"
    >
      <div
        class="md:tw-max-w-[400px] tw-bg-white tw-shadow-lg tw-rounded-lg tw-py-3 tw-px-5 !tw-w-[95%] tw-mx-auto"
      >
        <p class="tw-text-neutral-600 mb-2">Enter Reported Date</p>

        <VueDatePicker v-model="date" :format="format" />
        <br />
        <p class="tw-text-neutral-600 mb-2">Enter Note</p>
        <textarea
          v-model="note"
          cols="30"
          rows="12"
          class="tw-rounded-lg tw-px-3 tw-py-1 tw-outline-none tw-w-full tw-border tw-border-solid tw-border-neutral-600 focus:tw-border-orange-500"
        >
        </textarea>

        <div class="tw-flex tw-justify-end tw-mt-2">
          <v-btn
            class="tw-capitalize"
            :loading="isLoading"
            variant="flat"
            color="green"
            @click="handleConfirm"
            >Confirm</v-btn
          >
        </div>
      </div>
    </popup-full>
  </div>
</template>

<script>
import Sale from '@/api/Sale';
export default {
  props: ["visible", "order"],

  data() {
    return {
        isLoading: false,
        note: '',
        date: null,
        realDate: null,
        newOrder: null
    }
  },

  methods: {
    handleConfirm() {
        if(!this.date) {
            this.$alert({
                type: "warning",
                title: "Please select a date",
            });
            return false
        }

        // this.$alert({
        //         type: "info",
        //         title: "clicked",
        //     });
        const order = {...this.order}

        order.reported_agente_date = this.realDate;
        order.reported_agente_note = this.note;
        order.confirmation = "reporter";

        this.isLoading = true;

        Sale.agenteUpdateConfirmation(order.id, "reporter", order)
        .then(
            res => {
                console.log(res.data);
                this.$alert({
                    type: "success",
                    title: "Order reported successfully",
                });

                this.$store.dispatch('sale/update', { id: order.id, sale: order });
                this.cancel()
            },
            this.$handleApiError
        )
        .finally(
            () => this.isLoading = false
        )

        // setTimeout(() => {
        //     this.$alert({
        //         type: "success",
        //         title: "Order reported successfully",
        //     });
        //     this.isLoading = false
        //     this.cancel()
        // })
    },

    format(date) {
        const day = date.getDate();
        const dayFormated = day.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            });
        const month = date.getMonth() + 1;
        const monthFormated = month.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            })
        const year = date.getFullYear();

        this.realDate = `${year}-${monthFormated}-${dayFormated}`;
          return `${dayFormated}/${monthFormated}/${year}`;
    },

    cancel() {
      this.$emit("cancel");
    },


  },
    mounted() {
    },
};
</script>

<style>
</style>