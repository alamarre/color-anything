import * as React from "react";
import BackBar from "./BackBar";

function getQueryStringValue(key) {
  if(!document.location.search) {
    return null;
  }
  const start = document.location.search.indexOf(key);
  if(start < 0) {
    return null;
  }
  const mid = document.location.search.indexOf("=", start+1) +1;
  const end = document.location.search.indexOf("&", start+1);
  if(end > 0) {
    return document.location.search.substring(mid, end);
  }
  return document.location.search.substring(mid);
}

const lineWidth = getQueryStringValue("width")  || 30;
const colors = [
    "rgba(255, 0, 0, 1.0)", // red
    "rgba(58, 166, 85, 1)", // green
    "rgba(0, 0, 255, 1.0)", // blue

    "rgba(175, 89, 62, 1.0)", // brown
    "rgba(251, 232, 112, 1.0)", // yellow
    "rgba(255, 136, 51, 1.0)", // orange

    "rgba(101, 45, 193, 1.0)", // purple

    "rgba(0, 0, 0, 1.0)", // black
    "rgba(255, 255, 255, 1.0)", // white

    "rgba(210, 77, 154, 1.0)", // pink

    "rgba(0, 255, 0, 1.0)", // green

    "rgba(46, 180, 230, 1)", // light blue
    "rgba(21, 96, 189, 1)", // dark blue

    
];
const transparency = "1.0";

function detectLeftButton(evt) {
    evt = evt || window.event;
    if ("buttons" in evt) {
      return evt.buttons == 1;
    }
    var button = evt.which || evt.button;
    return button == 1;
  }

export interface PageProps { imageSource: any; category: string; }
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.

export default class ColoringPage extends React.Component<PageProps, any> {
    startingX: number;
    startingY: number;
    constructor(props) {
        super(props);
        this.state = {currentColor: colors[0]};
        this.moveStart = this.moveStart.bind(this);
        this.moving = this.moving.bind(this);
        this.moveEnd = this.moveEnd.bind(this);
        this.startingX = -1;
        this.startingY = -1;
    }

    componentDidMount() {
      let win : any = window;
      win.blockWeirdStuff = true;
    }

    moveStart(event) {
        event.preventDefault();
        const touches = event.changedTouches;
        let startingX, startingY;
        if(touches) {
          if(touches.length === 1) {
            startingX = touches[0].clientX;
            startingY = touches[0].pageY;
          }
        } else {
          event.preventDefault();
          if(detectLeftButton(event)) {
            //this.preventClick(event);
            startingX = event.clientX;
            startingY = event.pageY;
          }
        }
        const canvas : any = this.refs.canvas;
        startingX = startingX - canvas.offsetLeft;
        startingY = startingY - canvas.offsetTop;
        this.startingX = startingX;
        this.startingY = startingY;
      }
    
    moving(event) {
        event.preventDefault();
        if(this.startingX === -1) {
          return;
        }
        let currentX, currentY;
        const touches = event.changedTouches;
        if(touches) {
          if(touches.length === 1) {
            currentX = touches[0].clientX;
            currentY = touches[0].pageY;
          } else {
            return;
          }
        } else {
          event.preventDefault();
          currentX = event.clientX;
          currentY = event.pageY;
        }
        
        const canvas : any = this.refs.canvas;
        currentX = currentX - canvas.offsetLeft;
        currentY = currentY - canvas.offsetTop;


        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = lineWidth;
        ctx.moveTo(this.startingX, this.startingY);
        ctx.strokeStyle = this.state.currentColor.replace("1.0", transparency);
        //ctx.moveTo(0, 0);
        //ctx.lineTo(1000, 1000);
        ctx.lineTo(currentX, currentY);
        console.log('drawing', this.startingX, this.startingY, currentX, currentY, event.clientX, event.clientY);
        
        ctx.stroke();
    
        this.startingX = currentX;
        this.startingY = currentY;
      }
    
    moveEnd(event) {
        event.preventDefault();
        this.startingX = -1;
        this.startingY = -1;
      }


    render() {
        const backLocation = `/category/${this.props.category}`;
        const maxHeight = window.innerHeight - 100;
        const maxWidth = window.innerWidth - 250;
        
        const colorElements = colors.map(c => {
            let style : any = {display: "inline-block", margin: "10px", background: c, width: "75px", height: "75px"};
            if(c === this.state.currentColor) {
                style.border = "3px solid black";
            } else {
                style.border = "1px dotted black";
            }
            return <span key={c} onClick={(event) => { this.setState({currentColor: c})}} style={style}>&nbsp;</span>
        })
        const colorChooser = <div style={{width: "250px", margin: "0", display: "table-cell",  verticalAlign: "top"}} id="color-chooser">
          <div style={{margin: "0", height: maxHeight, overflowY: "scroll",}}>
            {colorElements}
          </div>
        </div>;
        return <div ref="root" style={{overflowY: "visible", overflowX: "hidden", height: window.innerHeight}}>
            <BackBar backLocation={backLocation} />
            <div style={{display: "table", width: window.innerWidth + "px"}}>
                <div style={{display: "table-cell"}}>
                    <canvas ref="canvas" width={maxWidth+"px"} height={maxHeight+"px"}
                    onMouseDown={this.moveStart} onMouseLeave={this.moveEnd} onMouseMove={this.moving} onMouseUp={this.moveEnd} onTouchStart={this.moveStart} onTouchEnd={this.moveEnd} onTouchMove={this.moving}
                    style={{position: "absolute", mixBlendMode: "multiply", top: "50px", left: "0px", zIndex: 1, margin: "0"}} />
                    <img onTouchStart={(event) => event.preventDefault()}  draggable={false} style={{display: "block", zIndex: 2, mixBlendMode: "multiply", maxHeight: maxHeight+"px", maxWidth: maxWidth+"px", marginLeft: "auto", marginRight: "auto"}} src={this.props.imageSource}
                    />
                </div>
                {colorChooser}
            </div>
        </div>;
    }
}