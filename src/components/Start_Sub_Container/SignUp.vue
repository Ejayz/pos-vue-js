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
        :class="{ 'border-green-500': sameRepeat }"
        v-model="password"
        type="password"
        class="w-3/4 h-10 text-center border-red-500 border-2 focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
        placeholder="Password"
      />
      <div class="w-auto text-center">
        <p
          :class="{ 'text-green-500  ': passwordLegnth }"
          class="text-red-500"
        >
          8 characters and more
        </p>
        <p
          :class="{
            'text-green-500  ': passwordContainsSpecialChar,
          }"
          class="text-red-500"
        >
          Contains Special Character
        </p>
         <p
          :class="{
            'text-green-500  ': passwordContainsDigit,
          }"
          class="text-red-500"
        >
          Contains Digit
        </p>
        <p
          :class="{ 'text-green-500  ': passwordContainsLowerCase }"
          class="text-red-500"
        >
          Contains Lowecase Character
        </p>
        <p
          :class="{ 'text-green-500  ': passwordContainsUpperCase }"
          class="text-red-500"
        >
          Contains Uppercase Character
        </p>
      </div>
      <input
        v-model="repeatPassword"
        :class="{ 'border-green-500': sameRepeat }"
        type="password"
        class="w-3/4 h-10 text-center border-2 border-red-500 focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
        placeholder="Repeat Password"
      />
      <input
        :class="{ 'border-green-500': emailcheck }"
        v-model="email"
        type="email"
        class="w-3/4 h-10 text-center border-2 border-red-500 focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
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
        v-on:click="
          createAccount({
            username,
            password,
            email,
            businessname,
            emailnotification,
            validPassword,
            sameRepeat,
            emailcheck,
          })
        "
        value="Sign Up"
        class="w-3/4 h-12 mx-auto rounded-full shadow-md"
      />
    </div>
  </div>
</template>
<script>
import user_signup from "@/assets/images/user_signup.png";
import { mapActions } from "vuex";
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
      passwordLegnth: false,
      passwordContainsLowerCase: false,
      passwordContainsUpperCase: false,
      passwordContainsSpecialChar: false,
      passwordContainsDigit: false,
      validPassword: false,
      sameRepeat: false,
      emailcheck: false,
    };
  },
  mounted() {},
  watch: {
    password: {
      handler: function (newVal) {
        this.passwordCheck(newVal);
        this.repeatCheck();
      },
    },
    repeatPassword: {
      handler: function () {
        this.repeatCheck();
      },
    },
    email: {
      handler: function () {
        this.emailCheck();
      },
    },
  },
  methods: {
    ...mapActions('signup/',["createAccount"]),

    validation() {
      if (
        this.username == "" ||
        this.password == "" ||
        this.repeatPassword == "" ||
        this.email == "" ||
        this.businessname == ""
      ) {
        this.$store.commit("notification/setNotificationState", true);
        this.$store.commit("notification/setNotificationMessage", {
          error_code: "EMPTY_FIELD",
        });
      }
    },
    repeatCheck() {
      if (this.password === this.repeatPassword) {
        this.sameRepeat = true;
      } else {
        this.sameRepeat = false;
      }
    },
    passwordCheck() {
      var strongRegex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      this.passwordContainsDigit = /\d/.test(this.password);
      this.passwordContainsLowerCase = /[a-z]/.test(this.password);
      this.passwordContainsUpperCase = /[A-Z]/.test(this.password);
      this.passwordContainsSpecialChar = strongRegex.test(this.password);
      if (this.password.length > 8) {
        this.passwordLegnth = true;
      } else {
        this.passwordLegnth = false;
      }
      if (
        this.passwordContainsLowerCase === true &&
        this.passwordContainsUpperCase === true &&
        this.passwordContainsSpecialChar === true &&
        this.passwordContainsDigit === true &&
        this.passwordLegnth === true
      ) {
        this.validPassword = true;
      }
    },
    emailCheck() {
      if (this.email.includes("@")) {
        this.emailcheck = true;
      } else {
        this.emailcheck = false;
      }
    },
  },
};
</script>
