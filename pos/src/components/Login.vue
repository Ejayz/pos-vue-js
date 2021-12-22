<template>
  <div
    id="Component_Login"
    class="w-full items-center justify-items-center text-white grid "
  >
    <div class="w-3/4 h-5/6 bg-gray-700 rounded-xl text-black">
      <p class="font-sans text-3xl text-white mt-4 mb-4">Login</p>
       <p class="mt-2 mb-2 font-mono " :class="{'text-red-500':!isError}">{{ShowResult}}</p>
      <input
        type="text"
        class="w-3/4 h-10 text-center focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
        placeholder="Username"
      />
      <input
        type="password"
        class="w-3/4 h-10 text-center focus:outline-none mb-2 mr-auto ml-auto mt-2 shadow-md"
        placeholder="Password"
      />
      <div class="h-12 w-full text-white flex items-center justify-center font-sans font-medium">
        <input id="keepMeLog" v-model="checked" class="w-6 h-6 " type="checkbox" name="" />
        <label for="keepMeLog" class="h-12 items-center flex " :class="{'text-red-500':!checked,'text-green-500':checked}">
          <span class="ml-2" >Click to keep you login</span>
        </label>
      </div>
     
      <input type="button" value="Login" class="w-3/4 h-12 mx-auto rounded-full shadow-2xl" />
    </div>
  </div>
</template>
<script>
import user_login from "@/assets/images/user_login.png";
export default {
  name: "Login",
  data() {
    return {
      user_login: user_login,
      username: "",
      password: "",
      ShowResult:"",
      isError:false,
      checked:false
    };
  },
};
</script>
