import { Graph } from "@/models/graph";
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

  private buildUrl(path: string): string {
    return `https://pixe.la/v1${path}`;
  }
}

type RawGraphsJson = {
  graphs: Graph[]
}
