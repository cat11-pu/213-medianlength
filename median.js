// median.js：算中位数（长度升序排序，奇数取正中间，偶数取中间两项平均向下取整）
import { lengthOf } from "./lengths.js";

export function medianLength(words) {
  if (!Array.isArray(words) || words.length === 0) {
    const error = new Error("E_EMPTY_WORDS: word list is empty");
    error.code = "E_EMPTY_WORDS";
    throw error;
  }
  const sorted = words.map(lengthOf).sort((a, b) => a - b);
  const count = sorted.length;
  const middle = Math.floor(count / 2);
  const median = count % 2 === 1 ? sorted[middle] : Math.floor((sorted[middle - 1] + sorted[middle]) / 2);
  return { sorted: sorted, median: median, shortest: sorted[0], longest: sorted[count - 1] };
}
