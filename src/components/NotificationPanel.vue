<template>
  <div
    id="notif"
    class="bg-blue-400 shadow-2xl top-2 w-1/4 h-auto rounded-xl left-auto right-6"
  >
    <div class="w-full h-full">
      <p class="text-xl text-left ml-4 w-full mt-2">Notification</p>
      <div class="h-auto mt-2 mb-2 p-2 w-full">
        <p>{{ message }}</p>
      </div>
      <div
        class="text-red-500 w-full ml-2 mt-2 mb-2 items-end text-left text-sm mr-auto"
      >
        <p>{{ selfDestruct }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      selfDestruct: "",
    };
  },
  watch: {
    "$store.state.notification.api_Notification_Message": {
      handler: function (newVal) {
        this.message = newVal.message;
        this.$store.commit("notification/setNotificationState", true);
        this.closeNotif();
      },
      immediate: true,
    },
  },
  methods: {
    closeNotif() {
      let i = 6;
      let self = setInterval(() => {
        if (i == 0) {
          this.$store.commit("notification/setNotificationState", false);
          this.message = "";
          clearInterval(self);
        } else {
          this.selfDestruct =
            "This notification will self destruct ETA:" + i + " ";
          i--;
        }
      }, 1000);
    },
  },
};
</script>
