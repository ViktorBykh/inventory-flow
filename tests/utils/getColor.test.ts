import { getColor } from "../../src/utils/getColor";

jest.mock("../../src/enums/backgroundColors", () => ({
  backgroundColors: {
    Color1: "color1",
    Color2: "color2",
    Color3: "color3",
    Color4: "color4",
  },
}));

describe("getColor function", () => {
  it("should return the correct color based on index", () => {
    expect(getColor(0)).toBe("color1");
    expect(getColor(1)).toBe("color2");
    expect(getColor(2)).toBe("color3");
    expect(getColor(3)).toBe("color4");

    expect(getColor(4)).toBe("color1");
    expect(getColor(5)).toBe("color2");
  });

  it("should handle large positive indices", () => {
    expect(getColor(100)).toBe("color1");
    expect(getColor(101)).toBe("color2");
  });
});
