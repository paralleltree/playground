<template>
  <div>
    <div>
      <label>User name</label>
      <input type="text" v-model="userName" />
    </div>

    <div>
      <label>Token</label>
      <input type="password" v-model="token" />
    </div>

    <button v-on:click="authenticate">Register or login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref  } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "AuthenticationForm",
  setup: () => {
    const router = useRouter();
    const userName = ref<string>("");
    const token = ref<string>("");
    const authenticate = () => {
      router.push({ name: "Graphs", params: { userName: userName.value, token: token.value} });
    };
    return {
      userName,
      token,
      authenticate,
    };
  }
})
</script>

<style lang="sass" scoped>
</style>
