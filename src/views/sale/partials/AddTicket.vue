<template>
  <div>
    <popup-full @cancel="$emit('cancel')" :visible="visible">
      <div
        v-if="!isLoaded"
        class="md:tw-w-[80%] tw-w-[95%] tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg"
      >
        <LoadingAnimation />
      </div>
      <div
        v-if="isLoaded"
        class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5"
      >
        <h1 class="tw-text-lg tw-text-center">Choose Ticket Size</h1>

        <div class="tw-grid mt-5">
          <v-btn @click="downloadPDF">Imprimer</v-btn>
        </div>
      </div>



        <div hidden>
            <div ref="imprimer" class="border p-4">
            <div class="mb-2">Vldo</div>
            <div class="grid grid-cols-2 gap-2">
                <div class="text-sm font-bold">Client Name:</div>
                <div class="border p-2">Abdelmonaim</div>
                <div class="text-sm font-bold">Adresse:</div>
                <div class="border p-2">Azli Hey Ben Tachfine</div>
                <div class="text-sm font-bold">Phone Number:</div>
                <div class="border p-2">0674740151</div>
                <div class="text-sm font-bold">City:</div>
                <div class="border p-2">Marrakech</div>
                <div class="text-sm font-bold">Date of Delivery:</div>
                <div class="border p-2">Now</div>
            </div>
            </div>
        </div>
      
    </popup-full>
  </div>
</template>

<script>
import Product from "@/api/Product";
import Sale from "@/api/Sale";

import html2pdf from "html2pdf.js";

export default {
  props: ["visible"],

  data() {
    return {
      isLoading: false,
      isLoaded: false,

      sale: {
        fullname: "",
        product_name: "",
        phone: "",
        city: "",
        adresse: "",
        quantity: 1,
        price: 0,
      },
    };
  },

  computed: {
    products() {
      return this.$store.getters["product/products"];
    },
    cities() {
      return this.$store.getters["city/cities"];
    },
    isFormValid() {
      return (
        !!this.sale.fullname &&
        !!this.sale.phone &&
        !!this.sale.adresse &&
        this.sale.price != 0 &&
        this.sale.quantity != 0
      );
    },
  },

  methods: {
  
    downloadPDF() {
      const pdfWidth = 100; // 10cm converted to PDF units
      const pdfHeight = 150; // 15cm converted to PDF units
      const element = this.$refs.imprimer;
      console.log(element);
      html2pdf().from(element).set({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
        filename: 'my-pdf-document.pdf'
      }).save();
    },


    
    create() {
      if (!this.isFormValid) {
        this.$alert({
          type: "warning",
          title: "Please fill all the form",
        });
        return false;
      }
      this.isLoading = true;

      Sale.create(this.sale)
        .then((res) => {
          if (res.data.code == "SALE_ADDED") {
            this.$emit("cancel");
            this.$alert({
              type: "success",
              title: "Sale created successfully",
            });
          }
        }, this.$handleApiError)
        .finally(() => (this.isLoading = false));
    },

    getProducts() {
      Product.all()
        .then(
          (res) => {
            if (res.data.code == "SUCCESS") {
              this.$store.dispatch(
                "product/setProducts",
                res.data.data.products
              );

              if (this.products.length > 0) {
                this.sale.product_name = this.products[0].name;
                console.log(this.products[0].name);
              }
            }
          },
          (err) => {
            this.$handleApiError(err);
          }
        )
        .finally(() => (this.isLoaded = true));
    },
  },

  mounted() {
    this.getProducts();
    this.sale.city = this.cities[0].name || 1;
  },
};
</script>

<style></style>
