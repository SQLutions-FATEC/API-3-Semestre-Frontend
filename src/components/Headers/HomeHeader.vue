<script>
import HomeFilters from '@/components/HomeFilters.vue';

export default {
  name: 'HomeHeader',

  components: {
    'home-filters': HomeFilters,
  },
};
</script>

<template>
  <div class="home-header">
    <h1>Sistema de ponto</h1>
    <home-filters />
  </div>
</template>

<style lang="scss">
.home-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #ffffff;
  padding: 16px 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 16px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }
}
</style>
