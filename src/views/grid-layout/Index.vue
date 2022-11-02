<script setup lang="ts">
import FormItem from "@/components/FormItem.vue";
import SliderWithInput from "@/components/SliderWithInput.vue";
import { usePropData } from "@/hooks";
import { useGridLayoutStore } from "@/stores";
import { cloneDeep } from "lodash";
import { ref, toRef, watch } from "vue";
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

const columnCount = ref(store.formData.columns?.length || 0);

watch(
  () => store.formData.columns,
  () => {
    columnCount.value = store.formData.columns?.length || 0;
  },
  {
    deep: true,
  }
);

const rowCount = ref(store.formData.rows?.length || 0);

watch(
  () => store.formData.rows,
  () => {
    rowCount.value = store.formData.rows?.length || 0;
  },
  {
    deep: true,
  }
);

const handleCountChange = (value: number, type: number) => {
  let items: string[] =
    cloneDeep(type === 1 ? store.formData.columns : store.formData.rows) || [];
  if (items.length >= value) {
    items.length = value;
  } else {
    for (let i = 0; i < value - items.length; i++) {
      items.push("1fr");
    }
  }
  store.handleSetFormData({
    [type === 1 ? "columns" : "rows"]: items,
  });
};
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
          v-model="columnCount"
          @change="(v) => handleCountChange(v, 1)"
        />
      </form-item>
      <form-item label="行数">
        <slider-with-input
          :min="1"
          :max="100"
          :format="(value: number) => value"
          v-model="rowCount"
          @change="(v) => handleCountChange(v, 2)"
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
