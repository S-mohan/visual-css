<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { VCPoint2, VCArrowDirection } from "@/types";
import { useArrowGeneratorStore } from "@/stores";
interface DirectionPoints {
  key: VCArrowDirection;
  points: VCPoint2[];
}

const { formData, handleSetFormData } = useArrowGeneratorStore();

const DIRECTION_SIZE = 200;

const previewDirection = ref(formData.direction);

watch(
  () => formData.direction,
  (value) => (previewDirection.value = value)
);

const handleMouseenter = (value: VCArrowDirection) =>
  (previewDirection.value = value);

const handleMouseleave = () => {
  previewDirection.value = formData.direction;
};

const directionMiddlePoint = computed<VCPoint2>(() => [
  DIRECTION_SIZE / 2,
  DIRECTION_SIZE / 2,
]);

const directionArrows = computed<DirectionPoints[]>(() => {
  return [
    {
      key: "top",
      points: [[0, 0], [DIRECTION_SIZE, 0], directionMiddlePoint.value],
    },
    {
      key: "right",
      points: [
        [DIRECTION_SIZE, 0],
        [DIRECTION_SIZE, DIRECTION_SIZE],
        directionMiddlePoint.value,
      ],
    },
    {
      key: "bottom",
      points: [
        [DIRECTION_SIZE, DIRECTION_SIZE],
        [0, DIRECTION_SIZE],
        directionMiddlePoint.value,
      ],
    },
    {
      key: "left",
      points: [[0, 0], [0, DIRECTION_SIZE], directionMiddlePoint.value],
    },
  ];
});

// 方向选择器中间对角线
const directionLines = computed<DirectionPoints[]>(() => {
  return [
    {
      key: "left-top",
      points: [[0, 0], directionMiddlePoint.value],
    },
    {
      key: "left-bottom",
      points: [[0, DIRECTION_SIZE], directionMiddlePoint.value],
    },
    {
      key: "right-top",
      points: [[DIRECTION_SIZE, 0], directionMiddlePoint.value],
    },
    {
      key: "right-bottom",
      points: [[DIRECTION_SIZE, DIRECTION_SIZE], directionMiddlePoint.value],
    },
  ];
});

// eslint-disable-next-line vue/return-in-computed-property
const currentDirectionArrowPoints = computed<VCPoint2[]>(() => {
  switch (previewDirection.value as VCArrowDirection) {
    case "top":
    case "right":
    case "bottom":
    case "left": {
      return directionArrows.value.find(
        (it) => it.key === previewDirection.value
      )?.points as VCPoint2[];
    }
    case "left-top":
      return [
        [0, 0],
        [DIRECTION_SIZE, 0],
        [0, DIRECTION_SIZE],
      ];
    case "right-top":
      return [
        [0, 0],
        [DIRECTION_SIZE, 0],
        [DIRECTION_SIZE, DIRECTION_SIZE],
      ];
    case "left-bottom":
      return [
        [0, 0],
        [0, DIRECTION_SIZE],
        [DIRECTION_SIZE, DIRECTION_SIZE],
      ];
    case "right-bottom":
      return [
        [DIRECTION_SIZE, 0],
        [DIRECTION_SIZE, DIRECTION_SIZE],
        [0, DIRECTION_SIZE],
      ];
  }
});
</script>
<template>
  <svg
    :width="DIRECTION_SIZE"
    :height="DIRECTION_SIZE"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="arrow-direction"
  >
    <polygon
      :points="currentDirectionArrowPoints.map((p) => p.join(',')).join(' ')"
      fill="rgba(114,124,148, .2)"
    />

    <polygon
      v-for="d in directionArrows"
      :key="d.key"
      :points="d.points.map((p) => p.join(',')).join(' ')"
      fill="transparent"
      @mouseenter="handleMouseenter(d.key)"
      @mouseleave="handleMouseleave"
      @click="
        handleSetFormData({
          direction: d.key,
        })
      "
    />

    <g v-for="d in directionLines" :key="d.key">
      <line
        :x1="d.points[0][0]"
        :x2="d.points[1][0]"
        :y1="d.points[0][1]"
        :y2="d.points[1][1]"
        stroke="currentColor"
        stroke-dasharray="3"
      />

      <line
        :x1="d.points[0][0]"
        :x2="d.points[1][0]"
        :y1="d.points[0][1]"
        :y2="d.points[1][1]"
        stroke="transparent"
        stroke-width="12"
        @mouseenter="handleMouseenter(d.key)"
        @mouseleave="handleMouseleave"
        @click="
          handleSetFormData({
            direction: d.key,
          })
        "
      />
    </g>
  </svg>
</template>
<style lang="less" scoped>
.arrow-direction {
  color: #727c94;
  border: 1px dashed;
  position: relative;
  cursor: pointer;
}
</style>
