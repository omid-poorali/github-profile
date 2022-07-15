import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generatePath, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { History } from './main';
import * as ModuleRoutes from 'routes';

jest.mock('helpers/idb', () => {
    return function () {
        return {
            putValue: jest.fn(),
            getAllValue: async () => ([{
                id: 1,
                term: "test",
                searchedAt: 1
            }])
        };
    };
});

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>
}

describe("History page tests", () => {

    const customRender = () =>
        render(
            <MemoryRouter initialEntries={[ModuleRoutes.Users.PROFILE_HISTORY]}>
                <Routes>
                    <Route path={ModuleRoutes.Users.PROFILE_HISTORY} element={<History />} />
                    <Route path={ModuleRoutes.Users.PROFILE} element={<LocationDisplay />} />
                </Routes>
            </MemoryRouter>
        );

    it('should render properly', async () => {
        customRender();
        await waitFor(() => expect(screen.getByRole("listitem")));
        expect(screen.getByText(/test/i)).toBeInTheDocument();
    });


    it("should navigate to profile page after item clicked", async () => {
        customRender();
        await waitFor(() => expect(screen.getByRole("listitem")));
        userEvent.click(screen.getByRole("listitem"));
        await waitFor(() => expect(screen.getByTestId('location-display')).toHaveTextContent(generatePath(ModuleRoutes.Users.PROFILE, { username: "test" })));
        expect(screen.getByTestId('location-display')).toHaveTextContent("test");
    });
})