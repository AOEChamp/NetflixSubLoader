import { loadState } from "./Storage";

test("initial value is used when storage is empty", () => {
  const key = "some key";
  const initialValue = { test: "initial value obj" };
  expect(loadState(initialValue, key)).toEqual(initialValue);
});
