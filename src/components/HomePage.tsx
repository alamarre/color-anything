import * as React from "react";
const { Link } = require("react-router");

import sourceProvider from "../providers/JsonSourceProvider";
import PageChooser from "./PageChooser";
import ColoringPage from "./ColoringPage";

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class HomePage extends React.Component<any, {}> {
    render() {
        const categories = sourceProvider.getCategories().map(c => {
            const linkTo = `/category/${c.name}`;
            return <span style={{display:"inline-block"}} key={c.name}>
                <Link to={linkTo}>
                    <img style={{maxWidth: "300px", height: "200px"}} src={c.image} />
                    <div >{c.name}</div>
                </Link>
            </span>
        })
        return <div>{categories}</div>;
    }
}



