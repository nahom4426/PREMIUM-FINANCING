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
const openDropdowns = ref(new Set());

provide("search", search.value);
watch(
  () => search.value,
  () => {
    console.log("gggg", search.value);
  }
);

const toggleDropdown = (navPath) => {
  if (openDropdowns.value.has(navPath)) {
    openDropdowns.value.delete(navPath);
  } else {
    openDropdowns.value.add(navPath);
  }
};

const isDropdownOpen = (navPath) => openDropdowns.value.has(navPath);
</script>

<template>
  <div class="flex h-full w-full overflow-hidden rounded-lg">
    <!-- Sidebar with hidden scrollbar -->
    <div class="__scrollable-hidden w-drawer-width border-r text-white bg-[#3C3C9E] overflow-y-scroll">
      <div class="p-4 px-2 h-12 flex gap-4 items-center sticky top-0 bg-[#3C3C9E] z-10">
        <i v-html="icons.cbhi_logo" />
        <span class="font-bold text-lg"></span>
      </div>
      <div class="flex flex-col justify-start !p-2 !px-4 gap-4 mb-44">
        <!-- Loop through grouped navigation items -->
        <div v-for="(navItems, category) in grouped" :key="category" class="flex flex-col gap-2">
          <!-- Category Header -->
          <h3 class="text-sm font-semibold opacity-70 pt-2">{{ category }}</h3>
          
          <!-- Navigation Items -->
          <div v-for="nav in navItems" :key="nav.name" class="flex flex-col">
            <!-- Parent Nav Item -->
            <div class="flex rounded transition-all duration-200 ease-linear hover:text-[#3C3C9E] hover:bg-white"
                 :class="{ 'bg-[#FFFFFF4D] text-white': $route.path.startsWith(nav.path) && nav.children }">
              <RouterLink
                v-if="!nav.children"
                :to="nav.path"
                class="w-full"
              >
                <Button class="flex-1 max-w-full flex gap-4 !justify-start items-center pl-5">
                  <div class="grid place-items-center rounded">
                    <span v-html="nav.icon" />
                  </div>
                  <span>{{ nav.name }}</span>
                </Button>
              </RouterLink>
              
              <!-- Dropdown Toggle Button -->
              <Button
                v-else
                class="flex-1 max-w-full flex gap-4 !justify-between items-center pl-5 pr-3"
                @click="toggleDropdown(nav.path)"
              >
                <div class="flex gap-4 items-center">
                  <div class="grid place-items-center rounded">
                    <span v-html="nav.icon" />
                  </div>
                  <span>{{ nav.name }}</span>
                </div>
                <i
                  class="transition-transform duration-200"
                  :class="{ 'rotate-180': isDropdownOpen(nav.path) }"
                  v-html="icons.down"
                />
              </Button>
            </div>

            <!-- Child Nav Items -->
            <div
              v-if="nav.children"
              class="overflow-hidden transition-all duration-200"
              :class="{ 'h-0': !isDropdownOpen(nav.path) }"
            >
              <RouterLink
                v-for="child in nav.children"
                :key="child.name"
                :to="child.path"
                class="block ml-10 text-left"
              >
                <Button class="flex items-start w-full !justify-start my-2 text-left py-1.5 hover:text-[#3C3C9E] hover:bg-white">
                  <span class="flex text-left pl-5 items-start justify-start">{{ child.name }}</span>
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main content with hidden scrollbar -->
    <div class="flex flex-col w-[calc(100%-var(--drawer-width))]">
      <div class="navbar-height flex items-center">
        <NavBar v-model="search" class="w-full" :title="$route.name" />
      </div>
      <div class="__scrollable-hidden h-[calc(100%-var(--navbar-height))] bg-base-clr2 w-full overflow-y-scroll">
        <RouterView :search="search" :inputData="inputData" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar but maintain functionality */
.__scrollable-hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.__scrollable-hidden::-webkit-scrollbar {
  display: none;
}

/* Active route styling */
.__scrollable-hidden .router-link-exact-active {
  background-color: theme("colors.white");
  color: #3C3C9E;
}

.__scrollable-hidden .router-link-exact-active button {
  background-color: theme("colors.white");
  color: #3C3C9E;
}

.__scrollable-hidden .router-link-exact-active button span {
  font-weight: 600;
}
</style>


















