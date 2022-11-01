<script setup lang="ts">
import { useVisualCssStore } from "@/stores";

const store = useVisualCssStore();
</script>
<template>
  <div class="app-code">
    <pre>{{ store.code }}</pre>
  </div>
</template>
<style lang="less" scoped>
.app-code {
  height: 40%;
  flex-shrink: 0;
}
</style>
