import * as React from "react";
import BackBar from "./BackBar";
const { Link } = require("react-router");

export interface CategoryProps { sourceProvider: any; category: string; }
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class PageChooser extends React.Component<CategoryProps, any> {
    constructor(props) {
        super(props);
        this.state={};
    }

    async componentDidMount() {
        this.setState({pictures: []});
        const pictures = await this.props.sourceProvider.getImages(this.props.category);
        this.setState({pictures});

        let win : any = window;
        win.blockWeirdStuff = false;
          
    }

    render() {
        if(!this.state.pictures || this.state.pictures.length === 0) {
            return <div></div>;
        }
        const pictures = this.state.pictures.map(p => {
            const linkTo = `/color/${this.props.category}?source=${encodeURIComponent(p.source)}`;
            return <Link to={linkTo} key={p.source}><img style={{maxWidth: "300px", height: "200px"}} key={p.source} src={p.source} /></Link>;
        })
        return <div style={{overflowY: "scroll"}}>
            <BackBar backLocation="/" />
        {pictures}
        </div>;
    }
}