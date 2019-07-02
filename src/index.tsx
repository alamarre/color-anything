import { render, } from "react-dom";
import * as React from "react";
const {Router, Route, hashHistory} = require("react-router");
//import "font-awesome/css/font-awesome.css";

import sourceProvider from "./providers/JsonSourceProvider";
import PageChooser from "./components/PageChooser";
import HomePage from "./components/HomePage";
import ColoringPage from "./components/ColoringPage";

var div = document.createElement("div");
div.id = "app";
//div.style.overflow = "hidden";
document.body.appendChild(div);

render((<Router history={hashHistory}>
        <Route path="/" exact component={HomePage} />
        <Route path="/category/:category" component={(props) => <PageChooser sourceProvider={sourceProvider} category={props.router.params.category}/>} />
        <Route path="/color/:category" component={(props) => <ColoringPage category={props.router.params.category} imageSource={props.location.query.source} />} />
    </Router>), div);