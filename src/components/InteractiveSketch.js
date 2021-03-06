import React from "react";
import P5Wrapper from "../wrappers/react-p5-wrapper";
import "../css/interactive.css";
import scroll from "../sketches/Scroll";
import square from "../sketches/Square";
import draw from "../sketches/Draw";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class InteractiveSketch extends React.Component {
  //these need to be passed down into our sketch
  state = {
    saved: false,
    backClicked: false
  };

  //this function is connected to the save button
  handleClick = () => {
    this.setState({
      saved: true
    });
  };

  //this function is connected to the back button
  handleBackClick = () => {
    this.setState({
      backClicked: true
    });
  };

  sketch = () => {
    switch (this.props.sketchName) {
      case "scroll":
        return scroll;
      case "sound":
        return draw;
      case "square":
        return square;
      default:
        return null;
    }
  };

  sketchDescription = () => {
    switch (this.props.sketchName) {
      case "scroll":
        return (
          <span>
            Hit any button on the keyboard to pause animation. Scroll to change
            size of circles.
          </span>
        );
      case "square":
        return (
          <span>
            Hit any button on the keyboard to pause animation. Scroll to change
            draw radius, use up/down arrows to change size.
          </span>
        );
      case "sound":
        return (
          <span>
            Hit any button on the keyboard to pause animation. Speak to change
            radius.
          </span>
        );
      default:
        return <span />;
    }
  };

  render() {
    return this.props.colors.length === 0 ? (
      <Redirect to="/" />
    ) : (
      <div id="interactive-sketch">
        <P5Wrapper
          sketch={this.sketch()}
          saved={this.state.saved}
          history={this.props.history}
          createPattern={this.props.createPattern}
          backClicked={this.state.backClicked}
          colors={this.props.colors}
        />
        <div id="interactive-bottom-bar">
          <button onClick={this.handleBackClick} id="interactive-back">
            BACK
          </button>

          {this.sketchDescription()}

          <button onClick={this.handleClick} id="interactive-save">
            SAVE
          </button>
        </div>
      </div>
    );
  }
}

// style={{
//   position: "absolute",
//   left: window.innerWidth - 200,
//   top: window.innerHeight - 80
// }}

const mapStateToProps = state => {
  return {
    colors: state.patternOptions.colors,
    sketchName: state.patternOptions.name
  };
};

export default withRouter(connect(mapStateToProps, actions)(InteractiveSketch));
