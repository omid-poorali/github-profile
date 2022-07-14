import { Layouts, UIKIT } from "components";

export const FallBack = () => {
    return (
        <Layouts.FallBack>
            <span>Loading...</span>
            <UIKIT.Spinner />
        </Layouts.FallBack>
    )
}