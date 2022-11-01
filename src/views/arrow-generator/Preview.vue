<script lang="ts" setup>
import { useArrowGeneratorStore } from "@/stores";
const store = useArrowGeneratorStore();
</script>
<template>
  <div :style="store.styles"></div>
</template>
