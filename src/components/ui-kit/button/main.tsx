import React from "react";
import classnames from "classnames";


type PropsType = {
    className?: string;
    label?: string;
    variant?: "primary";
    size?: "small" | "medium" | "large";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;

} & React.ComponentPropsWithoutRef<"button">;


export const Button = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLButtonElement>) => {

    const {
        className,
        variant = "primary",
        onClick = () => console.log("No click handler specified"),
        label = "",
        disabled = false,
        size = "medium",
        ...rest
    } = props;

    const buttonClassName = classnames("gui-button", `gui-button--${variant}`, `gui-button--${size}`, {
        "gui-button--disabled": disabled
    }, className);

    return (
        <button
            ref={forwardedRef}
            className={buttonClassName}
            onClick={event => onClick(event)}
            disabled={disabled}
            {...rest}
        >
            {label}
        </button>
    );
});