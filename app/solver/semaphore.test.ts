import { createSemaphore } from './semaphore';

describe('createSemaphore()', () => {
  it('executes tasks up to the maxParallelTasks limit concurrently', async () => {
    const semaphore = createSemaphore<number>(2);
    const order: number[] = [];
    const delays = [10, 20, 5];
    const tasks = delays.map((delay, idx) =>
      semaphore(async () => {
        order.push(idx);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return idx;
      }),
    );

    const results = await Promise.all(tasks);
    expect(results).toEqual([0, 1, 2]);
    // Since max 2 concurrent, task 2 should start after one of the first two finishes
    expect(order.slice(0, 2).sort()).toEqual([0, 1]); // First two start immediately
    expect(order[2]).toBe(2); // Third starts after
    expect(semaphore.totalReceived).toBe(3);
    expect(semaphore.maxConcurrency).toBe(2);
  });

  it('queues tasks when exceeding the limit and executes them sequentially', async () => {
    const semaphore = createSemaphore<string>(1);
    const order: number[] = [];

    const task1 = semaphore(async () => {
      order.push(1);
      await new Promise((resolve) => setTimeout(resolve, 10));
      return 'task1';
    });

    const task2 = semaphore(async () => {
      order.push(2);
      return 'task2';
    });

    const results = await Promise.all([task1, task2]);
    expect(results).toEqual(['task1', 'task2']);
    expect(order).toEqual([1, 2]); // Sequential execution
    expect(semaphore.totalReceived).toBe(2);
    expect(semaphore.maxConcurrency).toBe(1);
  });

  it('handles task errors correctly', async () => {
    const semaphore = createSemaphore<unknown>(1);

    const failingTask = semaphore(async () => {
      throw new Error('Task failed');
    });

    const succeedingTask = semaphore(async () => {
      return 'success';
    });

    await expect(failingTask).rejects.toThrow('Task failed');
    const result = await succeedingTask;
    expect(result).toBe('success');
    expect(semaphore.totalReceived).toBe(2);
    expect(semaphore.maxConcurrency).toBe(1);
  });

  it('allows unlimited concurrency when maxParallelTasks is high', async () => {
    const semaphore = createSemaphore<number>(10);
    const tasks = Array.from({ length: 5 }, (_, idx) =>
      semaphore(async () => idx),
    );

    const results = await Promise.all(tasks);
    expect(results.sort()).toEqual([0, 1, 2, 3, 4]);
    expect(semaphore.totalReceived).toBe(5);
    expect(semaphore.maxConcurrency).toBe(5);
  });

  it('maintains order of task execution when queued', async () => {
    const semaphore = createSemaphore<number>(1);
    const order: number[] = [];
    const tasks = [1, 2, 3].map((id) =>
      semaphore(async () => {
        order.push(id);
        return id;
      }),
    );

    await Promise.all(tasks);
    expect(order).toEqual([1, 2, 3]);
    expect(semaphore.totalReceived).toBe(3);
    expect(semaphore.maxConcurrency).toBe(1);
  });
});
