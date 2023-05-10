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
        <h1 class="tw-font-bold">Choose Ticket Size</h1>


        <div class="tw-grid mt-5">
          <v-btn @click="downloadPDF">Imprimer</v-btn>
        </div>
      </div>
    </popup-full>
        <img src="" id="image" />
        <canvas id="qr-canvas"></canvas>
  </div>
</template>

<script>
// import utf8 from "utf8";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { localUrl } from "@/config/config";
import QRCode  from 'qrcode'

export default {
  props: ["visible", "orders"],

  data() {
    return {
      localUrl,
      isLoading: false,
      isLoaded: true,
    };
  },

  computed: {},

  methods: {

    async addOrderPage(doc, order) {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      // draw a rectangle with the page dimensions and a thickness of 1mm
      doc.rect(1, 1, 98, 148, "S");

      // add content to each of the 5 sections, separated by lines
      doc.setFontSize(12);
      doc.setTextColor("orange");
      doc.text("Vldo", 3, 7);
      doc.line(1, 10, 99, 10);


      autoTable(doc, {
        theme: 'grid',
        startY: 12,
        margin: {
          horizontal: 3,
          vertical: 0
        },
        
        body: [
          ["Nom Complete: ", order.fullname ],
          ["Télephone: ", order.phone ],
          ["Adresse: ", order.adresse ],
          ["Ville: ", order.city ],
          ["Date d'envoi: ", `${day}-${month}-${year}` ],
        ],

        styles: {
          halign: 'left',
          lineColor: 'black',
          textColor: 'black'
          
        },
        columnStyles: {
          0: {
            fontStyle: 'bold',
            font: 'Cairo',
            valign: 'middle',
            fontSize: 8,
            cellWidth: 24,

          },
          1: {
            font: 'Cairo',
            // cellWidth: 70,
            valign: 'middle',
            cellPadding: {
              vertical: 1,
              horizontal: 2
            }
          }
        }
      });

      doc.line(1, 73, 99, 73);

      doc.setFont("helvetica", "bold");
      doc.setTextColor("black");
      doc.setFontSize(16);
      doc.text(`CRBT: ${order.price}DH`, 29, 80);
      doc.line(1, 83, 99, 83);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Vous remercier pour votre confiance, pour plus d'informaion",
        12,
        90
      );
      doc.text("veuillez nous appeler sur :", 32, 95);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("0612345678", 32, 105);

      doc.line(1, 115, 99, 115);

    },
    async downloadPDF() {
  var doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: [100, 150],
    putOnlyUsedFonts: true,
  });

  doc.addFont(
    this.localUrl + "assets/fonts/Cairo-Regular.ttf",
    "Cairo",
    "normal"
  );

  doc.addFont(
    this.localUrl + "assets/fonts/Cairo-Bold.ttf",
    "Cairo",
    "bold"
  );

  for (let i = 0; i < this.orders.length; i++) {
    const order = this.orders[i];

    if (i > 0) {
      doc.addPage();
    }

    this.addOrderPage(doc, order)

    const url = await new Promise((resolve, reject) => {
      QRCode.toDataURL(order.fullname, {margin: 0}, function (err, url) {
        if (err) {
          reject(err)
        }
        resolve(url)
      })
    })

    const img = new Image();
    img.src = url;

    await new Promise((resolve) => {
      img.onload = () => {
        doc.addImage(img, 68, 118, 28, 28, 'a' + i, 'SLOW');
        resolve();
      };
    });
  }

  doc.save("order_tickets.pdf");
},
},
  mounted() {    

  }
};
</script>

<style>
@media print {
  * {
    border: 1px solid black;
  }
}
</style>
