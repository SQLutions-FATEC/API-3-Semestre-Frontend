<script>
import { Button } from 'ant-design-vue';
import { MenuOutlined } from '@ant-design/icons-vue';

export default {
  name: 'TopBar',
  
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
    <div class="top-bar__container">
      <a-button class="top-bar__button" type="primary" shape="circle" @click="toggleSidebar">
        <template #icon>
          <menu-outlined />
        </template>
      </a-button>
      <img alt="altave" src="/assets/altave.svg"
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-bar {
  height: 50px;
  background-color: $colorBackgroundPrimary;
  display: flex;
  align-items: center;
  justify-content: center;

  .top-bar__container {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    padding: 0 $spacingLg;

    .top-bar__button {
      background-color: $colorSecondary;
    }
  }
}
</style>
