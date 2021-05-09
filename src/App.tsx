import {FC} from "react";
import Component from "./components/Component";

import "./styles/main.css"

export interface HelloWorldProps {
    userName: string;
    lang: string;
}

const App: FC<HelloWorldProps> = ({userName, lang}) => {
    return <div>
        <span className="app-style">Hi {userName} from React! Welcome to {lang} dude!</span>
        <br/>
        <Component/>
    </div>
};

export default App;
