import React from "react";
import classnames from "classnames";

type PropsType = {
    children?: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export const Simple = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLDivElement>) => {

    const {
        children,
        className,
        ...rest
    } = props;

    const simpleClassName = classnames("gui-simple-layout", className);

    return (
        <div ref={forwardedRef} className={simpleClassName} {...rest}>
            {children}
        </div>
    )

});