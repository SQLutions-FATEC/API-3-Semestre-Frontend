<script>
import { Input } from 'ant-design-vue';

export default {
  name: 'AtInput',

  components: {
    'a-input': Input,
  },

  props: {
    placeholder: {
      required: true,
      type: String,
    },
    value: {
      default: '',
      type: String,
    },
  },

  emits: ['update:value'],

  setup(props, { emit }) {
    const handleInput = (event) => {
      emit('update:value', event.target.value);
    };

    return {
      placeholder: props.placeholder,
      handleInput,
    };
  },
};
</script>

<template>
  <a-input :placeholder="placeholder" :value="value" @input="handleInput" />
</template>
