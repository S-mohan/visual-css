<script setup lang="ts">
import FormItem from "@/components/FormItem.vue";
import SliderWithInput from "@/components/SliderWithInput.vue";
import { usePropData } from "@/hooks";
import { useGridLayoutStore } from "@/stores";
import { toRef } from "vue";
import Layout from "./Layout.vue";
const store = useGridLayoutStore();

const [columnGap, setColumnGap] = usePropData(
  toRef(store.formData, "columnGap"),
  (value: number) => {
    store.handleSetFormData({
      columnGap: value,
    });
  }
);

const [rowGap, setRowGap] = usePropData(
  toRef(store.formData, "rowGap"),
  (value: number) => {
    store.handleSetFormData({
      rowGap: value,
    });
  }
);
</script>
<template>
  <div class="graph">
    <form-item label="布局">
      <layout />
    </form-item>
    <div style="max-width: 480px; margin-top: 24px">
      <form-item label="列数">
        <slider-with-input
          :min="1"
          :max="100"
          :format="(value: number) => value"
        />
      </form-item>
      <form-item label="行数">
        <slider-with-input
          :min="1"
          :max="100"
          :format="(value: number) => value"
        />
      </form-item>
      <form-item label="列间距">
        <slider-with-input
          :min="0"
          :max="200"
          v-model="columnGap"
          @change="setColumnGap"
        />
      </form-item>
      <form-item label="行间距">
        <slider-with-input
          :min="0"
          :max="200"
          v-model="rowGap"
          @change="setRowGap"
        />
      </form-item>
    </div>
  </div>
</template>
