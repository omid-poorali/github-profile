import { Header } from "./header";

interface propsType {
    children?: React.ReactNode;
}

export const Main = ({ children }: propsType) => {
    return (
        <div className="gui-main-layout">
            <Header />
            {children}
        </div>
    );
}