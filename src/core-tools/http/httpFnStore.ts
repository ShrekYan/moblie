export type PluginFunction = (...args: any[]) => any;
/**
 * Http缓存存储
 */
class HttpFnStore {
    beforeFnList: PluginFunction[];
    afterFnList: PluginFunction[];
    errorFnList: PluginFunction[];
    finallyFnList: PluginFunction[];

    constructor() {
        this.beforeFnList = [];
        this.afterFnList = [];
        this.errorFnList = [];
        this.finallyFnList = [];
    }

    /**
     * addBeforeFn
     * @param fn
     */
    addBeforeFn(fn: PluginFunction) {
        this.beforeFnList.push(fn);
    }

    /**
     * addAfterFn
     * @param fn
     */
    addAfterFn(fn: PluginFunction) {
        this.afterFnList.push(fn);
    }

    /**
     * addErrorFn
     * @param fn
     */
    addErrorFn(fn: PluginFunction) {
        this.errorFnList.push(fn);
    }

    /**
     * addFinallyFn
     * @param fn
     */
    addFinallyFn(fn: PluginFunction) {
        this.finallyFnList.push(fn);
    }

    /**
     * getBeforeFn
     */
    getBeforeFn() {
        return this.beforeFnList;
    }

    /**
     * getAfterFn
     */
    getAfterFn() {
        return this.afterFnList;
    }

    /**
     * getErrorFn
     */
    getErrorFn() {
        return this.errorFnList;
    }

    /**
     * getFinallyFn
     */
    getFinallyFn() {
        return this.finallyFnList;
    }
}

export default new HttpFnStore();
