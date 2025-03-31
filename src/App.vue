<script>
import { ref } from 'vue';
import TopBar from '@/components/TopBar.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'App',

  components: {
    TopBar,
    SideBar,
  },

  setup() {
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    return {
      isSidebarOpen,
      toggleSidebar,
    };
  },
};
</script>

<template>
  <div>
    <top-bar @toggle-sidebar="toggleSidebar" />
    <side-bar :is-open="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <div class="app">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
