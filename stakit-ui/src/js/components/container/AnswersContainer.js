import React, { Component } from "react";
import ReactDOM from "react-dom";
import InfiniteScroll from "react-infinite-scroller";
import Answer from "../presentational/Answer";
import { Message, Container } from 'semantic-ui-react';

class AnswersContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: this.props.elements,
            hasMore: this.props.elements.length != 0,
            loadPage: this.props.loadPage
        };   
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        elements: nextProps.elements,
        hasMore: nextProps.elements.length != 0
      })
    }

    loadItems(page) {
      var self = this;
      this.props.loadPage(page, (data) => {
        self.setState({
          elements: self.state.elements.concat(data.items),
          hasMore: data.hasMore
        });
      });
      
    }

    render() {
        if (this.state.elements.length == 0) {
         return <Container textAlign={"center"}><Message compact warning>No results found.</Message></Container>;
        }

        const loader = <div className="loader">Loading ...</div>;

        var answers = this.state.elements.map(element => {
                  return <Answer
                    image={element.image}
                    externalLink={element.externalLink}
                    title={element.title}
                    answered={element.answered}
                    creationDate={element.creationDate}
                    />;
        });

        return <div className="ui text container">
               <InfiniteScroll
                  pageStart={1}
                  loadMore={this.loadItems.bind(this)}
                  hasMore={this.state.hasMore}
                  loader={loader}>
                    <div className="ui divided items">
                           {answers}
                    </div>
                </InfiniteScroll>
                </div> ;
    }
}
export default AnswersContainer;