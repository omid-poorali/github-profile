import { UIKIT } from "components";

export const FallBack = () => {
    return (
        <div className="gui-suspense-fallback">
            <span>Loading...</span>
            <UIKIT.Spinner />
        </div>
    )
}