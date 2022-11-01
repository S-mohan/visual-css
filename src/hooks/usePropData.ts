import { ref, watch, type Ref } from "vue";

export type ChangeHandler<T> = (value: T, ...args: any) => void;

export const usePropData = <T, P extends (...args: any) => void>(
  prop: Ref<T>,
  onChange?: P
): [Ref<T>, ChangeHandler<T>] => {
  const value: Ref<T> = ref(prop);

  watch(
    () => prop,
    () => {
      value.value = prop.value;
    }
  );

  return [
    value,
    (newValue: T, ...args: any) => {
      console.log(3333, newValue);
      value.value = newValue;
      onChange?.(newValue, ...args);
    },
  ];
};
