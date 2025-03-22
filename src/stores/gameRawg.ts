import axios from "axios";
import { defineStore } from "pinia";
import type { IGame } from "../types/fetchingRawg";

interface IData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IGame[];
}

export const useGameRawgStore = defineStore("gameRawg", {
  state: () => ({
    loading: false,
    paging: 1,
    searchMode: false,
    gamesData: {} as IData,
  }),

  actions: {
    async fetchData(endpoint: string, params: Record<string, any>) {
      this.loading = true;
      try {
        const response = await axios.get(endpoint, { params });
        this.gamesData = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },

    async getData({ token }: { token: string }) {
      this.searchMode = false;
      await this.fetchData("https://api.rawg.io/api/games", { key: token, page: this.paging });
    },

    async searchGame({ query, token }: { query: string; token: string; }) {
      if (!query) {
        this.searchMode = false;
        return await this.getData({ token });
      }

      this.searchMode = true;
      this.resetPaging();
      await this.fetchData("https://api.rawg.io/api/games", { search: query, key: token });
    },

    resetPaging() {
      this.paging = 1;
    },
  },
});
