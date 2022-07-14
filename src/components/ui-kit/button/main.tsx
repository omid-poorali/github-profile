import React from "react";
import classnames from "classnames";


type PropsType = {
    className?: string;
    label?: string;
    color?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;

} & React.ComponentPropsWithoutRef<"button">;


export const Button = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLButtonElement>) => {

    const {
        className,
        color = "primary",
        label = "",
        disabled = false,
        size = "medium",
        ...rest
    } = props;

    const buttonClassName = classnames("gui-button", `gui-button--${color}`, `gui-button--${size}`, {
        "gui-button--disabled": disabled
    }, className);

    return (
        <button
            ref={forwardedRef}
            className={buttonClassName}
            disabled={disabled}
            {...rest}
        >
            {label}
        </button>
    );
});