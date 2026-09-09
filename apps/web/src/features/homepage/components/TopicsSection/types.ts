export type ColorVariant = "water" | "brick" | "gold" | "gray";

export interface Topic {
  id: string;
  name: string;
  articleCount: number;
  colorVariant?: ColorVariant;
}

export interface TopicPosition {
  topic: Topic;
  fontSize: number;
  fontWeight: "normal" | "semibold" | "bold";
  x: number;
  y: number;
  width: number;
  height: number;
  colorVariant: ColorVariant;
}

export interface BoundingBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
  centerX: number;
  centerY: number;
}
