import { parseSubtitle } from "./Parser";

describe("parseSubtitle", () => {
  test("with SRT data", () => {
    const data_str = `1
00:01:06,199 --> 00:01:11,865
test subtitle 1

2
00:01:39,866 --> 00:01:40,798
test subtitle 2

3
00:01:41,668 --> 00:01:43,295
test subtitle 3
    `;
    expect(parseSubtitle(data_str)).toEqual([
      [66199, 71865, "test subtitle 1"],
      [99866, 100798, "test subtitle 2"],
      [101668, 103295, "test subtitle 3"],
    ]);
  });

  test("Netflix style WEBVTT", () => {
    const data_str = `WEBVTT

NOTE Netflix
NOTE Profile: webvtt-lssdh-ios8
NOTE Date: 2019/08/06 05:03:50

NOTE SegmentIndex
NOTE Segment=594.260 21365@350 119
NOTE Segment=592.509 23176@21715 137
NOTE Segment=249.040 5899@44891 32
NOTE /SegmentIndex

                                                                                                                  


1
00:01:59.160 --> 00:02:01.079 position:50.00%,middle align:middle size:80.00% line:84.67% 
<c.bg_transparent><i>test subtitle 1</i></c.bg_transparent>

2
00:02:01.830 --> 00:02:02.664 position:50.00%,middle align:middle size:80.00% line:84.67% 
<c.bg_transparent><i>test subtitle 2</i></c.bg_transparent>

3
00:02:04.582 --> 00:02:06.751 position:50.00%,middle align:middle size:80.00% line:84.67% 
<c.bg_transparent>test subtitle 3</c.bg_transparent>

    `;
    expect(parseSubtitle(data_str)).toEqual([
      [119160, 121079, "test subtitle 1"],
      [121830, 122664, "test subtitle 2"],
      [124582, 126751, "test subtitle 3"],
    ]);
  });

  test("simple WEBVTT with unicode", () => {
    const data_str = `WEBVTT

00:01.000 --> 00:04.000
test subtitle 1

00:05.000 --> 00:09.000
unicode test
日本語

    `;
    expect(parseSubtitle(data_str)).toEqual([
      [1000, 4000, "test subtitle 1"],
      [5000, 9000, "unicode test\n日本語"],
    ]);
  });
});
