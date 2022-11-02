<script setup lang="ts">
import { toRef } from "vue";
import { useArrowGeneratorStore } from "@/stores";
import { usePropData } from "@/hooks";
import FormItem from "@/components/FormItem.vue";
import SliderWithInput from "@/components/SliderWithInput.vue";
import AngleSelector from "@/components/Angle.vue";
import ArrowDirection from "./Direction.vue";

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

const [angle, setAngle] = usePropData(
  toRef(formData, "angle"),
  (newValue: number) =>
    handleSetFormData({
      angle: newValue,
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
    <form-item label="旋转角度">
      <angle-selector v-model="angle" @change="setAngle" />
    </form-item>
    <form-item label="填充颜色">
      <t-color-picker
        :colorModes="['monochrome']"
        :recentColors="null"
        :swatchColors="[
          '#0052d9',
          '#e34d59',
          '#ed7b2f',
          '#00a870',
          '#ffffff',
          '#000000',
          '#727c94',
          '#07374c',
        ]"
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
