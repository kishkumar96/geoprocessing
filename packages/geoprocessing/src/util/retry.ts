/**
 * Retries a function maxTry number of times before giving up
 * @param fn
 * @param args
 * @param maxTry
 * @param retryCount
 * @returns
 */
export async function retry<T extends (...arg0: any[]) => any>(
  fn: T,
  args: Parameters<T>,
  maxTry: number,
  retryCount = 1,
): Promise<Awaited<ReturnType<T>>> {
  const currRetry = typeof retryCount === "number" ? retryCount : 1;
  try {
    const result = await fn(...args);
    return result;
  } catch (error) {
    console.log(`Retry ${currRetry} failed.`);
    if (currRetry > maxTry) {
      console.log(`All ${maxTry} retry attempts exhausted`);
      throw error;
    }
    return retry(fn, args, maxTry, currRetry + 1);
  }
}
