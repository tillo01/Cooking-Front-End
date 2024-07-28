/** @format */

// @ts-nocheck
import { log } from "console";
import React, { Component } from "react";

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeColor = () => {
    this.setState({ color: "Blue", brand: "Tesla", model: "Model  S", year: 2020 });
  };
  componentDidMount() {
    console.log("componentDidMount");
    // runs after first render => RETRIVE DATA F
  }
  componentWillUnmount() {
    // runs before components unmount
    console.log("componentWillUnmount");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
}

export default Car;
