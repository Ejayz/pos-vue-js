<template>
  <NotificationPanel
    v-on:triggerError="error=false"
    :class="{ hidden: !error, block: error }"
    class="absolute z-50"
  >
  </NotificationPanel>
  <div id="UI_Container" class="h-screen w-screen flex flex-row">
    <div id="Access_Container" class="w-5/12 grid h-screen">
      <div id="Menu" class="w-full h-full bg-gray-700 antialiased">
        <div
          class="w-3/4 h-12 mt-4 mr-auto ml-auto mb-4 gap-0 rounded-full bg-gradient-to-r from-purple-300 to-blue-300 grid grid-cols-2"
        >
          <div
            id="Login"
            v-on:click="
              (isLogin = MenuButtonState($event)),
                (isMenuActive = MenuState($event))
            "
            :class="{ 'bg-blue-500': isMenuActive }"
            class="items-center cursor-pointer grid w-full rounded-l-full"
          >
            <p id="Login" class="inline-block align-middle">Login</p>
          </div>
          <div
            id="SignUp"
            v-on:click="
              (isLogin = MenuButtonState($event)),
                (isMenuActive = MenuState($event))
            "
            :class="{ 'bg-blue-500': !isMenuActive }"
            class="cursor-pointer items-center grid rounded-r-full"
          >
            <p id="SignUp" class="inline-block align-middle">Signup</p>
          </div>
        </div>

        <Login v-if="isLogin === true"></Login>
        <Signup v-else></Signup>
      </div>
    </div>
    <div
      id="Title_Container"
      class="bg-image-landing flex items-center w-7/12 justify-center h-screen"
    >
      <div class="flex flex-col bg-white p-4 rounded-md flex-nowrap">
        <div class=" ">
          <p
            class="text-4xl stroke-red-500 font-bold bg-clip-text gradient-text-clip antialiased"
          >
            Edge Digital Marketing Services
          </p>
        </div>
        <div class="flex items-center">
          <img
            class="w-28 h-28 border-r-8 border-black pr-2"
            src="@/assets/images/pos_logo.png"
          />
          <span class="text-3xl bg-white p-2 rounded-tr-md rounded-br-md"
            >Interconnected Point Of Sales</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "./Login.vue";
import Signup from "./SignUp.vue";
import NotificationPanel from "./NotificationPanel.vue";
export default {
  components: {
    Login,
    Signup,
    NotificationPanel,
  },
  data() {
    return {
      isLogin: true,
      isMenuActive: true,
      message: { info: "No Info" },
      error: false,
    };
  },
  provide() {
    return {
      message: this.message.info,
    };
  },
  methods: {
    triggererror() {
      return true;
    },
    MenuState(event) {
      let isMenuActive = false;
      const trigger = event.target.id;
      if (trigger != "Login") {
        isMenuActive = false;
      } else {
        isMenuActive = true;
      }
      return isMenuActive;
    },
    MenuButtonState(event) {
      const trigger = event.target.id;
      let iLogin = false;
      if (trigger != "Login") {
        iLogin = false;
      } else {
        iLogin = true;
      }
      console.log(event);
      return iLogin;
    },
  },
};
</script>
s
