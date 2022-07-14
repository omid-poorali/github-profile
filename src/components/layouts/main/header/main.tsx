import { useEffect, useState } from "react";
import { generatePath, useLocation, useParams } from "react-router-dom";
import * as Routes from "routes";

export const Header = () => {

    const location = useLocation();
    const params = useParams();
    const [title, setTitle] = useState("");

    useEffect(() => {

        switch (location.pathname) {
            case Routes.Users.PROFILE_SEARCH:
                setTitle(() => "Search");
                break;
            case generatePath(Routes.Users.PROFILE, { username: params?.username ?? "" }):
                setTitle(() => "Profile");
                break;
            case Routes.Users.PROFILE_HISTORY:
                setTitle(() => "History");
                break;
            default:
                setTitle("");
                break;
        }

    }, [location, params]);

    return (
        <header className="gui-main-layout-header">
            <h1>{title}</h1>
        </header>
    )
}