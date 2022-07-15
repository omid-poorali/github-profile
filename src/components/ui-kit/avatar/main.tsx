import React from "react";
import classnames from "classnames";
import AvatarPlaceholder from "assets/avatar-placeholder.svg";

type PropsType = {
    children?: React.ReactNode;
    size?: "small" | "medium" | "large" | "full";
    className?: string;
    image?: string;
    shape?: "circle" | "square";
    imageAlt?: string;
} & React.ComponentPropsWithoutRef<"img">;

export const Avatar = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLImageElement>) => {

    const {
        children,
        size = "full",
        className,
        image = AvatarPlaceholder,
        imageAlt = "avatar",
        shape = "circle",
        ...rest
    } = props;

    const avatarClassName = classnames("gui-avatar", `gui-avatar--${shape}`, `gui-avatar--${size}`, className);

    return (
        <img ref={forwardedRef} className={avatarClassName} src={image} alt={imageAlt} {...rest} />
    )

});