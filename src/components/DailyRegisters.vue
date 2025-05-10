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

  setup(props) {
    const { clockInQtt, clockOutQtt } = props;

    return {
      clockInQtt,
      clockOutQtt,
    };
  },
};
</script>

<template>
  <div class="daily-registers">
    <h2>Pontos registrados (diário)</h2>
    <div class="register__content">
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
  gap: $spacingSm;

  h2 {
    @include paragraph(medium);
  }
  .register__content {
    display: flex;
    width: 220px;
    background-color: $colorBackgroundNeutral;
    border-radius: $borderRadiusSm;
    padding: $spacingMd $spacingXl;

    h3 {
      @include paragraph(large);
    }
    span {
      @include label(large);
    }
    .col-6 {
      display: flex;
      flex-direction: column;
      gap: $spacingMd;
      flex: 0 0 50%;
      max-width: 50%;
      box-sizing: border-box;
      text-align: center;
    }
  }
}
</style>
