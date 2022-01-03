import { Graph, GraphColor, GraphType } from "@/models/graph";
import axios from "axios";

export class PixelaApiClient {

  async fetchAllGraphs(userName: string, token: string): Promise<Graph[]> {
    const res = await axios.get<RawGraphsJson>(this.buildUrl(`/users/${userName}/graphs`), {
      headers: {
        "X-USER-TOKEN": token
      }
    });
    return res.data.graphs;
  }

  async incrementGraph(userName: string, token: string, graphId: string): Promise<void> {
    const url = this.buildUrl(`/users/${userName}/graphs/${graphId}/increment`);
    return await axios.put(url, "", {
      headers: {
        "X-USER-TOKEN": token,
        "Content-Length": "0",
      },
    });
  }

  async decrementGraph(userName: string, token: string, graphId: string): Promise<void> {
    const url = this.buildUrl(`/users/${userName}/graphs/${graphId}/decrement`);
    return await axios.put(url, "", {
      headers: {
        "X-USER-TOKEN": token,
        "Content-Length": "0",
      },
    });
  }

  async createGraph(userName: string, token: string, id: string, name: string, unit: string, type: GraphType, color: GraphColor) {
    const url = this.buildUrl(`/users/${userName}/graphs`);
    const graph = {
      id: id,
      name: name,
      unit: unit,
      type: type,
      color: color,
    }
    return await axios.post(url, JSON.stringify(graph), {
      headers: {
        "X-USER-TOKEN": token,
      },
    })
  }

  async deleteGraph(userName: string, token: string, id: string) {
    const url = this.buildUrl(`/users/${userName}/graphs/${id}`);
    return await axios.delete(url, {
      headers: {
        "X-USER-TOKEN": token,
      },
    });
  }


  private buildUrl(path: string): string {
    return `https://pixe.la/v1${path}`;
  }
}

type RawGraphsJson = {
  graphs: Graph[]
}
