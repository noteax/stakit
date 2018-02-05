import React, { Component } from "react";
import ReactDOM from "react-dom";
import Infinite from "react-infinite"
import Answer from "../presentational/Answer";

class AnswersContainer extends Component {

  constructor() {
    super();
    this.state = {
      elements: this.buildElements(0, 20),
      isInfiniteLoading: false
    };
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.elementInfiniteLoad = this.elementInfiniteLoad.bind(this);
  }

    buildElements(start, end) {
        var elements = [];
        for (var i = start; i < end; i++) {
            elements.push(<Answer key={i} keyVal="Hahaha"/>)
        }
        return elements;
    }

    handleInfiniteLoad() {
        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        setTimeout(function() {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + 100);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 2500);
    }

    elementInfiniteLoad() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    }

    render() {
        return <Infinite elementHeight={20}
                         containerHeight={250}
                         infiniteLoadingBeginBottomOffset={20}
                         onInfiniteLoad={this.handleInfiniteLoad}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         >
            {this.state.elements}
        </Infinite>;
    }
}
export default AnswersContainer;