<script>
import { ref, watch } from 'vue';
import { mask } from 'vue-the-mask';

export default {
  name: 'AtNumberInput',

  props: {
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

  emits: ['update:value'],

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

    return {
      inputValue,
    };
  },
};
</script>

<template>
  <div class="at-number-input">
    <a-input
      v-mask="mask"
      :placeholder="placeholder"
      :value="inputValue"
      @input="(event) => (inputValue = event.target.value)"
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
    color: red;
  }
}
</style>
