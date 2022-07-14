import classnames from "classnames";
import React from "react";

type PropsType = {
    size?: "small" | "medium" | "large";
    className?: string;
    shape?: "circle";
} & React.ComponentPropsWithoutRef<"div">;

export const Spinner = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLImageElement>) => {

    const {
        size = "medium",
        className,
        shape = "circle",
        ...rest
    } = props;

    const spinnerClassName = classnames("gui-spinner", `gui-spinner--${shape}`, `gui-spinner--${size}`, className);

    return (
        <div ref={forwardedRef} className={spinnerClassName} {...rest} />
    );
})