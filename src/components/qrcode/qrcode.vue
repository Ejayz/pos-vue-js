<template>
  <div
    id="interactive"
    class="border-2 w-64 h-64 border-solid bg-white viewport scanner"
  >
    <video />
    <canvas class="drawingBuffer w-full h-full" />
  </div>
</template>

<script>
import Quagga from "quagga";
import scanner_audio from "@/assets/audio/scanner.wav";
export default {
  name: "QuaggaScanner",
  methods: {
    playAudio() {
      let audio = new Audio(scanner_audio);
      audio.muted = false;
      audio.autoplay = true;
      audio.play();
    },
  },
  props: {
    onDetected: {
      type: Function,
      default(result) {
        this.qr_code = result.codeResult.code;
        console.log("detected: ", result);
      },
    },
    onProcessed: {
      type: Function,
      default(result) {
        // let drawingCanvas = Quagga.canvas.dom.overlay;
        if (result) {
          // if (result.box) {
          //   Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 0 }, drawingCtx, {
          //     color: "#00F",
          //     lineWidth: 2,
          //   });
          // }
        }
      },
    },
    readerTypes: {
      type: Array,
      default: () => [
        "code_128_reader",
        "ean_reader",
        "ean_8_reader",
        "code_39_reader",
        "code_39_vin_reader",
        "codabar_reader",
        "upc_reader",
        "upc_e_reader",
        "i2of5_reader",
        "i2of5_reader",
        "code_93_reader",
      ],
    },
    readerSize: {
      type: Object,
      default: () => ({
        width: 640,
        height: 480,
      }),
      validator: (o) =>
        typeof o.width === "number" && typeof o.height === "number",
    },
    aspectRatio: {
      type: Object,
      default: () => ({
        min: 1,
        max: 1,
      }),
      validator: (o) => typeof o.min === "number" && typeof o.max === "number",
    },
    facingMode: {
      type: String,
      default: () => "environment",
    },
  },
  data() {
    return {
      scanner_audio: scanner_audio,
      qr_code: "",
      isRunning: false,
      quaggaState: {
        inputStream: {
          type: "LiveStream",
          constraints: {
            facingMode: this.facingMode,
            aspectRatio: { min: 1, max: 1 },
            deviceId: this.camera,
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 2,
        frequency: 15,
        decoder: {
          readers: this.readerTypes,
        },
        locate: true,
      },
    };
  },
  watch: {
    qr_code: function (newVal) {
      console.log(newVal);
      if (newVal !== "") {
        this.playAudio()
      }
    },

    "$store.state.qr_code.device_id": {
      handler: function (cameraId) {
        console.log(cameraId);
        this.quaggaState.inputStream.constraints.deviceId = cameraId;
        if (this.isRunning) {
          Quagga.stop();
          this.isRunning = true;
        } else {
          this.isRunning = true;
        }
        Quagga.init(this.quaggaState, function (err) {
          if (err) {
            return console.error(err);
          }
          Quagga.start();
        });
        Quagga.onDetected(this.onDetected);
        Quagga.onProcessed(this.onProcessed);
      },
    },
    onDetected: function (oldValue, newValue) {
      if (oldValue) Quagga.offDetected(oldValue);
      if (newValue) Quagga.onDetected(newValue);
    },
    onProcessed: function (oldValue, newValue) {
      if (oldValue) Quagga.offProcessed(oldValue);
      if (newValue) Quagga.onProcessed(newValue);
    },
  },
  mounted() {
    this.playAudio();
  },
  unmounted() {
    if (this.onDetected) Quagga.offDetected(this.onDetected);
    if (this.onProcessed) Quagga.offProcessed(this.offProcessed);
    Quagga.stop();
  },
};
</script>
