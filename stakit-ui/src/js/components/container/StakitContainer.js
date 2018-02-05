import React, { Component} from "react";
import ReactDOM from "react-dom";
import AnswersContainer2 from "./AnswersContainer2";
import { Search, Item, Divider } from 'semantic-ui-react';
import Answer from "../presentational/Answer";
import qwest from 'qwest';

class StakitContainer extends Component {
  constructor() {
    super();
    this.state = {
        foundElements: []
    };  

  }

  loadItems(page, dataFun) {
    var url = 'http://api.stackexchange.com/2.2/search?page='+page+'&pagesize=50&key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&intitle=java&filter=default';
        qwest.get(url, {
                cache: true
            })
            .then(function(xhr, resp) {
                if(resp) {
                    var items = resp.items.map((item) => {
                        return {
                        	id: item.question_id,
                        	image: item.owner.profile_image,
                        	externalLink: item.link,
                        	title: item.title,
                        	answered: item.is_answered,
                        	creationDate: item.creation_date
                        };
                    });
                    dataFun({
                	  elements: items,
                	  hasMore: resp.has_more
                    });
                }
            }).catch(function(err) {
            	console.log("Error loading elements "+err);
            });
  }

handleSearchChange(e, { value }) {
	var self = this
    var url = 'http://api.stackexchange.com/2.2/search?page=1&pagesize=50&key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&intitle='+value+'&filter=default';
        qwest.get(url, {
                cache: true
            })
            .then(function(xhr, resp) {
                if(resp) {
                    var items = resp.items.map((item) => {
                        return {
                        	id: item.question_id,
                        	image: item.owner.profile_image,
                        	externalLink: item.link,
                        	title: item.title,
                        	answered: item.is_answered,
                        	creationDate: item.creation_date
                        };
                    });
                    self.setState({
                    	foundElements: items
                    });
                }
            }).catch(function(err) {
            	console.log("Error loading elements "+err);
            });
}


  render() {
    return (
      <div>
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui inverted header">Stakit - search stakexchange forums</h1>
            <Search 
                     showNoResults={false} 
                     onSearchChange={this.handleSearchChange.bind(this)}/>
          </div>
        </div>

        <Divider hidden={true}/>
          <AnswersContainer2 
             loadPage={this.loadItems.bind(this)}
             elements={this.state.foundElements}
            />
        </div>
    );
  }
}

export default StakitContainer;

const wrapper = document.getElementById("stakit-container");
wrapper ? ReactDOM.render(<StakitContainer />, wrapper) : false;