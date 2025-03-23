import axios from "axios";
import { defineStore } from "pinia";
import type { IGame } from "../types/fetchingRawg";

interface IData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IGame[];
}

interface IFavoriteGame {
  id: number;
  image: string;
  name: string;
  released: string;
  rating: string;
}

export const useGameRawgStore = defineStore("gameRawg", {
  state: () => ({
    loading: false,
    paging: 1,
    searchMode: false,
    gamesData: {} as IData,
  }),

  actions: {
    async fetchData(endpoint: string, params: Record<string, any>): Promise<IData | null> {
      this.loading = true;
      try {
        const response = await axios.get(endpoint, { params });
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async getData({ token }: { token: string }) {
      this.searchMode = false;
      const response = await this.fetchData("https://api.rawg.io/api/games", { key: token, page: this.paging });
      if (!response) return;
      this.gamesData = response;
    },

    async searchGame({ query, token }: { query: string; token: string }) {
      if (!query) {
        this.searchMode = false;
        return await this.getData({ token });
      }

      this.searchMode = true;
      this.resetPaging();
      const response = await this.fetchData("https://api.rawg.io/api/games", { search: query, key: token });
      if (!response) return;
      this.gamesData = response;
    },

    async favoriteGame(data: IFavoriteGame ) {
      const STORAGE_KEY = "favoriteGames";

      const storedData = localStorage.getItem(STORAGE_KEY);
      const favoriteGames: (typeof data)[] = storedData ? JSON.parse(storedData) : [];

      if (!favoriteGames.some((game) => game.id === data.id)) {
        favoriteGames.push(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteGames));
        console.log(`${data.name} telah ditambahkan ke favorit.`);
      }
    },

    getFavoriteGames() {
      const STORAGE_KEY = "favoriteGames";
      const storedData = localStorage.getItem(STORAGE_KEY);
      return storedData ? (JSON.parse(storedData) as IFavoriteGame[]) : [];
    },

    removeFavoriteGame(id: number) {
      const STORAGE_KEY = "favoriteGames";
      let favoriteGames = this.getFavoriteGames();
      favoriteGames = favoriteGames.filter((game) => game.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteGames));
      console.log(`Game dengan ID ${id} telah dihapus dari favorit.`);
    },

    resetPaging() {
      this.paging = 1;
    },
  },
});
