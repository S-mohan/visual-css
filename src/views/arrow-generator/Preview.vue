<script lang="ts" setup>
import { useVisualCssStore } from "@/stores";
const store = useVisualCssStore();
</script>
<template>
  <div :style="store.styles"></div>
</template>
