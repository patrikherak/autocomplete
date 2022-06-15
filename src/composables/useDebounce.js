export function useDebounce(callback, delay) {
  let timeout

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
