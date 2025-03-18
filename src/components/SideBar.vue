<script>
import { Drawer } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { UserOutlined } from '@ant-design/icons-vue';
import { WhatsAppOutlined } from '@ant-design/icons-vue';

export default {
  props: {
    isOpen: {
      required: true,
      type: Boolean,
    },
  },

  components: {
    'a-drawer': Drawer,
    WhatsAppOutlined,
    UserOutlined,
  },

  setup(props, { emit }) {
    const router = useRouter();

    const toggleSidebar = () => {
      emit('toggle-sidebar');
    };

    const redirect = (path) => {
      router.push({
        path: path,
      });
    };

    return {
      toggleSidebar,
      redirect,
    };
  },
};
</script>

<template>
  <a-drawer
    placement="left"
    :bodyStyle="{ padding: '0px' }"
    :open="isOpen"
    @close="toggleSidebar"
  >
    <template #title>
      <router-link to="/" style="color: inherit; text-decoration: underline">
        Altave
      </router-link>
    </template>
    <div class="side-bar">
      <a-button block type="primary" @click="redirect('employee')">
        Funcionários
        <template #icon>
          <user-outlined />
        </template>
      </a-button>
      <a-button block type="primary" @click="redirect('company')">
        Empresas
        <template #icon>
          <whats-app-outlined />
        </template>
      </a-button>
    </div>
  </a-drawer>
</template>

<style lang="scss" scoped>
.side-bar {
  display: flex;
  flex-direction: column;
}
</style>
