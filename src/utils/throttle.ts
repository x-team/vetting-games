// eslint-disable-next-line @typescript-eslint/ban-types
export default function throttle<T extends Function>(func: T, timeout = 300) {
  let waiting = false;
  return function (...args: any[]) {
    if (!waiting) {
      func(...args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, timeout);
    }
  };
}
