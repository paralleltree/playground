<template>
  <div>
    <p>グラフだよーーん</p>
    <ul>
      <li v-for="graph in graphs" v-bind:key="graph.id">
        <div>
          <a
            :href="`https://pixe.la/v1/users/${userName}/graphs/${graph.id}.html`"
            >{{ graph.name }}</a
          >
        </div>
        <div>
          <button v-on:click="increment(graph.id)">Increment</button>
          <button v-on:click="decrement(graph.id)">Decrement</button>
        </div>
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
  methods: {
    increment(graphId: string) {
      const client = new PixelaApiClient();
      client.incrementGraph(this.userName, this.token, graphId);
    },
    decrement(graphId: string) {
      const client = new PixelaApiClient();
      client.decrementGraph(this.userName, this.token, graphId);
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
