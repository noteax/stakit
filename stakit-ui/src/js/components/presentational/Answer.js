import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Item, Icon, Image as ImageComponent} from 'semantic-ui-react';
import moment from 'moment';

class Answer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
     return (
       <Item>
       <Item.Image size='tiny' src={this.props.image}/>
         <Item.Content verticalAlign='middle'>
            <Item.Header as='a' href={this.props.externalLink}>{this.props.title}</Item.Header>
            <Item.Extra>Created {moment(this.props.creationDate*1000).fromNow()}</Item.Extra>
            {(this.props.answered) ? <Item.Extra><Icon color='green' name='check'/> Answered</Item.Extra> : ''}
         </Item.Content>
        </Item>
    );
  }

}

Answer.propTypes = {
  image:        PropTypes.string.isRequired,
  externalLink: PropTypes.string.isRequired,
  title:        PropTypes.string.isRequired,
  answered:     PropTypes.bool.isRequired,
  creationDate: PropTypes.number.isRequired
}

export default Answer