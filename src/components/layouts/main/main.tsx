import React from "react";
import classnames from "classnames";
import { Header } from "./header";

type PropsType = {
    children?: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export const Main = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLDivElement>) => {

    const {
        children,
        className,
        ...rest
    } = props;

    const mainClassName = classnames("gui-main-layout", className);

    return (
        <div ref={forwardedRef} className={mainClassName} {...rest}>
            <Header />
            {children}
        </div>
    )

});