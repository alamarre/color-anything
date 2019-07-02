import * as React from "react";
const { Link } = require("react-router");

export interface BackProps { backLocation: string; }
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.

export default class BackBar extends React.Component<BackProps, {}> {
    
    render() {
        return <div style={{height: "50px"}}><Link to={this.props.backLocation}>
                <button style={{height: "100%"}} className="fanope fanope-2x fanope-arrow-circle-left">Back</button>
            </Link></div>;
    }
}