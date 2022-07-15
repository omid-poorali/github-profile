import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Simple } from "./main";

describe("Simple layout component tests", () => {
    it("should render child elements", () => {
        const testMessage = 'Test Message';
        render(<Simple>{testMessage}</Simple>)
        expect(screen.getByText(testMessage)).toBeInTheDocument()
    });

    it("should have my- in classname", () => {
        const className = 'my-class';
        render(<Simple data-testid="Simple" className={className} />)
        expect(screen.getByTestId("Simple").classList.contains(className)).toBe(true)
    });

    
    it("should have onClick property", async () => {
        const onClick = jest.fn();
        render(<Simple data-testid="Simple" onClick={onClick} />);
        userEvent.click(screen.getByTestId("Simple"));
        await waitFor(() => expect(onClick).toHaveBeenCalled());
        expect(onClick).toHaveBeenCalled();
    });

});