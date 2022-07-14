import React from "react";
import classnames from "classnames";


type PropsType = {
    className?: string;
    errorMessage?: string;
    disabled?: boolean;
} & React.ComponentPropsWithoutRef<"input">;


export const InputText = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {

    const {
        className,
        errorMessage,
        disabled = false,
        ...rest
    } = props;

    const inputTextClassName = classnames("gui-input-text", {
        "gui-input-text--disabled": disabled
    }, className);

    return (
        <div>
            <div className={inputTextClassName}>
                <input
                    ref={forwardedRef}
                    disabled={disabled}
                    {...rest}
                    type="text"
                />

            </div>
            <div className="gui-input-text-error">
                {props.errorMessage ? `${props.errorMessage}` : <span className="placeholder">placeholder</span>}
            </div>
        </div>
    );
});