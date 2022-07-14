import React from "react";
import { ErrorBoundary } from "./error-boundary";
import { FallBack } from "./fallback";
import { Layouts } from "components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "pages/not-found";
import * as ModuleRoutes from "routes";

export const Application = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={ModuleRoutes.Users.PROFILE_SEARCH} />} />
          {React.Children.toArray(
            ModuleRoutes.all.map((route) => {
              return (
                <Route path={route.path}
                  element={
                    <React.Suspense fallback={<FallBack />}>
                      <Layouts.Main>
                        {React.createElement(route.element)}
                      </Layouts.Main>
                    </React.Suspense>
                  } />
              );
            })
          )}
          <Route path="*" element={<Layouts.Simple><NotFound /></Layouts.Simple>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}