import React from "react";
import classnames from "classnames";
import AvatarPlaceholder from "assets/avatar-placeholder.svg";

type PropsType = {
    className?: string;
    image?: string;
    shape?: "circle" | "square";
    imageAlt?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
} & React.ComponentPropsWithoutRef<"img">;

export const Avatar = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLImageElement>) => {

    const {
        style,
        className,
        image = AvatarPlaceholder,
        imageAlt = "avatar",
        shape = "circle",
        onClick,
        ...rest
    } = props;

    const avatarClassName = classnames("gui-avatar", `gui-avatar--${shape}`, className);

    return (
        <div onClick={onClick} style={style} className={avatarClassName} >
            <img ref={forwardedRef} src={image} alt={imageAlt} {...rest} />
        </div>
    )
});