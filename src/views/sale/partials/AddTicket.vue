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
    </popup-full>
  </div>
</template>

<script>
import Product from "@/api/Product";
import Sale from "@/api/Sale";
import utf8 from "utf8";
// import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
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
      // create a new jsPDF instance with the specified page size
      var doc = new jsPDF("p", "mm", [100, 150], true);

      // draw a rectangle with the page dimensions and a thickness of 1mm
      doc.rect(1, 1, 98, 148, "S");

      // add content to each of the 5 sections, separated by lines
      doc.setFontSize(12);
      doc.setTextColor("orange");
      doc.text("Vldo", 3, 7);
      doc.line(1, 10, 99, 10);

      doc.setFontSize(10);
      doc.setTextColor("black");
      doc.setFont("helvetica", "bold");
      doc.text("Nom Complet: ", 5, 20);
      doc.text("Téléphone: ", 5, 25);
      doc.text("Adresse: ", 5, 30);
      doc.text("Ville: ", 5, 35);
      doc.text("Date d'envoi: ", 5, 40);
      doc.text("Marchandise:", 5, 45);
      // ----------
      doc.setFont("helvetica", "normal");
      doc.text(utf8.encode("Yassine Zahlane"), 30, 20);
      doc.text("06747410151", 30, 25);
      doc.text("Azli Hey Ben Tachfine", 30, 30);
      doc.text("Marrakech", 30, 35);
      doc.text("2002-18-17", 30, 40);
      doc.text(" - Backpack x 2", 30, 45); 
      doc.line(1, 73, 99, 73);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("CRBT: 200DH", 29, 80);
      doc.line(1, 83, 99, 83);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Vous remercier pour votre confiance, pour plus d'informaion", 12, 90);
      doc.text("veuillez nous appeler sur :", 32, 95);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("0612345678", 32, 105);
      
      doc.line(1, 115, 99, 115);


      // save the document
      doc.save("my-document.pdf");
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

<style>
@media print {
  * {
    border: 1px solid black;
  }
}
</style>
