<script>
export default {
  name: 'DailyRegisters',

  props: {
    clockInQtt: {
      required: true,
      type: Number,
    },
    clockOutQtt: {
      required: true,
      type: Number,
    },
  },
};
</script>

<template>
  <div class="daily-registers">
    <h2>Pontos registrados (diário)</h2>
    <div class="graph-container register__content">
      <div class="col-6">
        <h3>Entradas</h3>
        <span>{{ clockInQtt }}</span>
      </div>
      <div class="col-6">
        <h3>Saída</h3>
        <span>{{ clockOutQtt }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daily-registers {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  gap: $spacingSm;

  h2 {
    @include paragraph(medium);
  }
  .register__content {
    display: flex;
    width: 240px;
    gap: $spacingXxl;

    h3 {
      @include paragraph(large);
    }
    span {
      @include label(large);
    }
  }
}
</style>
