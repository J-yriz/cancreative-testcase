<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useGameRawgStore } from "../stores/gameRawg";
import { useRouter } from "vue-router";

defineProps<{ disbale?: boolean }>();
const useGame = useGameRawgStore();

const NavLink = ref([
  {
    name: "Game List",
    href: "/",
  },
  {
    name: "Favorite Game",
    href: "/favorite",
  },
]);

const router = useRouter();
const searchQuery = ref("");
const handleSearch = async (event: Event) => {
  event.preventDefault();

  await useGame.searchGame({ token: import.meta.env.VITE_RAWG_TOKEN, query: searchQuery.value });
};

const handleRefresh = () => router.go(0);
</script>

<template>
  <nav class="bg-blackCustom text-whiteCustom pt-10 px-5">
    <div class="flex justify-between items-center p-4 container mx-auto">
      <button @click="handleRefresh" class="text-3xl font-bold cursor-pointer">Game List RAWG</button>
      <div class="flex items-center space-x-5 text-xl">
        <p v-for="({ name, href }, index) in NavLink" :key="index">
          <router-link :to="href" class="hover:border-b transition transform duration-200 ease-in-out">{{ name }}</router-link>
        </p>
        <form v-if="!disbale" class="flex items-center space-x-1 bg-[#5f8bb9] rounded-md">
          <input v-model="searchQuery" type="text" placeholder="Search Game" class="py-2 px-3 focus:outline-none text-blackCustom" />
          <button @click="handleSearch" class="px-4 py-2 bg-[#5f8bb9] text-white rounded-r-md hover:bg-[#7198c1] transition cursor-pointer">
            <Icon icon="material-symbols:search-rounded" width="30" height="30" />
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>
