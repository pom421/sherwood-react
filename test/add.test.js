const add = require("../src/math").add

test("Add 2 to 3", () => {
  expect(add(2, 3)).toBe(5)
})
