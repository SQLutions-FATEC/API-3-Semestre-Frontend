<script>
import { Button, Drawer } from 'ant-design-vue';
import { ref } from 'vue';

export default {
  components: {
    'a-button': Button,
    'a-drawer': Drawer,
  },

  setup() {
    const open = ref(false);

    const toggleDrawer = () => {
      open.value = !open.value;
    };

    return {
      open,
      toggleDrawer,
    };
  },
};
</script>

<template>
  <div>
    <a-button type="primary" @click="toggleDrawer">
      {{ open ? 'Fechar' : 'Abrir' }}
    </a-button>
    <a-drawer
      placement="left"
      title="Basic Drawer"
      :open="open"
      @close="toggleDrawer"
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
