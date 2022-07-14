interface propsType {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: propsType) => {
    return (
        <div>
            {children}
        </div>
    );
}