<template>
    <div>
      <video id="video"></video>
      <p v-if="!cameraPermission">Camera permission not granted.</p>
    </div>
  </template>
  
  <script>
  import Quagga from "quagga";
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        cameraPermission: null
      };
    },
    methods: {
      onDetected(result) {
        console.log(
          "Barcode detected and processed : [" + result.codeResult.code + "]",
          result
        );
      },
      stopQuagga() {
        Quagga.stop();
        const video = document.querySelector("#video");
        if (video.srcObject) {
          video.srcObject.getTracks().forEach((track) => track.stop());
          video.srcObject = null;
        }
      },
      ...mapActions(["setCameraPermission"]),
    },
    mounted() {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.cameraPermission = true;
        this.setCameraPermission(true);
        const video = document.querySelector("#video");
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          Quagga.init(
            {
              inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector("#video"),
              },
              decoder: {
                readers: ["ean_reader"],
              },
            },
            function (err) {
              if (err) {
                console.log(err);
                return;
              }
              console.log("QuaggaJS initialized.");
              Quagga.start();
            }
          );
          Quagga.onDetected(this.onDetected);
        };
      }).catch((err) => {
        console.log(err);
        this.cameraPermission = false;
        this.setCameraPermission(false);
      });
    },
    beforeRouteLeave(to, from, next) {
      this.stopQuagga();
      this.setCameraPermission(false);
      next();
    },
  };
  </script>
  
  <style></style>
  