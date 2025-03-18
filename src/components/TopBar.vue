<script>
import { Button } from 'ant-design-vue';
import { MenuOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    'a-button': Button,
    MenuOutlined,
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
  <div class="top-bar">
    <a-button type="primary" shape="circle" @click="toggleSidebar">
      <template #icon>
        <menu-outlined />
      </template>
    </a-button>
  </div>
</template>

<style scoped>
.top-bar {
  height: 50px;
  background-color: blue;
  display: flex;
  align-items: center;
  padding: 0 16px;
}
</style>
