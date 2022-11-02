import { cloneDeep } from "lodash-es";
import { ref, watch, type Ref } from "vue";

export type ChangeHandler<T> = (value: T, ...args: any) => void;

export const usePropData = <T, P extends (...args: any) => void>(
  prop: Ref<T>,
  onChange?: P
): [Ref<T>, ChangeHandler<T>] => {
  const value: Ref<T> = ref(cloneDeep(prop));

  watch(
    () => prop,
    () => {
      value.value = cloneDeep(prop.value);
    },
    {
      deep: true,
    }
  );

  return [
    value,
    (newValue: T, ...args: any) => {
      value.value = newValue;
      onChange?.(newValue, ...args);
    },
  ];
};
