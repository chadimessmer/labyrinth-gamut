import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export default class RecursiveContainer extends Component {
  static propTypes = {
    config: PropTypes.array,
  };

  getStyles = (item) => {
    return {
      margin: item.type === "section" ? 10 : 0,
      padding: 5,
    };
  };

  itemRenderer = (item, key) => {
    return (
      <Fragment key={key}>
        <div style={this.getStyles(item)}>
          <div>{item.email} -</div>
          <div>{item.review}</div>
          {item.children && item.children.length > 0 && <RecursiveContainer config={item.children} />}
        </div>
      </Fragment>
    );
  };

  render() {
    return (
      <>
        {this.props.config.map((item, key) => {
          return this.itemRenderer(item, key);
        })}
      </>
    );
  }
}
