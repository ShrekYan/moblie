import React, { useEffect } from "react";
import * as ReactIs from "react-is";

class classComponent extends React.Component {}

const FunctionComponent: React.FC = () => {
    return React.createElement("div");
};

// interface ComponentProps extends React.ComponentPropsWithoutRef<"div"> {
// }

// const ForwardRefComponent = React.forwardRef<HTMLDivElement, ComponentProps>((props, ref) =>
//     React.createElement(Component, { forwardedRef: ref, ...props })
// );

const Context = React.createContext(false);

const ReactIs1: React.FC = () => {
    useEffect(() => {
        console.log("isValidElementType=>>>>");
        console.log(ReactIs.isValidElementType("div"));
        console.log(ReactIs.isValidElementType(classComponent));
        console.log(ReactIs.isValidElementType(FunctionComponent));
        // console.log(ReactIs.isValidElementType(ForwardRefComponent));
        console.log(ReactIs.isValidElementType(Context.Consumer));
        console.log(ReactIs.isValidElementType(Context.Provider));
        console.log("isValidElementType=>>>>");

        /*  console.log("Context=>>>>");
          const ThemeContext = React.createContext("blue");
          console.log(ReactIs.isContextConsumer(<ThemeContext.Consumer />));
          console.log(ReactIs.isContextProvider(<ThemeContext.Provider />));
          console.log(ReactIs.typeOf(<ThemeContext.Provider />) === ReactIs.ContextProvider); // true
          console.log(ReactIs.typeOf(<ThemeContext.Consumer />) === ReactIs.ContextConsumer); //
          console.log("Context=>>>>");*/

        console.log("element=>>>>");
        console.log(ReactIs.isElement(<div />));
        console.log(ReactIs.typeOf(<div />) === ReactIs.Element); // true);
        console.log("element=>>>>");

        console.log(ReactIs.isFragment(<></>));
        console.log(ReactIs.typeOf(<></>) === ReactIs.Fragment);
    }, []);

    return <div>ReactIs</div>;
};

export default ReactIs1;
