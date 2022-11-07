<template>
  <div class="app-name">
    <h1>{{ enTitle }}</h1>
    <h3>{{ zhTitle }}</h3>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  const enTitle = ref('HAIXIAN');
  const zhTitle = ref('海鲜商户');
</script>
<style lang="scss" scoped>
  .app-name {
    color: #fff;
    margin-top: 180px;
    h1 {
      font-size: 56px;
      text-align: center;
    }
    h3 {
      text-align: center;
      font-size: 32px;
    }
  }
</style>
