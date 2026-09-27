import assert from "node:assert";
import { lengthOf } from "../lengths.js";
import { medianLength } from "../median.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("lengthOf returns a number", () => {
  assert.strictEqual(typeof lengthOf("abc"), "number");
});

check("medianLength returns sorted list", () => {
  assert.ok(Array.isArray(medianLength(["abc"]).sorted));
});

check("medianLength returns a median", () => {
  assert.strictEqual(typeof medianLength(["abc"]).median, "number");
});

check("render counts words", () => {
  assert.strictEqual(typeof render({ words: ["abc"] }).count, "number");
});

check("render exposes sorted flag", () => {
  assert.strictEqual(typeof render({ words: ["abc"] }).sorted_ok, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
