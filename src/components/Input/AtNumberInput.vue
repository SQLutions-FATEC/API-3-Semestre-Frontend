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

  emits: ['update:value', 'update:errorMessage'],

  directives: { mask },

  setup(props, { emit }) {
    const inputValue = ref(props.value);
    const error = ref(props.errorMessage);

    watch(inputValue, (newValue) => {
      emit('update:value', newValue);

      const rawValue = newValue.replace(/\D/g, '');
      if (rawValue.length === 14) {
        error.value = '';
      } else {
        error.value = 'CNPJ deve ter 14 dígitos.';
      }

      emit('update:errorMessage', error.value);
    });

    watch(
      () => props.value,
      (newValue) => {
        inputValue.value = newValue;
      }
    );

    return {
      inputValue,
      error,
    };
  },
};
</script>

<template>
  <div>
    <a-input
      v-mask="mask"
      :placeholder="placeholder"
      :value="inputValue"
      @input="(event) => (inputValue = event.target.value)"
    />
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>
