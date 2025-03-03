import React, { useRef } from "react";
import { useCallbackRef as useCallbackRefFn } from "use-callback-ref";

// 定义 ref 的类型
interface FocusableElement {
    focus: () => void;
}

const ChildComponent = React.forwardRef<FocusableElement | null, object>((props, ref) => {
    const inputRef = useCallbackRefFn(null, (newValue: HTMLInputElement | null) => {
        if (ref) {
            if (typeof ref === "function") {
                ref({ focus: () => newValue?.focus() });
            } else {
                ref.current = { focus: () => newValue?.focus() };
            }
        }
    });
    console.log(props);
    return <input ref={inputRef} />;
});

const UseCallbackRef: React.FC = () => {
    const childRef = useRef<FocusableElement | null>(null);

    const handleClick = () => {
        console.log("Callback executed");
        childRef.current?.focus();
    };
    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
            <ChildComponent ref={childRef} />
        </div>
    );
};

export default UseCallbackRef;
