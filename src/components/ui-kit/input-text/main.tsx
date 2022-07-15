import React, { useRef } from "react";
import classnames from "classnames";
import { mergeRefs } from "hooks";


type PropsType = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    errorMessage?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
} & React.ComponentPropsWithoutRef<"input">;


export const InputText = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {

    const innerRef = useRef<HTMLInputElement>();
    const combinedRef = mergeRefs([forwardedRef, innerRef]);

    const {
        children,
        style,
        className,
        errorMessage,
        disabled = false,
        onClick,
        ...rest
    } = props;

    const inputTextClassName = classnames("gui-input-text", {
        "gui-input-text--disabled": disabled
    }, className);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(e);
        innerRef.current?.focus();
    }

    return (
        <div data-testid="input-text-root" className={inputTextClassName}>
            <div
                data-testid="input-wrapper"
                onClick={handleClick}
                style={style}
                className="input-wrapper">
                <input
                    ref={combinedRef}
                    disabled={disabled}
                    {...rest}
                    type="text"
                />
            </div>
            <div className="error">
                {props.errorMessage ? `${props.errorMessage}` : <span>placeholder</span>}
            </div>
        </div>
    );
});