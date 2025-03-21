interface Task<T = any> {
    name?: string;
    fn: () => Promise<T>;
}

export default class TaskScheduler {
    private queue: Task[] = [];
    private activeCount: number = 0;

    constructor(
        private readonly maxConcurrent: number = 5,
        private debug: boolean = false
    ) {
        if (maxConcurrent < 1) throw new Error("并发数至少为1");
    }

    addTask<T>(task: Task<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            // 自动生成任务名称（如果未指定）
            task.name = task.name || `Task_${Date.now()}_${Math.random().toString(16).slice(2)}`;

            const wrappedTask: Task = {
                ...task,
                fn: () =>
                    task
                        .fn()
                        .then(resolve)
                        .catch(reject)
                        .finally(() => {
                            this.activeCount--;
                            this.executeNext();
                        })
            };

            this.queue.push(wrappedTask);
            this.executeNext();
        });
    }

    private executeNext(): void {
        while (this.activeCount < this.maxConcurrent && this.queue.length > 0) {
            const task = this.queue.shift()!;
            this.activeCount++;

            if (this.debug) {
                console.log(`[Scheduler] 开始执行任务：${task.name}`);
            }

            Promise.resolve()
                .then(() => task.fn())
                .catch(() => {});
        }

        if (this.debug) {
            console.log(`[状态] 活跃任务数：${this.activeCount} | 队列剩余：${this.queue.length}`);
        }
    }

    get status() {
        return {
            queued: this.queue.length,
            active: this.activeCount,
            maxConcurrent: this.maxConcurrent
        };
    }
}

//demo
const scheduler = new TaskScheduler(3, true);

/**
 * 创建简单的任务
 * @param name
 * @param duration
 */
const createSampleTask = (name: string, duration: number): Task => {
    return {
        name,
        fn: () => {
            return new Promise((resolve) =>
                setTimeout(() => {
                    console.log(`【完成】${name}`);
                    resolve(name);
                }, duration)
            );
        }
    };
};

// 添加混合任务（包含成功/失败）
const tasks = [
    createSampleTask("快速任务", 500),
    createSampleTask("失败任务", 800),
    ...Array.from({ length: 5 }, (_, i) =>
        createSampleTask(`任务-${i + 1}`, Math.random() * 2000 + 500)
    )
];

// 批量添加任务并跟踪状态
tasks.forEach((task) => {
    scheduler
        .addTask(task)
        .then((res) => console.log(`✅ ${res} 已完成`))
        .catch((err) => console.error(`❌ 任务失败：${err}`));
});
