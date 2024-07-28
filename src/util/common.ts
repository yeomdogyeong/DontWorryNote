export const CACHE_TIME = 1000 * 60 * 60;

export function createBooleanArray(length: number) {
  const result = Array(7).fill(false); // 길이 7의 false로 채워진 배열을 생성
  for (let i = 0; i < length; i++) {
    result[i] = true; // length 값만큼 true로 채우기
  }
  return result;
}
