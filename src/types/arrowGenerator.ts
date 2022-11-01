export type VCStandardDirection = "top" | "right" | "bottom" | "left";

export type VCArrowDirection =
  | VCStandardDirection
  | "left-top" // 左上
  | "right-top" // 右上
  | "left-bottom" // 左下
  | "right-bottom"; // 右下
