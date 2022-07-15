import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Spinner } from "./main";

describe("Spinner component tests", () => {
    it("should not render child elements", () => {
        const testMessage = 'Test Message';
        render(<Spinner>{testMessage}</Spinner>)
        expect(screen.queryByText(testMessage)).toBeNull()
    });

    it("should have my-class in classname", () => {
        const className = 'my-class';
        render(<Spinner data-testid="spinner" className={className} />)
        expect(screen.getByTestId("spinner").classList.contains(className)).toBe(true)
    });

    it("should have primary color, small size and circle shape", () => {
        const size = 'small';
        const shape = 'circle';
        const color = 'primary';
        render(<Spinner data-testid="spinner" size={size} color={color} shape={shape} />)
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${size}`)).toBe(true);
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${shape}`)).toBe(true);
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${color}-${shape}`)).toBe(true);
    });

    it("should have primary color, medium size and circle shape", () => {
        const size = 'medium';
        const shape = 'circle';
        const color = 'primary';
        render(<Spinner data-testid="spinner" size={size} color={color} shape={shape} />)
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${size}`)).toBe(true);
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${shape}`)).toBe(true);
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${color}-${shape}`)).toBe(true);
    });

    it("should have secondary color, medium size and circle shape", () => {
        const size = 'medium';
        const shape = 'circle';
        const color = 'secondary';
        render(<Spinner data-testid="spinner" size={size} color={color} shape={shape} />)
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${size}`)).toBe(true);
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${shape}`)).toBe(true);
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${color}-${shape}`)).toBe(true);
    });

    it("should have secondary color, large size and circle shape", () => {
        const size = 'large';
        const shape = 'circle';
        const color = 'secondary';
        render(<Spinner data-testid="spinner" size={size} color={color} shape={shape} />)
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${size}`)).toBe(true);
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${shape}`)).toBe(true);
        expect(screen.getByTestId("spinner").classList.contains(`gui-spinner--${color}-${shape}`)).toBe(true);
    });

    it("should have style property", () => {
        const style = { color: 'red' };
        render(<Spinner data-testid="spinner" style={style} />)
        expect(screen.getByTestId("spinner").style.color).toBe(style.color)
    });

    it("should have onClick property", async () => {
        const onClick = jest.fn();
        render(<Spinner data-testid="spinner" onClick={onClick} />)
        userEvent.click(screen.getByTestId("spinner"));
        await waitFor(() => expect(onClick).toHaveBeenCalled());
        expect(onClick).toHaveBeenCalled();
    });


});