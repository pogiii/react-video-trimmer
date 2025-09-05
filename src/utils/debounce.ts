export function debounce<T extends (...a: unknown[]) => void>(
  fn: T,
  wait = 200
) {
  let t: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
