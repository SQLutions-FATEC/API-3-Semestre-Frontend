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
  background-color: $colorBackgroundWhite;
  padding: $spacingLg $spacingXl;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: $spacingLg;
  h1 {
    @include heading(large);
    margin: 0;
  }
 }
</style>