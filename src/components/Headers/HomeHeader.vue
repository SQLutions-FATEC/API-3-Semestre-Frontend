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

<style lang="scss" scoped>
.home-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
