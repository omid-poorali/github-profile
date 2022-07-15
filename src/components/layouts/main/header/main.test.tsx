import { render, screen, waitFor } from '@testing-library/react';
import { generatePath, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Header } from './main';
import * as ModuleRoutes from 'routes';


describe("Header page tests", () => {

    const customRender = (route: string, entry: string) =>
        render(
            <MemoryRouter initialEntries={[entry]}>
                <Routes>
                    <Route path={route} element={<Header />} />
                </Routes>
            </MemoryRouter>
        );

    it("should show search title", async () => {
        customRender(ModuleRoutes.Users.PROFILE_SEARCH, ModuleRoutes.Users.PROFILE_SEARCH);
        await waitFor(() => expect(screen.getByText(/search/i)));
        expect(screen.getByText(/search/i)).toBeInTheDocument();
    })

    it("should show profile title", async () => {
        customRender(ModuleRoutes.Users.PROFILE, generatePath(ModuleRoutes.Users.PROFILE, { username: "test" }));
        await waitFor(() => expect(screen.getByText(/profile/i)));
        expect(screen.getByText(/profile/i)).toBeInTheDocument();
    })

    it("should show history title", async () => {
        customRender(ModuleRoutes.Users.PROFILE_HISTORY, ModuleRoutes.Users.PROFILE_HISTORY);
        await waitFor(() => expect(screen.getByText(/history/i)));
        expect(screen.getByText(/history/i)).toBeInTheDocument();
    })

})