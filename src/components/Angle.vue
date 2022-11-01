<script lang="ts" setup>
import type { VCPoint } from "@/types";
import { computed, ref, type PropType } from "vue";
import { useDragEvent } from "@/hooks";

const props = defineProps({
  modelValue: Number as PropType<number>,
});

const emits = defineEmits(["change"]);

const { dragElRef } = useDragEvent({
  drag(e) {
    updateAngleByEvent(e as MouseEvent);
  },
  end(e) {
    updateAngleByEvent(e as MouseEvent);
  },
});

const RADIUS = 60;
const PADDING = 10;
const POINT_WIDTH = 6;
const middlePoint = computed<VCPoint>(() => {
  return {
    x: RADIUS + PADDING / 2,
    y: RADIUS + PADDING / 2,
  };
});

const angle = ref<number>(props.modelValue || 0);

const setAngleValue = (value: number) => {
  angle.value = value;
  emits("change", angle.value);
};

const pointEndPoint = computed<VCPoint>(() => {
  const deg = angle.value - 90;
  return {
    x: middlePoint.value.x + RADIUS * Math.cos(deg * (Math.PI / 180)),
    y: middlePoint.value.y + RADIUS * Math.sin(deg * (Math.PI / 180)),
  };
});

/**
 * 鼠标事件更新角度
 * @param event
 */
const updateAngleByEvent = (event: MouseEvent) => {
  const rect = (dragElRef.value as HTMLElement).getBoundingClientRect();
  const mp = middlePoint.value;
  const originX = rect.left + mp.x;
  const originY = rect.top + mp.y;
  const x = Math.abs(originX - event.clientX);
  const y = Math.abs(originY - event.clientY);
  const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  const cos = y / z;
  const rad = Math.acos(cos); //用反三角函数求弧度
  let deg = Math.floor(180 / (Math.PI / rad)); //将弧度转换成角度

  if (event.clientX > originX && event.clientY > originY) {
    //鼠标在第四象限
    deg = 180 - deg;
  }

  if (event.clientX == originX && event.clientY > originY) {
    //鼠标在y轴负方向上
    deg = 180;
  }

  if (event.clientX > originX && event.clientY == originY) {
    //鼠标在x轴正方向上
    deg = 90;
  }

  if (event.clientX < originX && event.clientY > originY) {
    //鼠标在第三象限
    deg = 180 + deg;
  }

  if (event.clientX < originX && event.clientY == originY) {
    //鼠标在x轴负方向
    deg = 270;
  }

  if (event.clientX < originX && event.clientY < originY) {
    //鼠标在第二象限
    deg = 360 - deg;
  }

  setAngleValue(deg);
};
</script>
<template>
  <svg
    :width="RADIUS * 2 + PADDING"
    :height="RADIUS * 2 + PADDING"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="angle"
    ref="dragElRef"
  >
    <circle
      :cx="middlePoint.x"
      :cy="middlePoint.y"
      :r="RADIUS"
      fill="white"
      stroke="#727c94"
      stroke-width="1"
    />
    <circle
      :cx="middlePoint.x"
      :cy="middlePoint.y"
      :r="RADIUS - PADDING"
      fill="white"
      stroke="#727c94"
      stroke-width="1"
    />
    <text
      :x="middlePoint.x"
      :y="middlePoint.y + 12"
      font-size="13px"
      font-family="Avenir,Helvetica,Arial,sans-serif"
      fill="#727c94"
      text-anchor="middle"
      dominant-baseline="middle"
    >
      {{ angle }}°
    </text>
    <g>
      <line
        :x1="middlePoint.x"
        :y1="middlePoint.y"
        :x2="pointEndPoint.x"
        :y2="pointEndPoint.y"
        :stroke-width="POINT_WIDTH"
        stroke="#0052d9"
      />
      <circle
        :cx="middlePoint.x"
        :cy="middlePoint.y"
        :r="POINT_WIDTH - 2"
        fill="#0052d9"
        stroke="white"
        stroke-width="1"
      />
      <!-- 
      <circle
        :cx="middlePoint.x"
        :cy="PADDING"
        :r="POINT_WIDTH - 2"
        fill="#0052d9"
        stroke="white"
        stroke-width="1"
      /> -->
    </g>
  </svg>
</template>
<style lang="less" scoped>
.angle {
  user-select: none;
  cursor: pointer;
}
</style>
