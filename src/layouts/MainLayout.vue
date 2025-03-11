<script setup>
import Button from "@/components/Button.vue";
import NavBar from "@/components/NavBar.vue";
import navs from "@/config/navs";
import { provide, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import icons from "@/utils/icons";
const inputData = ref("");

const grouped = Object.groupBy(navs, (el) => el.type);

const search = ref("");
provide("search", search.value);
watch(
  () => search.value,
  () => {
    console.log("gggg", search.value);
  }
);
</script>

<template>
  <div class="flex h-full w-full overflow-hidden rounded-lg ">
    <div class="__drawer w-drawer-width border-r text-white bg-[#3C3C9E]">
      <div class="p-4 px-2 h-12 flex gap-4 items-center">
        <i v-html="icons.cbhi_logo" />
        <span class="font-bold text-lg"></span>
      </div>
      <div
        class=" flex flex-col justify-start !p-2 !px-4 gap-2  h-[calc(100%-6rem)]"
      >
        <RouterLink
          :key="nav.name"
          v-for="nav in navs"
          class="flex rounded transition-all duration-200 ease-linear hover:text-[#3C3C9E] hover:bg-white"
          :to="nav.path"
        >
          <Button class="flex-1 max-w-full flex gap-4 !justify-start items-center pl-5">
            <div class="grid place-items-center rounded ">
              <span v-html="nav.icon" />
            </div>
            <span>{{ nav.name }}</span>
          </Button>
        </RouterLink>
      </div>
    </div>
    <div class="flex flex-col w-[calc(100%-var(--drawer-width))]">
      <div class="navbar-height flex items-center jub px-4">
        <NavBar v-model="search" class="w-full" :title="$route.name" />
      </div>
      <div
        class="h-[calc(100%-var(--navbar-height))] show-scrollbar bg-base-clr2 w-full"
      >
        <RouterView :search="search" :inputData="inputData" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.__drawer .router-link-exact-active {
  background-color: theme("colors.white");
  color: rgb(var(--base-clr2)); /* Original color */
}

.__drawer .router-link-exact-active {
  background-color: theme("colors.white");
  color: #3C3C9E; /* Set text color to #3C3C9E */
}

</style>
