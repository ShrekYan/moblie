import { useLocalObservable } from "mobx-react";

export interface MobxStoreType {
    title: string;
    done: boolean;
    abc: {
        age: number;
    };
    toggle(): void;
}

type UseMobxStoreType = () => MobxStoreType;

/**
 * use mobxStore
 */
const useMobxStore: UseMobxStoreType = () => {
    const store = useLocalObservable<MobxStoreType>(() => ({
        title: "Test",
        done: true,
        abc: {
            age: 18
        },
        toggle() {
            this.done = !this.done;
        }
    }));
    return store;
};

export default useMobxStore;
