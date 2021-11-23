<template>
  <div>
    <p>グラフだよーーん</p>
    <ul>
      <li v-for="graph in graphs" v-bind:key="graph.id">
        {{ graph.name }}
      </li>
    </ul>
    <p>{{userName}}</p>
  </div>
</template>

<script lang="ts">
import { PixelaApiClient } from "@/clients/pixela_client";
import { Graph } from "@/models/graph";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Graphs",
  components: {
  },
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
  setup: (props) => {
    const graphs = ref<Graph[]>([]);
    const fetch = async () => {
      const client = new PixelaApiClient();
      try {
        const result = await client.fetchAllGraphs(props.userName, props.token);
        graphs.value = result;
      }
      catch (e) {
        console.error("Failed to fetch graphs:", e);
      }
    };

    fetch();
    return {
      graphs,
    }
  }
});
</script>
