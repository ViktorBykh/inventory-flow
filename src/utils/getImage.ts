export const getImage = (imagesEnum: any, index: number): string => {
  const images = Object.values(imagesEnum) as string[];
  return images[index % images.length];
};