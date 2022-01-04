<template>
  <NotificationPanel v-if="error === true" class="absolute">
  </NotificationPanel>
  <router-view />
</template>
<script>
import NotificationPanel from "./components/NotificationPanel.vue";
export default {
  data() {
    return {
      error: true,
      error_message: "",
    };
  },
  watch: {
    "$store.state.notification.api_NotificationState": {
      handler: function (newVal) {
        this.error = newVal;
      },
      immediate: true,
    },
  },
  components: {
    NotificationPanel,
  },
  beforeMounted() {
    this.$router.push({ name: "Home" });
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #010102;
}
</style>
