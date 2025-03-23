<script setup lang="ts">
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { useGameRawgStore } from "../stores/gameRawg";
import { useRouter } from "vue-router";

defineProps<{ disbale?: boolean }>();
const useGame = useGameRawgStore();
const router = useRouter();

const NavLink = ref([
  { name: "Game List", href: "/" },
  { name: "Favorite Game", href: "/favorite" },
]);

const isModalOpen = ref(false);
const isVisible = ref(false);
const isModalSearchOpen = ref(false);
const searchQuery = ref("");

const handleSearch = async (event: Event) => {
  event.preventDefault();
  if (isModalSearchOpen.value) isModalSearchOpen.value = false;
  await useGame.searchGame({ token: import.meta.env.VITE_RAWG_TOKEN, query: searchQuery.value });
};

const handleRefresh = () => router.go(0);
const closeModal = () => (isModalOpen.value = false);

const handleTransitionEnd = (event: TransitionEvent) => {
  if (event.propertyName === "opacity" && !isModalOpen.value) isVisible.value = false;
};

watch([isModalOpen, isModalSearchOpen], ([modalOpen, searchOpen]) => {
  document.body.style.overflow = modalOpen || searchOpen ? "hidden" : "auto";
  if (modalOpen) isVisible.value = true;
});
</script>

<template>
  <nav class="bg-blackCustom text-whiteCustom pt-10 sm:px-5">
    <div class="flex justify-between items-center p-4 container mx-auto">
      <button @click="handleRefresh" class="text-3xl font-bold cursor-pointer">Game List RAWG</button>
      <div class="flex items-center text-xl">
        <p
          v-for="({ name, href }, index) in NavLink"
          :key="index"
          class="hover:border-b transition transform duration-200 ease-in-out hidden md:block mr-5"
        >
          <router-link :to="href">{{ name }}</router-link>
        </p>
        <form v-if="!disbale" class="hidden sm:flex items-center space-x-1 bg-[#5f8bb9] rounded-md">
          <input v-model="searchQuery" type="text" placeholder="Search Game" class="py-2 px-3 focus:outline-none text-blackCustom" />
          <button @click="handleSearch" class="px-4 py-2 bg-[#5f8bb9] text-white rounded-r-md hover:bg-[#7198c1] transition cursor-pointer">
            <Icon icon="material-symbols:search-rounded" width="30" height="30" />
          </button>
        </form>
        <button
          @click="isModalSearchOpen = true"
          class="block sm:hidden px-4 py-2 bg-[#5f8bb9] text-white rounded-md hover:bg-[#7198c1] transition cursor-pointer"
        >
          <Icon icon="material-symbols:search-rounded" width="30" height="30" />
        </button>
        <button @click="isModalOpen = true" class="block md:hidden bg-blueCustom/80 p-2 rounded ml-3">
          <Icon icon="stash:burger-classic" width="30" height="30" />
        </button>
      </div>
    </div>
    <div
      v-if="isModalSearchOpen"
      class="flex flex-col items-center py-5 md:hidden fixed inset-0 bg-blackCustom/80 z-50 transition-opacity duration-300"
    >
      <button class="cursor-pointer bg-blueCustom p-1 transition duration-200 rounded-full" @click="isModalSearchOpen = false">
        <Icon icon="material-symbols:close-rounded" width="35" height="35" />
      </button>
      <form class="items-center space-x-1 bg-[#5f8bb9] rounded-md flex scale-125 mt-96">
        <input v-model="searchQuery" type="text" placeholder="Search Game" class="py-2 px-3 focus:outline-none text-blackCustom" />
        <button @click="handleSearch" class="px-4 py-2 bg-[#5f8bb9] text-white rounded-r-md hover:bg-[#7198c1] transition cursor-pointer">
          <Icon icon="material-symbols:search-rounded" width="30" height="30" />
        </button>
      </form>
    </div>
    <div
      :class="[
        'block md:hidden fixed inset-0 bg-blackCustom/80 z-50 transition-opacity duration-300',
        isModalOpen ? 'opacity-100' : 'opacity-0',
        isVisible ? 'visible' : 'invisible',
      ]"
      @transitionend="handleTransitionEnd"
    >
      <div
        :class="[
          'fixed top-0 right-0 min-h-screen bg-[#5f8bb9] w-[18rem] transition-transform duration-300 p-3',
          isModalOpen ? 'translate-x-0' : 'translate-x-full',
        ]"
      >
        <button @click="handleRefresh" class="text-3xl font-bold cursor-pointer">Game List RAWG</button>
        <div class="flex flex-col space-y-1 mt-2">
          <router-link
            v-for="({ name, href }, index) in NavLink"
            :key="index"
            :to="href"
            @click="closeModal"
            class="hover:bg-blueCustom p-1 rounded transition transform duration-200 ease-in-out mr-5"
            >{{ name }}</router-link
          >
        </div>
      </div>
      <button class="absolute top-3 right-3 cursor-pointer hover:bg-blueCustom p-1 transition duration-200 rounded" @click="closeModal">
        <Icon icon="material-symbols:close-rounded" width="30" height="30" />
      </button>
    </div>
  </nav>
</template>
