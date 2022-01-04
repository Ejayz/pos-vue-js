<template>
  <div class="bg-gray-500 text-black flex">
    <div>
      <input
        type="text"
        placeholder="Product search..."
        class="focus:outline-none h-12 ml-12 mt-12 mb-12 w-64"
      />

      <input type="button" class="w-24 h-12 mt-12 ml-4 mb-12" value="Search" />
      <select
        class="w-36 focus:outline-none text-black h-12 float-left mr-2 ml-2"
        v-model="camera_pref"
      >
        <option v-for="device in camera" v-bind:key="device" :value="device">
          {{ device }}
        </option>
      </select>
      
    </div>
    <qrcode v-bind:qrbox="10" v-bind:fps="10" class="w-12s h-12"> </qrcode>
  </div>
</template>
<script>
import qrcode from "../qrcode/qrcode.vue";
export default {
  data() {
    return {
      camera_pref: "",
      camera: [],
      prompt_state: "",
    };
  },
  components: {
    qrcode,
  },
  mounted() {
    this.getPermission();
  },
  watch: {
    camera_pref: {
      handler: function (camera) {
        this.cameraHandler(camera);
      },
    },
    prompt_state: {
      handler: function (permission) {
        if (permission == "granted") {
          this.getCameraList();
        } else if (permission == "denied") {
          this.$store.commit("notification/setNotificationState", true);
          this.$store.commit("notification/setNotificationMessage", {
            error_code: "EMPTY_FIELD",
            message:
              "Camera permission is required. Please read faq for more  information why  we require camera permission.",
          });
        } else if (permission == "prompt") {
          this.getCameraList();
          this.$store.commit("notification/setNotificationState", true);
          this.$store.commit("notification/setNotificationMessage", {
            error_code: "EMPTY_FIELD",
            message:
              "Allow  access to camera.Please read faq for more  info why we require camera permission.",
          });
        }
      },
    },
  },
  methods: {
    cameraHandler(selected_camera) {
      if (selected_camera == "No camera found on this device.") {
        console.log("Invalid selection");
      } else if (selected_camera == "Camera List") {
        console.log("invalid  Selections");
      } else {
        let camera_information = selected_camera.split(":");
        this.$store.commit("qr_code/setDeviceId", camera_information[1]);
      }
    },
    async getPermission() {
      let inst = this;
      let cam_perm = await navigator.permissions.query({ name: "camera" });
      inst.prompt_state = cam_perm.state;
      cam_perm.onchange = function () {
        inst.prompt_state = this.state;
      };
    },
    async getCameraList() {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        this.camera.push("Camera List");
        for (let i = 0; i < devices.length; i++) {
          if (devices[i].kind == "videoinput") {
            if (devices[i].label != "") {
              this.camera.push(devices[i].label.split(":")[0] + ":" + devices[i].deviceId);
            } else {
              this.camera.push("No camera found on this device.");
            }
          }
        }
      });
    },
  },
};
</script>
