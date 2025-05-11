<script></script>

<template>
  <div class="graph-employees-by-gender">
    <h2>Quantidade de funcionários por gênero</h2>
    <span class="graph-container">Oi</span>
  </div>
</template>

<style lang="scss" scoped>
.graph-employees-by-gender {
  display: flex;
  flex-direction: column;
  gap: $spacingSm;

  h2 {
    @include paragraph(medium);
    text-align: start;
  }
}
</style>
