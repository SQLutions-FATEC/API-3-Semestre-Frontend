<script>
import { ref, watch } from 'vue';
import { Input } from 'ant-design-vue';

export default {
  name: 'AtInput',

  components: {
    'a-input': Input,
  },

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
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
    const inputValue = ref(props.value);

    watch(
      () => props.value,
      (newVal) => {
        inputValue.value = newVal;
        lastValidValue.value = newVal;
      }
    );

    const handleInput = (event) => {
      const value = event.target.value;

      if (value === '') {
        emit('update:value', value);
        return;
      }

      const isText = /^[a-zA-ZÀ-ÿ\s]+$/.test(value);

      if (props.text && !isText) {
        errorMessage.value = 'Somente texto permitido';
        event.target.value = lastValidValue.value;
      } else {
        errorMessage.value = '';
        lastValidValue.value = value;
        inputValue.value = value;
        emit('update:value', value);
      }
    };

    return {
      errorMessage,
      handleInput,
      inputValue,
      placeholder: props.placeholder,
    };
  },
};
</script>

<template>
  <div class="at-input">
    <a-input
      :disabled="disabled"
      :placeholder="placeholder"
      :value="inputValue"
      @input="handleInput"
    />
    <p v-if="errorMessage" class="input__error-message">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
.at-input {
  position: relative;

  .input__error-message {
    position: absolute;
    top: 36px;
    color: red;
  }
}
:deep(.ant-input) {
  font-family: $fontFamily;
}
</style>
