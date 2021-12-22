<template>
  <div
    id="Component_Signup"
    class="w-full mr-auto ml-auto items-center justify-items-center text-white grid h-1/2"
  >
    <div class="w-3/4 h-full bg-gray-700 rounded-xl text-black">
      <p class="font-sans text-white text-4xl mt-4 mb-4">Sign Up</p>
      <input
        v-model="username"
        type="text"
        class="w-3/4 h-10 text-center focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
        placeholder="Username"
      />
      <input
        v-model="password"
        type="password"
        class="w-3/4 h-10 text-center focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
        placeholder="Password"
      />
      <input
        v-model="repeatPassword"
        type="password"
        class="w-3/4 h-10 text-center focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
        placeholder="Repeat Password"
      />
      <input
        v-model="email"
        type="email"
        class="w-3/4 h-10 text-center focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
        placeholder="Email"
      />
      <input
        v-model="businessname"
        type="text"
        class="w-3/4 h-10 text-center focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
        placeholder="Store Name"
      />
      <div
        class="h-6 w-full text-white flex items-center justify-center font-sans font-medium"
      >
        <input
          v-model="emailnotification"
          id="keepMeLog"
          class="w-4 h-4"
          type="checkbox"
          name=""
        />
        <label for="keepMeLog" class="h-12 items-center flex text-green-500">
          <span class="ml-2">Subscribe to email notifications</span>
        </label>
      </div>
      <p class="text-green-500 mt-2 mb-2">
        By signing up you agree to our terms and condition.
      </p>
      <input
        type="button"
        v-on:click="createAccount()"
        value="Sign Up"
        class="w-3/4 h-12 mx-auto rounded-full shadow-md"
      />
    </div>
  </div>
</template>
<script>
import user_signup from "@/assets/images/user_signup.png";
import axios from "axios";

export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      user_signup: user_signup,
      username: "",
      password: "",
      repeatPassword: "",
      email: "",
      businessname: "",
      emailnotification: false,
    };
  },
  methods: {
    async triggerNotif() {
      this.$emit("triggerError");
    },
    async createAccount() {
      const datas = {
        username: this.username,
        password: this.password,
        email: this.email,
        store_name: this.businessname,
        is_notification: this.emailnotification,
      };

      const options = {
        method: "POST",
        url: "http://localhost:3080/signup",
        headers: { "Content-Type": "application/json" },
        data: datas,
      };

      await axios.request(options).then((result, error) => {
        console.log(this);
        this.$emit("triggerError");
        console.log(result);
        console.log(error);
      });
    },
  },
};
</script>
