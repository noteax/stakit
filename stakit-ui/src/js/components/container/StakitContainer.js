import React, { Component} from "react";
import ReactDOM from "react-dom";
import AnswersContainer from "./AnswersContainer";
import { Search, Item, Divider } from 'semantic-ui-react';
import Answer from "../presentational/Answer";
import qwest from 'qwest';

class StakitContainer extends Component {
  constructor() {
    super();
    this.state = {
        text: "",
        foundElements: []
    };
  }

  loadItems(page, text, dataCallback) {
    var url = window.location.href + 'search?page='+page+'&limit=50&text='+text;
        qwest.get(url)
            .then(function(xhr, resp) {
                if(resp) {
                    dataCallback(resp);
                }
            }).catch(function(err) {
                console.log("Error loading elements "+err);
            });
  }

  loadAdditionalItems(page, dataFun) {
    this.loadItems(page, this.state.text, dataFun);
  }

  handleSearchChange(e, { value }) {
    var self = this
    if (value.length < 3) {
        self.setState({
                        foundElements: [],
                        text: value
                    });
    } else {
      self.loadItems(1, value, function(data) {
        self.setState({
                        foundElements: data.items,
                        text: value
                    });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui inverted header">Stakit - search stakexchange forums.</h1>
            <Search 
                     showNoResults={false} 
                     onSearchChange={this.handleSearchChange.bind(this)}/>
          </div>
        </div>

        <Divider hidden={true}/>
          <AnswersContainer 
             loadPage={this.loadAdditionalItems.bind(this)}
             elements={this.state.foundElements}
            />
        </div>
    );
  }
}

export default StakitContainer;

const wrapper = document.getElementById("stakit-container");
wrapper ? ReactDOM.render(<StakitContainer />, wrapper) : false;