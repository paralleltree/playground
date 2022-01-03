<template>
  <div>
    <h2>Create Graph</h2>
    <div>
      <label>ID</label>
      <input type="text" v-model="id" />
    </div>

    <div>
      <label>Name</label>
      <input type="text" v-model="name" />
    </div>

    <div>
      <label>Unit</label>
      <input type="text" v-model="unit" />
    </div>

    <button v-on:click="submit">Create</button>
  </div>
</template>

<script lang="ts">
import { PixelaApiClient } from "@/clients/pixela_client";
import { Graph } from "@/models/graph";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NewGraph",
  data: () => {
    return {
      id: "",
      name: "",
      unit: "count",
    };
  },
  components: {},
  props: {
    userName: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  methods: {
    async submit() {
      const client = new PixelaApiClient();
      try {
        await client.createGraph(
          this.userName,
          this.token,
          this.id,
          this.name,
          this.unit,
          "int",
          "shibafu"
        );
        this.goGraphs();
      } catch (e) {
        console.error(e);
      }
    },
  },
  setup: (props) => {
    const router = useRouter();
    const goGraphs = () => router.push({ name: "Graphs", params: { userName: props.userName, token: props.token } });

    return {
      goGraphs,
    };
  },
});
</script>
