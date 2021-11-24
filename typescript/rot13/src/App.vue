<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Rot13 />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Rot13 from './components/Rot13.vue';

export default defineComponent({
  name: 'App',
  components: {
    Rot13,
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
