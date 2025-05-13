<script>
import {
  BankOutlined,
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { Drawer } from 'ant-design-vue';
import { useRouter } from 'vue-router';

export default {
  name: 'SideBar',

  props: {
    isOpen: {
      required: true,
      type: Boolean,
    },
  },

  components: {
    'a-drawer': Drawer,
    'bank-outlined': BankOutlined,
    'dashboard-outlined': DashboardOutlined,
    'user-outlined': UserOutlined,
  },

  setup(props, { emit }) {
    const router = useRouter();

    const toggleSidebar = () => {
      emit('toggle-sidebar');
    };

    const redirect = (path) => {
      router.push({
        path: `/${path}`,
      });
      toggleSidebar();
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
      <router-link to="/" class="main-page-link"> Home </router-link>
    </template>
    <div class="side-bar">
      <a-button
        block
        class="bar__button"
        type="text"
        @click="redirect('employee')"
      >
        Funcionários
        <template #icon>
          <user-outlined />
        </template>
      </a-button>
      <a-button
        block
        class="bar__button"
        type="text"
        @click="redirect('company')"
      >
        Empresas
        <template #icon>
          <bank-outlined />
        </template>
      </a-button>
      <a-button
        block
        class="bar__button"
        type="text"
        @click="redirect('dashboard')"
      >
        Dashboard
        <template #icon>
          <dashboard-outlined />
        </template>
      </a-button>
    </div>
  </a-drawer>
</template>

<style lang="scss" scoped>
.main-page-link {
  @include heading(medium);
  color: $colorSecondaryHighlight;
  margin-left: $spacingLg;
  text-decoration: underline;
  text-transform: uppercase;
}
.side-bar {
  display: flex;
  flex-direction: column;
  margin-top: $spacingLg;

  .bar__button {
    @include paragraph(medium);
    height: 40px;
    border-radius: 0px;
    background-color: transparent;

    &:hover {
      background-color: $colorBackgroundSecondary !important;
      color: $colorTextWhite;
    }
  }
}
</style>
