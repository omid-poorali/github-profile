import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, generatePath } from 'react-router-dom';
import { Profile } from './main';
import * as ModuleRoutes from 'routes';

describe("Profile page tests", () => {

    const customRender = () =>
        render(
            <MemoryRouter initialEntries={[generatePath(ModuleRoutes.Users.PROFILE, { username: "test" })]}>
                <Routes>
                    <Route path={ModuleRoutes.Users.PROFILE} element={<Profile />} />
                </Routes>
            </MemoryRouter>
        );

    it('should containe mock api response data and avatar', async () => {
        customRender();
        await waitFor(() => expect(screen.getByText(/test/i)));
        expect(screen.getByAltText("avatar")).toBeInTheDocument();
        expect(screen.getByText(/test/i)).toBeInTheDocument();
        expect(screen.getByText(/user_name/i)).toBeInTheDocument();
        expect(screen.getByText(/repository_name/i)).toBeInTheDocument();
        expect(screen.getByText(/description/i)).toBeInTheDocument();
    });
})