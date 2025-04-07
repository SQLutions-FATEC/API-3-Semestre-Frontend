<script>
import { Button } from 'ant-design-vue';

export default {
  name: 'HomeFilters',

  components: {
    'a-button': Button,
  },

  setup() {
    const teste = () => {
      console.log('oi');
    };

    return {
      teste,
    };
  },
};
</script>

<template>
  <div class="home-filters">
    <span>Oi</span>
    <a-button @click="teste">Filtrar</a-button>
  </div>
</template>

<style lang="scss" scoped>
.home-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
