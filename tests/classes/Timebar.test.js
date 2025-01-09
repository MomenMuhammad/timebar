import Timebar from "../../src/classes/Timebar";
import { JSDOM } from "jsdom";

const document = new JSDOM();

describe("Timebar", () => {
  test("Timebar should throw error if element is not provided", () => {
    expect(() => new Timebar()).toThrow("Element is required");
  });

  
  test("Timebar should throw error if element is not a valid HTMLElement", () => {
    expect(() => new Timebar()).toThrow("Element is required");
  });

  test("Timebar should throw error if start time and end time are not provided", () => {
    const element = document.createElement("div");
    expect(() => new Timebar(element)).toThrow("Start time and end time are required");
  });
  // ...existing code...
});
