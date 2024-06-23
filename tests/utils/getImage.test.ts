import { getImage } from "../../src/utils/getImage";

enum ImagesEnum {
  Image1 = "/path/to/image1.png",
  Image2 = "/path/to/image2.png",
  Image3 = "/path/to/image3.png",
}

describe("getImage function", () => {
  it("should return the correct image path for a valid index", () => {
    const index = 1;
    const imagePath = getImage(ImagesEnum, index);
    expect(imagePath).toEqual("/path/to/image2.png");
  });

  it("should cycle through images when index exceeds array length", () => {
    const index = 5;
    const imagePath = getImage(ImagesEnum, index);
    expect(imagePath).toEqual("/path/to/image3.png");
  });
});
