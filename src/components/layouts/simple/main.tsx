interface propsType {
    children?: React.ReactNode;
}

export const Simple = ({ children }: propsType) => {
    return (
        <div className="gui-simple-layout">
            {children}
        </div>
    );
}