import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

export interface DragEventOptions {
  drag?: (event: Event) => void;
  start?: (event: Event) => void;
  end?: (event: Event) => void;
}

let isDragging: boolean = false;

export const useDragEvent = (options: DragEventOptions) => {
  const dragElRef = ref<HTMLElement>();

  const handleDrag = (event: Event) => {
    options.drag?.(event);
  };

  const handleDragEnd = (event: Event) => {
    document.onselect = null;
    document.ondragstart = null;
    document.removeEventListener("mousemove", handleDrag, false);
    document.removeEventListener("mouseup", handleDragEnd, false);
    document.removeEventListener("contextmenu", handleDragEnd, false);
    isDragging = false;
    options.end?.(event);
  };

  const handleDragStart = (event: Event) => {
    if (isDragging) {
      return;
    }
    document.onselect = () => false;
    document.ondragstart = () => false;
    document.addEventListener("mousemove", handleDrag, false);
    document.addEventListener("mouseup", handleDragEnd, false);
    document.addEventListener("contextmenu", handleDragEnd, false);
    options.start?.(event);
  };

  onMounted(() => {
    nextTick(
      () =>
        dragElRef.value &&
        dragElRef.value.addEventListener("mousedown", handleDragStart, false)
    );
  });

  onBeforeUnmount(() => {
    dragElRef.value &&
      dragElRef.value.removeEventListener("mousedown", handleDragStart, false);
  });

  return {
    dragElRef,
  };
};
