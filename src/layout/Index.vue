<script setup lang="ts">
import { useVisualCssStore } from "@/stores";
import type { VCWidgets } from "@/types";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import LayoutAside from "./Aside.vue";
import LayoutMain from "./Main.vue";
import LayoutPreview from "./Preview.vue";
const { handleSetCurrentWidget } = useVisualCssStore();

const route = useRoute();

watchEffect(() => {
  console.log(route.name);
  handleSetCurrentWidget(route.name as VCWidgets);
});
</script>
<template>
  <div class="app">
    <layout-aside />
    <layout-main />
    <layout-preview />
  </div>
</template>
<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}
</style>
