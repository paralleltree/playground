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

  private buildUrl(path: string): string {
    return `https://pixe.la/v1${path}`;
  }
}

type RawGraphsJson = {
  graphs: Graph[]
}
