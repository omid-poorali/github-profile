import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Main } from "./main";

describe("Main layout component tests", () => {

    const customRender = (element:any) =>
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={element} />
                </Routes>
            </MemoryRouter>
        );

    it("should render child elements", () => {
        const testMessage = 'Test Message';
        customRender(<Main>{testMessage}</Main>)
        expect(screen.getByText(testMessage)).toBeInTheDocument()
    });

    it("should have my-class in classname", () => {
        const className = 'my-class';
        customRender(<Main data-testid="Main" className={className} />)
        expect(screen.getByTestId("Main").classList.contains(className)).toBe(true)
    });


    it("should have onClick property", async () => {
        const onClick = jest.fn();
        customRender(<Main data-testid="Main" onClick={onClick} />);
        userEvent.click(screen.getByTestId("Main"));
        await waitFor(() => expect(onClick).toHaveBeenCalled());
        expect(onClick).toHaveBeenCalled();
    });

});