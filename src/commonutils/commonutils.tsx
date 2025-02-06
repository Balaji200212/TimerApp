import { PixelRatio } from "react-native";

export const scaleSize = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * PixelRatio.get());
};
