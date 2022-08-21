import React, { Component } from "react";

export default class CustomPinnedRowRenderer extends Component {
  render() {
    return (
      <span style={this.props.style}>
        <strong>{this.props.value}</strong>
      </span>
    );
  }
}
