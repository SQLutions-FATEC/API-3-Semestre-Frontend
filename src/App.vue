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
    <nav>
      <router-link to="/">Company</router-link>
    </nav>
    <router-view />
  </div>
</template>
