interface Semaphore<T> extends Function {
  (task: () => Promise<T>): Promise<T>;
  totalReceived: number;
  maxConcurrency: number;
}

/**
 * A concurrency limiter that ensures no more than maxParallelTasks
 * async tasks run simultaneously. Tasks are queued and executed as slots become available.
 */
export const createSemaphore = <T>(maxParallelTasks: number): Semaphore<T> => {
  let active = 0;
  const waiting: Array<{
    task: () => Promise<T>;
    resolve: (value: T) => void;
    reject: (error: unknown) => void;
    runTask: () => void;
  }> = [];

  const limiter = Object.assign(
    (task: () => Promise<T>): Promise<T> => {
      limiter.totalReceived++;
      return new Promise<T>((resolve, reject) => {
        const runTask = async () => {
          active++;
          limiter.maxConcurrency = Math.max(limiter.maxConcurrency, active);
          try {
            const result = await task();
            resolve(result);
          } catch (error) {
            reject(error);
          } finally {
            active--;
            const next = waiting.shift();
            if (next) {
              next.runTask();
            }
          }
        };

        if (active < maxParallelTasks) {
          runTask();
        } else {
          waiting.push({ task, resolve, reject, runTask });
        }
      });
    },
    { totalReceived: 0, maxConcurrency: 0 },
  );

  return limiter;
};
