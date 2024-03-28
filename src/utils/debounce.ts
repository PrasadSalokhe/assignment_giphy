export function debounce<T extends Function>(cb: T, wait = 20) {
  let h = null;
  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
    return {
      cancel: () => clearTimeout(h),
    };
  };
  return callable as any as T;
}
