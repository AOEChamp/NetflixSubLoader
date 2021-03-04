import { stripTags, hashFile } from "./Utils";

describe("stripTags", () => {
  test("with tags", () => {
    expect(
      stripTags("<c.bg_transparent><i>some tags</i></c.bg_transparent>")
    ).toBe("some tags");
  });
  test("without tags", () => {
    expect(stripTags("no tags")).toBe("no tags");
  });
  test("blank", () => {
    expect(stripTags("")).toBe("");
  });
});

describe("hashFile", () => {
  test("some srt", () => {
    const data = `1
00:01:06,199 --> 00:01:11,865
test subtitle 1

2
00:01:39,866 --> 00:01:40,798
test subtitle 2

3
00:01:41,668 --> 00:01:43,295
test subtitle 3
    `;
    expect(hashFile(data)).toBe("4a92da21");
  });
  test("test determinism", () => {
    const data = "test";
    expect(hashFile(data)).toBe(hashFile(data));
  });
  test("blank", () => {
    expect(hashFile("")).toBe("2cc5d05");
  });
});
