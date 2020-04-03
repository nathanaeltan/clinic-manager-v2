import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";

export class Alert extends Component {
  componentDidMount() {
    this.props.alert.show("WORKING");
  }
  render() {
    return <Fragment />;
  }
}

export default withAlert()(Alert);
