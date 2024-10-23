import http from "./http";

/**
 * 增强的http
 */
export default class httpEnhancer extends http {
    constructor(urlPrefix: string, mockUrlPrefix: string) {
        super(urlPrefix, mockUrlPrefix);
    }

    addBeforePlug = (plug: Function) => {
        this.addBeforeFn(plug);
        return this;
    };

    addAfterPlug = (plug: Function) => {
        this.addAfterFn(plug);
        return this;
    };

    addErrorPlug = (plug: Function) => {
        this.addErrorFn(plug);
        return this;
    };

    addFinallyPlug = (plug: Function) => {
        this.addFinallyFn(plug);
        return this;
    };
}
