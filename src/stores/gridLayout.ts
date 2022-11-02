import { computed, reactive, type CSSProperties } from "vue";
import { defineStore } from "pinia";
import { useVisualCssStore } from "./visualCss";

export interface GridLayoutFormData {
  rowGap?: number;
  columnGap?: number;
  rows?: string[];
  columns?: string[];
}

export const useGridLayoutStore = defineStore("gridLayout", () => {
  const { handleSetStyles } = useVisualCssStore();

  const formData = reactive<GridLayoutFormData>({
    rowGap: 0,
    columnGap: 0,
    rows: ["1fr", "1fr", "1fr", "1fr", "1fr"],
    columns: ["1fr", "1fr", "1fr", "1fr", "1fr"],
  });

  const rowCount = computed(() => formData.rows?.length || 0);
  const columnCount = computed(() => formData.columns?.length || 0);

  const gapStyle = computed(
    () => `${formData.rowGap}px ${formData.columnGap}px`
  );

  const handleSetFormData = function (data: GridLayoutFormData) {
    Object.keys(data).forEach((key) => {
      const k = key as keyof GridLayoutFormData;
      formData[k] = data[k] as unknown as any;
    });
    handleSetStyles(getPreviewStyles());
  };

  const getPreviewStyles = function (): CSSProperties {
    const obj: CSSProperties = Object.create(null);
    return obj;
  };

  const getGridTemplateCss = function (items: string[]) {
    const templates = new Map();
    items.forEach((item) => {
      if (templates.has(item)) {
        templates.set(item, templates.get(item) + 1);
      } else {
        templates.set(item, 1);
      }
    });

    const css = [];
    for (const [key, value] of templates) {
      if (value > 1) {
        css.push(`repeat(${value}, ${key})`);
      } else {
        css.push(key);
      }
    }
    return css.join(" ");
  };

  handleSetStyles(getPreviewStyles());

  return {
    formData,
    rowCount,
    columnCount,
    gapStyle,
    handleSetFormData,
    getPreviewStyles,
    getGridTemplateCss,
  };
});
