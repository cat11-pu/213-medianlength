// lengths.js：量长度（去首尾空白后按字符个数算）
export function lengthOf(word) {
  const trimmed = String(word).trim();
  if (trimmed.length === 0) {
    const error = new Error("E_EMPTY_WORDS: word is empty after trimming");
    error.code = "E_EMPTY_WORDS";
    throw error;
  }
  return trimmed.length;
}
