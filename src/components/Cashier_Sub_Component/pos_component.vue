<template>
  <div class="bg-gray-500 text-black flex flex-col">
    <div class="w-full items-center h-24 flex flex-row">
      <div class="w-3/4 h-auto ml-2 relative mt-auto flex flex-col mb-auto">
        <input
          v-model="keyword"
          v-on:change="getSearch({ keyword, token })"
          type="text"
          placeholder="Product search..."
          class="focus:outline-none w-1/2 static h-12 ml-2"
        />
        <search_result
          v-if="result_state === true"
          class="w-3/4 mt-12 h-24 absolute"
        />
      </div>
      <div class="w-1/4 h-auto items-center">
        <select
          class="w-36 focus:outline-none text-black h-12 float-right mr-4 ml-2"
          v-model="camera_pref"
        >
          <option selected disabled hidden value="">Camera List</option>
          <option
            class="w-36"
            v-for="device in camera"
            v-bind:key="device"
            :value="device"
          >
            {{ device }}
          </option>
        </select>
      </div>
    </div>
    <div class="w-full h-auto flex flex-row">
      <div class="w-3/4 h-full">
        <table class="w-full table-auto h-auto">
          <tr class="border-2 h-6">
            <th class="border-2">Hi</th>
            <th class="border-2">Hello</th>
          </tr>
        </table>
      </div>
      <div class="w-1/4 h-full">
        <qrcode
          v-bind:qrbox="10"
          v-bind:fps="10"
          class="w-12 mr-auto ml-auto transform scale-75 h-12"
        >
        </qrcode>
      </div>
    </div>
  </div>
</template>
<script>
import qrcode from "../qrcode/qrcode.vue";
import search_result from "../search_result/search_result.vue";

export default {
  data() {
    return {
      camera_pref: "",
      camera: [],
      prompt_state: "",
      result_state: true,
      keyword: "",
      token: "",
    };
  },
  components: {
    qrcode,
    search_result,
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
        this.$store.commit("qr_code/setDeviceId", "invalid");
      } else if (selected_camera == "Camera List") {
        this.$store.commit("qr_code/setDeviceId", "invalid");
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
      this.camera = [];
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        for (let i = 0; i < devices.length; i++) {
          if (devices[i].kind == "videoinput") {
            if (devices[i].label != "") {
              this.camera.push(
                devices[i].label.split(":")[0] + ":" + devices[i].deviceId
              );
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
