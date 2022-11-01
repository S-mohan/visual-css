<script setup lang="ts">
import { ref, type PropType } from "vue";

const props = defineProps({
  modelValue: Number as PropType<number>,
  min: {
    type: Number as PropType<number>,
    default: 0,
  },
  max: {
    type: Number as PropType<number>,
    default: 100,
  },
  step: {
    type: Number as PropType<number>,
    default: 1,
  },
});

const emits = defineEmits(["change"]);

const value = ref(props.modelValue);

const setValue = (v: number) => {
  emits("change", v);
};
</script>
<template>
  <t-slider
    v-model="value"
    :show-tooltip="true"
    :min="min"
    :max="max"
    :step="step"
    :input-number-props="{
      theme: 'column',
    }"
    @change="setValue"
  />
</template>
