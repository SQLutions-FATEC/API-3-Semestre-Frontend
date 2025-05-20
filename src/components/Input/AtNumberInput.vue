<script>
import { ref, watch } from 'vue';
import { mask } from 'vue-the-mask';

export default {
  name: 'AtNumberInput',

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    errorMessage: {
      default: '',
      type: String,
    },
    mask: {
      default: '',
      type: String,
    },
    placeholder: {
      required: true,
      type: String,
    },
    value: {
      default: '',
      type: String,
    },
  },

  emits: ['update:value', 'input'],

  directives: { mask },

  setup(props, { emit }) {
    const inputValue = ref(props.value);

    watch(inputValue, (newValue) => {
      emit('update:value', newValue);
    });

    watch(
      () => props.value,
      (newValue) => {
        inputValue.value = newValue;
      }
    );

    const handleInput = (event) => {
      inputValue.value = event.target.value;
      emit('input', event);
    };

    return {
      inputValue,
      handleInput,
    };
  },
};
</script>

<template>
  <div class="at-number-input">
    <a-input
      v-mask="mask"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="inputValue"
      @input="handleInput"
    />
    <p v-if="errorMessage" class="input__error-message">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
.at-number-input {
  position: relative;

  .input__error-message {
    position: absolute;
    top: 36px;
    color: $colorTextError;
  }
}
</style>