<script setup lang="ts">
import { useVisualCssStore } from "@/stores";
import HighlightCode from "@/components/HighlightCode.vue";

const store = useVisualCssStore();
</script>
<template>
  <div class="app-code">
    <highlight-code :code="store.code" />
  </div>
</template>
<style lang="less" scoped>
.app-code {
  height: 40%;
  flex-shrink: 0;
  padding: 24px;
}
</style>
