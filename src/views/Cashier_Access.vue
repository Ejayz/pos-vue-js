<template>
  <div class="w-screen h-screen flex">
    <cashierMenu
      class="h-screen"
      :class="{ 'w-1/12': isCollapse, 'w-2/12': !isCollapse }"
    />
    <pos_component
      :class="{ 'w-11/12': isCollapse, 'w-10/12': !isCollapse }"
      class="h-screen float-right"
    />
  </div>
</template>
<script>
import CashierMenu from "../components/Cashier_Sub_Component/cashier_menu.vue";
import pos_component from "../components/Cashier_Sub_Component/pos_component.vue";
export default {
  name: "Cashier",
  data() {
    return {
      isCollapse: true,
    };
  },
  components: {
    CashierMenu,
    pos_component,
  },
  watch: {
    "$store.state.menu_handler.isCollapse": {
      handler: function (newVal) {
        console.log("trigger");
        this.isCollapse = newVal;
      },
    },
  },
};
</script>
