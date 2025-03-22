<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import { useGameRawgStore } from "../stores/gameRawg";

const useGame = useGameRawgStore();
const paging = ref(useGame.paging);
let timeout: ReturnType<typeof setTimeout> | null = null;

const fetchData = async () => {
  try {
    await useGame.getData({ token: import.meta.env.VITE_RAWG_TOKEN });
  } catch (error) {
    console.error(error);
  }
};

watch(paging, () => {
  useGame.paging = paging.value;
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(fetchData, 1000);
});

fetchData();
</script>

<template>
  <div class="container mx-auto my-8 px-5">
    <Icon
      v-if="useGame.loading"
      icon="line-md:loading-loop"
      width="100"
      height="100"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
    <div v-else class="flex flex-col space-y-14">
      <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">
        <div
          v-for="(datas, index) in useGame.gamesData.results"
          :key="index"
          class="mb-5 break-inside-avoid shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 ease-in-out bg-whiteCustom rounded-md"
        >
          <img :src="datas.background_image" :alt="datas.name" width="650" height="650" class="rounded-t-md" />
          <div class="flex flex-col py-2 px-3">
            <p class="text-3xl">{{ datas.name }}</p>
            <p class="-mt-1 opacity-70">{{ datas.released }} • {{ datas.rating }} / {{ datas.rating_top }}</p>
            <div class="flex items-center justify-between space-x-2">
              <button class="text-xl bg-blueCustom px-2 pt-1 rounded cursor-pointer">Details</button>
              <button class="cursor-pointer">
                <Icon icon="material-symbols:favorite-outline-rounded" width="30" height="30" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <button
          v-if="!useGame.searchMode"
          @click="
            () => {
              paging--;
              if (paging <= 0) paging = 1;
            }
          "
          :class="['hover:bg-blueCustom/50 rounded-full', paging > 1 ? 'opacity-100 cursor-pointer' : 'opacity-0']"
        >
          <Icon icon="grommet-icons:form-previous-link" width="35" height="35" />
        </button>
        <input type="text" class="text-2xl font-bold text-center focus:outline-none w-[2rem]" v-model="paging" :disabled="useGame.searchMode" />
        <button v-if="!useGame.searchMode" @click="paging++" class="cursor-pointer hover:bg-blueCustom/50 rounded-full">
          <Icon icon="grommet-icons:form-next-link" width="35" height="35" />
        </button>
      </div>
    </div>
  </div>
</template>
