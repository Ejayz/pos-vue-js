<template>
  <div class="bg-gray-800 text-white font-extrabold text-sm flex flex-row">
    <span class="mt-8" v-if="isCollapse === false">Cashier Dashboard</span>
    <img
      v-on:click="menu_state()"
      :src="openMenu"
      class="w-12 ml-auto mr-auto mt-4 h-12"
    />
  </div>
</template>
<script>
import openMenu from "@/assets/images/open_menu.png";
export default {
  data() {
    return {
      openMenu: openMenu,
      isCollapse: true,
    };
  },
  watch: {
    "$store.state.menu_handler.isCollapse": {
      handler: function (newVal) {
        console.log("trigger");
        this.isCollapse = newVal;
      },
    },
  },
  methods: {
    menu_state() {
      if (this.isCollapse) {
        this.$store.commit("menu_handler/setisCollapse", false);
      } else {
        this.$store.commit("menu_handler/setisCollapse", true);
      }
    },
  },
};
</script>
