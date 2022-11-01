<script setup lang="ts">
import ArrowDirection from "./Direction.vue";
import FormItem from "@/components/FormItem.vue";
import { useArrowGeneratorStore } from "@/stores";
import { usePropData } from "@/hooks";
import { toRef } from "vue";
import SliderWithInput from "@/components/SliderWithInput.vue";

const { formData, handleSetFormData } = useArrowGeneratorStore();

const [width, setWidth] = usePropData(
  toRef(formData, "width"),
  (newValue: number) =>
    handleSetFormData({
      width: newValue,
    })
);

const [height, setHeight] = usePropData(
  toRef(formData, "height"),
  (newValue: number) =>
    handleSetFormData({
      height: newValue,
    })
);

const [color, setColor] = usePropData(
  toRef(formData, "color"),
  (newValue: string) =>
    handleSetFormData({
      color: newValue,
    })
);
</script>
<template>
  <div class="graph">
    <form-item label="箭头方向">
      <arrow-direction />
    </form-item>
    <form-item label="箭头宽度">
      <slider-with-input
        v-model="width"
        :min="1"
        :max="200"
        @change="(v: number) => setWidth(v)"
      />
    </form-item>
    <form-item label="箭头高度">
      <slider-with-input
        v-model="height"
        :min="1"
        :max="200"
        @change="(v: number) => setHeight(v)"
      />
    </form-item>
    <form-item label="旋转角度"> </form-item>
    <form-item label="填充颜色">
      <t-color-picker
        :colorModes="['monochrome']"
        :recentColors="null"
        :swatchColors="null"
        enableAlpha
        format="RGBA"
        v-model="color"
        @change="setColor"
      />
    </form-item>
  </div>
</template>
<style lang="less" scoped>
.graph {
  max-width: 480px;
}
</style>
