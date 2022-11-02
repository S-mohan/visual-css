import { VCWidgets } from "@/types";
import { kebabCase } from "lodash-es";
import { defineStore } from "pinia";
import { ref, watchEffect, type CSSProperties } from "vue";

export const useVisualCssStore = defineStore("visualCss", () => {
  // generated code
  const code = ref<string>("");
  // computed styles
  const styles = ref<CSSProperties>({});

  const handleSetCode = function (value: string) {
    code.value = value;
  };

  const handleSetStyles = function (css: CSSProperties) {
    styles.value = css;
  };

  const currentWidget = ref<VCWidgets>(VCWidgets.ARROW_GENERATOR);

  const handleSetCurrentWidget = function (widget: VCWidgets) {
    currentWidget.value = widget;
    handleSetCode("");
  };

  watchEffect(() => {
    const codes: string[] = [];
    const styleObj = styles.value as CSSProperties;
    Object.keys(styleObj).forEach((key) => {
      codes.push(`${kebabCase(key)}: ${styleObj[key as any]};`);
    });
    handleSetCode(codes.join("\n"));
  });

  return {
    code,
    currentWidget,
    styles,
    handleSetCode,
    handleSetCurrentWidget,
    handleSetStyles,
  };
});
