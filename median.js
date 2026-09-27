// median.js：算中位数（长度升序排序，奇数取正中，偶数取中间两项平均向下取整）
import { lengthOf } from "./lengths.js";

export function medianLength(words) {
  if (!Array.isArray(words) || words.length === 0) {
    const error = new Error("E_EMPTY_WORDS: word list is empty");
    error.code = "E_EMPTY_WORDS";
    throw error;
  }
  const lengths = words.map(lengthOf);
  const sorted = lengths.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 1
    ? sorted[mid]
    : Math.floor((sorted[mid - 1] + sorted[mid]) / 2);
  return { sorted: sorted, median: median, shortest: sorted[0], longest: sorted[sorted.length - 1] };
}
