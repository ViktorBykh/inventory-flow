import { backgroundColors } from "../enums/backgroundColors";

export const getColor = (index: number) => {
  const colors = Object.values(backgroundColors);
  return colors[index % colors.length];
};