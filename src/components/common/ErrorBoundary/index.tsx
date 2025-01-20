import React from "react";
import { ErrorBoundary as ErrorBoundaryComponent } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
import errorBodyImage from "./images/bg-errorBody.jpg";
import errorText from "./images/bg-errorText.png";
import style from "./index.module.scss";

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
    console.log(error);
    return (
        <div className={style.errorBoundaryContainer}>
            <div className={style.errorBoundaryContent}>
                <img src={errorBodyImage} width="100%" height="100%" />
                <img src={errorText} width="100%" height="100%" />
            </div>
        </div>
    );
};

const ErrorBoundary: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = ({
    children
}) => {
    return (
        <ErrorBoundaryComponent FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundaryComponent>
    );
};

export default ErrorBoundary;
