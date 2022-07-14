import { ErrorBoundary } from "./error-boundary";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layouts } from "components";
import * as Pages from "pages";
import * as ModuleRoutes from "routes";

export const Application = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layouts.MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to={ModuleRoutes.Users.PROFILE_SEARCH} />} />
            <Route path={ModuleRoutes.Users.PROFILE_SEARCH} element={<Pages.Search />} />
            <Route path={ModuleRoutes.Users.PROFILE_HISTORY} element={<Pages.History />} />
            <Route path={ModuleRoutes.Users.PROFILE} element={<Pages.Profile />} />
            <Route path="*" element={<Pages.NotFound />} />
          </Routes>
        </Layouts.MainLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}