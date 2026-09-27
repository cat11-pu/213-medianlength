// app.js：渲染结果
import { lengthOf } from "./lengths.js";
import { medianLength } from "./median.js";

export function render(spec) {
  const words = spec.words || [];
  const view = medianLength(words);
  const sorted = view.sorted || [];
  return { sorted: sorted, median: view.median || 0, shortest: view.shortest || 0,
           longest: view.longest || 0, count: sorted.length, odd: sorted.length % 2 === 1,
           sorted_ok: sorted.every((value, spot) => spot === 0 || value >= sorted[spot - 1]) };
}
