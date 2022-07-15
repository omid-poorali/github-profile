import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Avatar } from "./main";

describe("Avatar component tests", () => {
    it("should not render child elements", () => {
        const testMessage = 'Test Message';
        render(<Avatar>{testMessage}</Avatar>)
        expect(screen.queryByText(testMessage)).toBeNull()
    });

    it("should have my-class in classname", () => {
        const className = 'my-class';
        render(<Avatar data-testid="avatar" className={className} />)
        expect(screen.getByTestId("avatar").classList.contains(className)).toBe(true)
    });

    it("should have small size and circle shape", () => {
        const size = 'small';
        const shape = 'circle';
        render(<Avatar data-testid="avatar" size={size} shape={shape} />)
        expect(screen.getByTestId("avatar").classList.contains(`gui-avatar--${size}`)).toBe(true);
        expect(screen.getByTestId("avatar").classList.contains(`gui-avatar--${shape}`)).toBe(true);
    });

    it("should have medium size and circle shape", () => {
        const size = 'medium';
        const shape = 'circle';
        render(<Avatar data-testid="avatar" size={size} shape={shape} />)
        expect(screen.getByTestId("avatar").classList.contains(`gui-avatar--${size}`)).toBe(true);
        expect(screen.getByTestId("avatar").classList.contains(`gui-avatar--${shape}`)).toBe(true);
    });


    it("should have large size and circle shape", () => {
        const size = 'large';
        const shape = 'circle';
        render(<Avatar data-testid="avatar" size={size} shape={shape} />)
        expect(screen.getByTestId("avatar").classList.contains(`gui-avatar--${size}`)).toBe(true);
        expect(screen.getByTestId("avatar").classList.contains(`gui-avatar--${shape}`)).toBe(true);
    });


    it("should have onClick property", async () => {
        const onClick = jest.fn();
        render(<Avatar data-testid="avatar" onClick={onClick} />);
        userEvent.click(screen.getByTestId("avatar"));
        await waitFor(() => expect(onClick).toHaveBeenCalled());
        expect(onClick).toHaveBeenCalled();
    });


});