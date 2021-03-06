import { saveObject, loadObject } from "./LocalStorage";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test("save", () => {
  const data = { test: "am object" };
  const key = "a key";
  saveObject(key, data);
  expect(localStorage.setItem.mock.calls.length).toBe(1);
  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
});

test("load", () => {
  const key = "a key";
  const loaded = loadObject(key);
  expect(loaded).toBe(undefined);
  expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  expect(localStorage.getItem.mock.calls.length).toBe(1);
});

test("save and load", () => {
  const data = { test: "am object" };
  const key = "a key";
  saveObject(key, data);
  const loaded = loadObject(key);
  expect(loaded).toEqual(data);
  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.getItem.mock.calls.length).toBe(1);
});
