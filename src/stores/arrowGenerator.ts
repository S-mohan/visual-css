import { computed, reactive, watchEffect, type CSSProperties } from "vue";
import { defineStore } from "pinia";
import type { VCArrowDirection } from "@/types";
import { kebabCase } from "lodash";
import { useVisualCssStore } from "./visualCss";

export interface ArrowGeneratorFormData {
  direction?: VCArrowDirection;
  width?: number;
  height?: number;
  angle?: number;
  color?: string;
}

type StyleMap = {
  [key in VCArrowDirection]: string;
};

const borderColorMaps: StyleMap = {
  top: "currentColor transparent transparent transparent",
  right: "transparent currentColor transparent transparent",
  bottom: "transparent transparent currentColor transparent",
  left: "transparent transparent transparent currentColor",
  "left-top": "currentColor transparent transparent transparent",
  "right-top": "transparent currentColor transparent transparent",
  "left-bottom": "transparent transparent transparent currentColor",
  "right-bottom": "transparent transparent currentColor transparent",
};

const getBorderWidth = (formData: ArrowGeneratorFormData): StyleMap => {
  const width = formData.width as number;
  const height = formData.height as number;
  const halfWidth = Math.round(width / 2);
  const halfHeight = Math.round(height / 2);

  return {
    top: `${height}px ${halfWidth}px 0 ${halfWidth}px`,
    right: `${halfHeight}px ${width}px ${halfHeight}px 0`,
    bottom: `0 ${halfWidth}px ${height}px ${halfWidth}px`,
    left: `${halfHeight}px 0 ${halfHeight}px ${width}px`,
    "left-top": `${height}px ${width}px 0 0`,
    "right-top": `0 ${width}px ${height}px 0`,
    "left-bottom": `${height}px 0 0 ${width}px`,
    "right-bottom": `0 0 ${height}px ${width}px`,
  };
};

export const useArrowGeneratorStore = defineStore("arrowGenerator", () => {
  const { handleSetCode } = useVisualCssStore();

  const formData = reactive<ArrowGeneratorFormData>({
    direction: "top",
    width: 100,
    height: 100,
    angle: 0,
    color: "#0052d9",
  });

  const styles = computed(() => getPreviewStyles());

  const handleSetFormData = function (data: ArrowGeneratorFormData) {
    Object.keys(data).forEach((key) => {
      const k = key as keyof ArrowGeneratorFormData;
      formData[k] = data[k] as unknown as any;
    });
  };

  const getPreviewStyles = function (): CSSProperties {
    const obj: CSSProperties = Object.create(null);
    const direction = formData.direction as VCArrowDirection;
    obj.width = 0;
    obj.height = 0;
    obj.display = "block";
    obj.borderStyle = "solid";
    obj.borderColor = "currentColor";
    obj.borderColor = borderColorMaps[direction];
    obj.borderWidth = getBorderWidth(formData)[direction];
    obj.color = formData.color;
    obj.transform = `rotate(${formData.angle}deg)`;
    return obj;
  };

  watchEffect(() => {
    const codes: string[] = [];
    const styleObj = styles.value;
    Object.keys(styleObj).forEach((key) => {
      codes.push(`${kebabCase(key)}: ${styleObj[key as any]};`);
    });
    handleSetCode(codes.join("\n"));
  });

  return {
    formData,
    styles,
    handleSetFormData,
    getPreviewStyles,
  };
});
