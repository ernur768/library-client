import {BrowserRouter} from "react-router-dom";
import {Suspense} from "react";

export const withRouter = (component) => () => (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            {component()}
        </Suspense>
    </BrowserRouter>
)

// TODO: add loading spinner component