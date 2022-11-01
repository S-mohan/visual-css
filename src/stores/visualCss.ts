import { VCWidgets } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useVisualCssStore = defineStore("visualCss", () => {
  const code = ref<string>("");

  const handleSetCode = function (value: string) {
    code.value = value;
  };

  const currentWidget = ref<VCWidgets>(VCWidgets.ARROW_GENERATOR);

  const handleSetCurrentWidget = function (widget: VCWidgets) {
    currentWidget.value = widget;
    handleSetCode("");
  };

  return {
    code,
    handleSetCode,
    currentWidget,
    handleSetCurrentWidget,
  };
});
