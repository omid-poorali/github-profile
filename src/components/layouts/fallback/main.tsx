interface propsType {
    children?: React.ReactNode;
}

export const FallBack = ({ children }: propsType) => {
    return (
        <div className="gui-fallback-layout">
            {children}
        </div>
    );
}