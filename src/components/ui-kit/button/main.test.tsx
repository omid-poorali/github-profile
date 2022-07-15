import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./main";

describe("Button component tests", () => {
    it("should not render child elements", () => {
        const testMessage = 'Test Message';
        render(<Button>{testMessage}</Button>)
        expect(screen.queryByText(testMessage)).toBeNull()
    });

    it("should not render label property", () => {
        render(<Button label="Test Label" />)
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("should have my-class in classname", () => {
        const className = 'my-class';
        render(<Button data-testid="button" className={className} />)
        expect(screen.getByTestId("button").classList.contains(className)).toBe(true)
    });


    it("should have disable classname", () => {
        render(<Button disabled />)
        expect(screen.getByRole("button").classList.contains("gui-button--disabled")).toBe(true)
    });

    it("should have primary color, small size", () => {
        const size = 'small';
        const color = 'primary';
        render(<Button data-testid="button" size={size} color={color} />)
        expect(screen.getByTestId("button").classList.contains(`gui-button--${size}`)).toBe(true);
        expect(screen.getByTestId("button").classList.contains(`gui-button--${color}`)).toBe(true);
    });

    it("should have primary color, medium size", () => {
        const size = 'medium';
        const color = 'primary';
        render(<Button data-testid="button" size={size} color={color} />)
        expect(screen.getByTestId("button").classList.contains(`gui-button--${size}`)).toBe(true);
        expect(screen.getByTestId("button").classList.contains(`gui-button--${color}`)).toBe(true);
    });

    it("should have secondary color, medium size", () => {
        const size = 'medium';
        const color = 'secondary';
        render(<Button data-testid="button" size={size} color={color} />)
        expect(screen.getByTestId("button").classList.contains(`gui-button--${size}`)).toBe(true);
        expect(screen.getByTestId("button").classList.contains(`gui-button--${color}`)).toBe(true);
    });

    it("should have secondary color, large size", () => {
        const size = 'large';
        const color = 'secondary';
        render(<Button data-testid="button" size={size} color={color} />)
        expect(screen.getByTestId("button").classList.contains(`gui-button--${size}`)).toBe(true);
        expect(screen.getByTestId("button").classList.contains(`gui-button--${color}`)).toBe(true);
    });

    it("should have style property", () => {
        const style = { color: 'red' };
        render(<Button data-testid="button" style={style} />)
        expect(screen.getByTestId("button").style.color).toBe(style.color)
    });

    it("should have onClick property", async () => {
        const onClick = jest.fn();
        render(<Button data-testid="button" onClick={onClick} />)
        userEvent.click(screen.getByTestId("button"));
        await waitFor (() => expect(onClick).toHaveBeenCalled());
        expect(onClick).toHaveBeenCalled();
    });


});