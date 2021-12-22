<template>
<Start_Container />
  <router-view />
</template>
<script>
import Start_Container from "./components/Start_Container.vue";
export default {
  components: {
    Start_Container,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
