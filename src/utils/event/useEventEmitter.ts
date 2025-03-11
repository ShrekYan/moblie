import { useMemo } from "react";

type EventMap = Record<string, any[]>;

interface EventEmitter<T extends EventMap> {
    cached: Partial<{ [K in keyof T]: T[K] }>;
    handlers: Partial<{ [K in keyof T]: Array<(...args: T[K]) => void> }>;

    listen<K extends keyof T>(type: K, handler: (...args: T[K]) => void): void;

    remove<K extends keyof T>(type: K, handler: (...args: T[K]) => void): void;

    trigger<K extends keyof T>(type: K, ...args: T[K]): void;

    onlyListen<K extends keyof T>(type: K, handler: (...args: T[K]) => void): void;
}

const createEventEmitter = <T extends EventMap>(): EventEmitter<T> => {
    return {
        cached: {},
        handlers: {},

        listen(type, handler) {
            if (typeof handler !== "function") return;

            if (!this.handlers[type]) {
                this.handlers[type] = [];
            }
            this.handlers[type]!.push(handler);

            if (Array.isArray(this.cached[type])) {
                handler(...(this.cached[type]! as T[typeof type]));
            }
        },

        remove(type, handler) {
            const handlers = this.handlers[type];
            if (!handlers) return;

            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        },

        trigger(type, ...args) {
            const handlers = this.handlers[type];
            if (handlers) {
                handlers.forEach((handler) => handler(...args));
            }

            this.cached[type] = args;
        },

        onlyListen(type, handler) {
            if (typeof handler !== "function") return;

            this.handlers[type] = [handler];

            if (Array.isArray(this.cached[type])) {
                handler(...(this.cached[type] as T[typeof type]));
            }
        }
    };
};

const emitterCache = new Map<symbol, EventEmitter<any>>();
const typeToken = Symbol.for("EventEmitterType");

const useEventEmitter = <T extends EventMap>() => {
    return useMemo(() => {
        if (!emitterCache.has(typeToken)) {
            emitterCache.set(typeToken, createEventEmitter<T>());
        }
        return emitterCache.get(typeToken)! as EventEmitter<T>;
    }, []);
};

export const getEmitter = <T extends EventMap>() => {
    if (!emitterCache.has(typeToken)) {
        emitterCache.set(typeToken, createEventEmitter<T>());
    }
    return emitterCache.get(typeToken)! as EventEmitter<T>;
};

export default useEventEmitter;
