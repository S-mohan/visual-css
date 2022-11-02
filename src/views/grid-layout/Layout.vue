<script lang="ts" setup>
import { usePropData } from "@/hooks";
import { useGridLayoutStore } from "@/stores";
import { computed, toRef, watchEffect } from "vue";
const store = useGridLayoutStore();

const templateRows = computed(() =>
  store.getGridTemplateCss(store.formData.rows || [])
);
const templateColumns = computed(() =>
  store.getGridTemplateCss(store.formData.columns || [])
);

const [rows, setRows] = usePropData(
  toRef(store.formData, "rows"),
  (value: string, index: number) => {}
);

const [columns, setColumns] = usePropData(
  toRef(store.formData, "columns"),
  (value: string, index: number) => {}
);


const handleColUnitChange = (value: string, index: number, type: number) => {};
</script>
<template>
  <div class="layout">
    <section
      class="layout-rows"
      :style="{
        gridTemplateRows: templateRows,
        gap: store.gapStyle,
      }"
    >
      <div class="grid-item" v-for="(it, index) in rows" :key="index">
        <t-input
          v-model="(rows as string[])[index]"
          :maxlength="10"
          align="center"
          @change="(v:string) => handleColUnitChange(v, index, 1)"
        />
      </div>
    </section>
    <main class="layout-main">
      <section
        class="layout-cols"
        :style="{
          gridTemplateColumns: templateColumns,
          gap: store.gapStyle,
        }"
      >
        <div class="grid-item" v-for="(it, index) in columns" :key="index">
          <t-input
            v-model="(columns as string[])[index]"
            :maxlength="10"
            align="center"
            @change="(v:string) => handleColUnitChange(v, index, 2)"
          />
        </div>
      </section>
      <section
        class="layout-grids"
        :style="{
          gridTemplateRows: templateRows,
          gridTemplateColumns: templateColumns,
          gap: store.gapStyle,
        }"
      >
        <div
          class="grid-item"
          v-for="index of store.rowCount * store.columnCount"
          :key="index"
        ></div>
      </section>
    </main>
  </div>
</template>
<style lang="less" scoped>
.layout {
  display: flex;
  flex-flow: row nowrap;
  min-height: 40vh;
  &-rows,
  &-cols {
    flex-shrink: 0;
    display: grid;
  }
  &-rows {
    grid-template-columns: 74px;
    padding-top: 50px;
    .grid-item {
      justify-content: flex-start !important;
    }
  }
  &-cols {
    grid-template-rows: 50px;
    width: 100%;
  }
  &-main {
    display: flex;
    flex-flow: column;
    flex: 1;
  }
  &-grids {
    flex: 1;
    display: grid;
    width: 100%;

    .grid-item {
      color: #727c94;
      border: 1px dashed;
    }
  }
  .grid-item {
    display: flex;
    align-items: center;
    justify-content: center;
    :deep(.t-input__wrap) {
      width: auto;
    }
    :deep(.t-input) {
      width: 64px;
    }
  }
}
</style>
