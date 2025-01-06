import Timebar from "../../src/classes/Timebar";

test("Timebar should throw error if startTime or endTime is not provided", () => {
  expect(() => new Timebar()).toThrowError("startTime and endTime are required");
});