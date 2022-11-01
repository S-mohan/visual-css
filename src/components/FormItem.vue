<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  label: String as PropType<string>,
});
</script>
<template>
  <div class="form-item">
    <div class="form-item__label">
      <template v-if="label">{{ label }}</template>
      <slot v-else name="label"></slot>
    </div>
    <div class="form-item__content">
      <slot />
    </div>
  </div>
</template>
<style lang="less" scoped>
.form-item {
  display: flex;
  width: 100%;
  flex-direction: column;
  &__label {
    font-size: 20px;
    color: rgb(7, 55, 76);
  }
  &__content {
    margin-top: 12px;
  }

  + .form-item {
    margin-top: 24px;
  }
}
</style>
