<template>
  <div>
    <textarea class="textbox" v-model="message" placeholder="edit me" />
    <textarea class="textbox" v-model="converted" readonly="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Rot13",
  data: () => {
    return {
      message: "",
    };
  },
  computed: {
    converted(): string {
      return rotn(this.message, 13);
    },
  },
});

function make_shift_pairs(
  seq: string[],
  shift: number
): { [key: string]: string } {
  const map: { [key: string]: string } = {};
  seq.forEach((s, i) => (map[s] = seq[(i + shift) % seq.length]));
  return map;
}

function rotn(text: string, shift: number): string {
  const uppers = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );
  const lowers = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode("a".charCodeAt(0) + i)
  );
  const map = {
    ...make_shift_pairs(uppers, shift),
    ...make_shift_pairs(lowers, shift),
  };
  return [...text].map((s) => map[s] || s).join("");
}
</script>

<style scoped lang="scss">
.textbox {
  display: block;
  width: 100%;
}
</style>
