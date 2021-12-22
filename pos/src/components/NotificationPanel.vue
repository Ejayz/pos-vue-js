<template>
  <div id="notif" class="bg-blue-400 shadow-2xl top-2 w-1/4 h-36 rounded-xl left-auto right-2">
    <p class="text-xl text-left ml-4 w-full mt-2">Notification</p>
    <div class="h-auto block w-full">
    <p>{{message}}</p>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["message", "status"],
};
</script>
