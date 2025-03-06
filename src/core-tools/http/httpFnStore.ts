/**
 * Http缓存存储
 */
class HttpFnStore {
    beforeFnList: Function[];
    afterFnList: Function[];
    errorFnList: Function[];
    finallyFnList: Function[];

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
    addBeforeFn(fn: Function) {
        this.beforeFnList.push(fn);
    }

    /**
     * addAfterFn
     * @param fn
     */
    addAfterFn(fn: Function) {
        this.afterFnList.push(fn);
    }

    /**
     * addErrorFn
     * @param fn
     */
    addErrorFn(fn: Function) {
        this.errorFnList.push(fn);
    }

    /**
     * addFinallyFn
     * @param fn
     */
    addFinallyFn(fn: Function) {
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
