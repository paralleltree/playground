<template>
  <div>
    <p>グラフだよーーん</p>
    <router-link :to="{ name: 'NewGraph', params: { userName: this.userName, token: this.token }}">Create new graph</router-link>
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
          <button v-on:click="deleteGraph(graph.id)">Delete Graph</button>
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
import { useRouter } from "vue-router";

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
    async increment(graphId: string) {
      const client = new PixelaApiClient();
      await client.incrementGraph(this.userName, this.token, graphId);
    },
    async decrement(graphId: string) {
      const client = new PixelaApiClient();
      await client.decrementGraph(this.userName, this.token, graphId);
    },
    async deleteGraph(graphId: string) {
      if (!confirm(`Are you sure to delete ${graphId}`)) return;
      const client = new PixelaApiClient();
      await client.deleteGraph(this.userName, this.token, graphId);
      await this.fetchFunc();
    },
  },
  setup: (props) => {
    const graphs = ref<Graph[]>([]);
    const router = useRouter();
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
      fetchFunc: fetch,
      graphs,
    }
  }
});
</script>
