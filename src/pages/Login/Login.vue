<script>
import { Button } from 'ant-design-vue';
import { ref } from 'vue';

export default {
  components: {
    'a-button': Button,
  },

  setup() {
    const count = ref(0);

    return {
      count,
    };
  },

  mounted() {},
};
</script>

<template>
  <a-button type="primary" @click="count++">{{ count }}</a-button>
</template>
