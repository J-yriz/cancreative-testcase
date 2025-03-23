<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import { useGameRawgStore } from "../stores/gameRawg";
import type { IDetailGame } from "../types/fetchingRawg";
import axios from "axios";
import { useRouter } from "vue-router";

interface IModal {
  open: boolean;
  gameId: number;
  data: IDetailGame | null;
}

const router = useRouter();
const useGame = useGameRawgStore();
const isModal = ref<IModal>({ open: false, gameId: 0, data: {} as IDetailGame });

watch(isModal, async () => {
  if (isModal.value.open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  if (isModal.value.open && isModal.value.gameId > 0) {
    const response = await axios.get(`https://api.rawg.io/api/games/${isModal.value.gameId}`, { params: { key: import.meta.env.VITE_RAWG_TOKEN } });
    isModal.value.data = response.data;
  }
});

const openModal = (gameId: number) => {
  isModal.value = { open: true, gameId, data: null };
};

const favoriteData = useGame.getFavoriteGames();
</script>

<template>
  <div class="container mx-auto my-8 px-5">
      <div class="flex flex-col space-y-14">
        <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">
          <div
            v-for="(datas, index) in favoriteData"
            :key="index"
            class="mb-5 break-inside-avoid shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 ease-in-out bg-whiteCustom rounded-md"
          >
            <img :src="datas.image" :alt="datas.name" width="650" height="650" class="rounded-t-md" />
            <div class="flex flex-col py-2 px-3">
              <p class="text-3xl">{{ datas.name }}</p>
              <p class="-mt-1 opacity-70">{{ datas.released }} • {{ datas.rating }}</p>
              <div class="flex items-center justify-between space-x-2">
                <button @click="() => openModal(datas.id)" class="text-xl bg-blueCustom px-2 pt-1 rounded cursor-pointer">Details</button>
                <button
                  @click="
                    () => {
                      router.go(0);
                      useGame.favoriteGame({
                        id: datas.id,
                        name: datas.name,
                        image: datas.image,
                        rating: datas.rating,
                        released: datas.released,
                      });
                    }
                  "
                  class="cursor-pointer"
                >
                  <Icon :icon="favoriteData.some((data) => data.id !== datas.id) ? 'material-symbols:favorite-outline-rounded' : 'material-symbols:favorite'" width="30" height="30" class="text-red-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isModal.open && isModal.data" class="fixed inset-0 bg-blackCustom/80 flex items-center justify-center z-50 px-5">
        <div class="bg-blueCustom pt-4 pb-3 px-4 rounded-md">
          <div class="w-full sm:w-96">
            <img :src="isModal.data.background_image" :alt="isModal.data.name" width="650" height="650" class="rounded" />
            <div class="flex items-center justify-between mt-1">
              <a :href="isModal.data.website" target="_blank" class="text-3xl font-semibold hover:underline">{{ isModal.data.name }}</a>
              <button
                @click="() => {router.go(0); useGame.favoriteGame({ id: isModal.gameId, name: isModal.data!.name, image: isModal.data!.background_image, rating: `${isModal.data!.rating} / ${isModal.data!.rating_top}`, released: isModal.data!.released })}"
                class="cursor-pointer"
              >
                <Icon icon="material-symbols:favorite-outline-rounded" width="30" height="30" />
              </button>
            </div>
            <p class="mb-2 text-justify">
              {{ (isModal.data.description.length > 300 ? isModal.data.description.slice(0, 300) + "..." : isModal.data.description).split("\n<p>")[0].replace(/<\/?[^>]+(>|$)/g, "") }}</p>
            <div class="flex space-x-3">
              <p><span class="font-semibold opacity-85">Realse Date</span> : {{ isModal.data.released }}</p>
              <p><span class="font-semibold opacity-85">Rating</span> : {{ isModal.data.rating }} / {{ isModal.data.rating_top }}</p>
            </div>
            <p>
              <span class="font-semibold opacity-85">Platform</span> :
              {{
                isModal.data.metacritic_platforms.map((data) => data.platform.name).length > 0
                  ? isModal.data.metacritic_platforms.map((data) => data.platform.name).join(", ")
                  : "-"
              }}
            </p>
            <button
              @click="() => (isModal = { open: false, gameId: 0, data: null })"
              class="bg-[#5f8bb9] hover:bg-[#4671a0] transition duration-300 ease-in-out cursor-pointer px-3 py-1 rounded-md mt-2 w-full"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
