import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Search } from './main';
import * as ModuleRoutes from 'routes';

jest.mock('helpers');

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>
}

describe("search page tests", () => {

    const customRender = () =>
        render(
            <MemoryRouter initialEntries={[ModuleRoutes.Users.PROFILE_SEARCH]}>
                <Routes>
                    <Route path={ModuleRoutes.Users.PROFILE_SEARCH} element={<Search />} />
                    <Route path={ModuleRoutes.Users.PROFILE} element={<LocationDisplay />} />
                </Routes>
            </MemoryRouter>
        );

    it('should render properly', () => {
        customRender();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByText(/history/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search for a user/i)).toBeInTheDocument();
    });

    it("should shows the required error when search is empty", async () => {
        customRender();
        userEvent.click(screen.getByRole("button"));
        await waitFor(() => expect(screen.getByText(/required/i)));
        expect(screen.getByText(/required/i)).toBeInTheDocument();
    });

    it("should show whatever is in the search box", async () => {
        customRender();
        const searchBox = screen.getByRole("textbox");
        userEvent.type(searchBox, "test");
        await waitFor(() => expect(searchBox).toHaveAttribute("value", "test"));
        expect(searchBox).toHaveAttribute("value", "test");
    });

    it("should navigate to profile page after button clicked", async () => {
        customRender();
        const searchBox = screen.getByRole("textbox");
        userEvent.type(searchBox, "test");
        await waitFor(() => expect(searchBox).toHaveAttribute("value", "test"));
        userEvent.click(screen.getByRole("button"));
        await waitFor(() => expect(screen.getByTestId('location-display')).toHaveTextContent("test"));
        expect(screen.getByTestId('location-display')).toHaveTextContent("test");
    });
})