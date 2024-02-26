import './styles/index.sass'

import cn from "classnames";
import {withProviders} from './providers'
import {Routing} from "../pages";

import style from './style.module.sass'

function App() {
    return (
        <div className={cn('app', style.root)}>
            <Routing />
        </div>
    );
}

export default withProviders(App)