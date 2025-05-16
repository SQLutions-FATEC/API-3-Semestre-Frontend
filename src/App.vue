<script setup>
import { ref, inject } from 'vue';
import TopBar from '@/components/TopBar.vue';
import SideBar from '@/components/SideBar.vue';

const locale = inject('locale');

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <a-config-provider :locale="locale">
    <div>
      <top-bar @toggle-sidebar="toggleSidebar" />
      <side-bar :is-open="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
      <div class="app">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </a-config-provider>
</template>

<style lang="scss" scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px $spacingLg;
  background-color: $colorBackground;
}
</style>
