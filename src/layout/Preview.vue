<script setup lang="ts">
import PreviewCode from "./Code.vue";
import PreviewArrowGenerator from "@/views/arrow-generator/Preview.vue";
import { VCWidgets } from "@/types";
import { computed, type Component } from "vue";
import { useVisualCssStore } from "@/stores";

const { currentWidget } = useVisualCssStore();

const previewComponentMap: {
  [key in VCWidgets]: Component;
} = {
  [VCWidgets.ARROW_GENERATOR]: PreviewArrowGenerator,
  [VCWidgets.GRID_LAYOUT]: PreviewArrowGenerator,
};

const previewComponent = computed(() => previewComponentMap[currentWidget]);
</script>
<template>
  <aside class="app-preview">
    <div class="preview-graph">
      <component :is="previewComponent" />
    </div>
    <preview-code />
  </aside>
</template>
<style lang="less" scoped>
.app-preview {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  width: 25vw;
  .preview-graph {
    overflow: hidden;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.25) 25%,
        transparent 0,
        transparent 75%,
        rgba(0, 0, 0, 0.25) 0
      ),
      linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.25) 25%,
        transparent 0,
        transparent 75%,
        rgba(0, 0, 0, 0.25) 0
      );
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    > div {
      transition: all 0.5s;
    }
  }
}
</style>
