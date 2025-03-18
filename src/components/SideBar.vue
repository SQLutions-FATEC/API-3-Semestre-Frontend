<script>
import { Drawer } from 'ant-design-vue';

export default {
  props: {
    isOpen: {
      required: true,
      type: Boolean,
    },
  },

  components: {
    'a-drawer': Drawer,
  },

  setup(props, { emit }) {
    const toggleSidebar = () => {
      emit('toggle-sidebar');
    };

    return {
      toggleSidebar,
    };
  },
};
</script>

<template>
  <div>
    <a-drawer
      placement="left"
      title="Basic Drawer"
      :open="isOpen"
      @close="toggleSidebar"
    >
      <div>
        <h3>Menu Lateral</h3>
        <p>Conteúdo do drawer...</p>
      </div>
    </a-drawer>
  </div>
</template>

<style scoped>
.a-drawer {
  transition: left 0.3s ease;
}
</style>
