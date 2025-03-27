<script>
import { ref } from 'vue';
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
    text: {
      default: false,
      type: Boolean,
    },
    value: {
      default: '',
      type: String,
    },
  },

  emits: ['update:value'],

  setup(props, { emit }) {
    const errorMessage = ref('');
    const lastValidValue = ref(props.value);

    const handleInput = (event) => {
      const value = event.target.value;
      const isText = /^[a-zA-Z]+$/.test(value);

      if (props.text && !isText) {
        errorMessage.value = 'Somente texto permitido';
        event.target.value = lastValidValue.value;
      } else {
        errorMessage.value = '';
        lastValidValue.value = value;
        emit('update:value', value);
      }
    };

    return {
      errorMessage,
      placeholder: props.placeholder,
      handleInput,
    };
  },
};
</script>

<template>
  <div>
    <a-input :placeholder="placeholder" :value="value" @input="handleInput" />
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>
