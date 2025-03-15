<script>
import TopBar from '@/components/TopBar.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'App',

  components: {
    TopBar,
    SideBar,
  },
};
</script>

<template>
  <div>
    <top-bar />
    <side-bar />
    <nav>
      <router-link to="/">Company</router-link>
    </nav>
    <router-view />
  </div>
</template>
