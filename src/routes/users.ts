import { lazy } from "react";

const SearchPage = lazy(() => import("pages/search"));
const ProfilePage = lazy(() => import("pages/profile"));
const HistoryPage = lazy(() => import("pages/history"));

export const PROFILE = "/profile/:username";
export const PROFILE_SEARCH = "/profile/search";
export const PROFILE_HISTORY = "/profile/history";

export const all = [
    {
        path: PROFILE_SEARCH,
        element: SearchPage
    },
    {
        path: PROFILE,
        element: ProfilePage
    },
    {
        path: PROFILE_HISTORY,
        element: HistoryPage
    }
]