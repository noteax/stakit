import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Item, Icon, Image as ImageComponent} from 'semantic-ui-react';

const Answer = ({ image, externalLink, title, answered, creationDate }) => (
	 <Item>
      <Item.Image size='tiny' src={image}/>
      <Item.Content verticalAlign='middle'>
        <Item.Header>{title}</Item.Header>
        <Item.Extra><Icon color='green' name='check'/> Answered</Item.Extra>
      </Item.Content>
    </Item>
);

Answer.propTypes = {
  image:        PropTypes.string.isRequired,
  externalLink: PropTypes.string.isRequired,
  title:        PropTypes.string.isRequired,
  answered:     PropTypes.bool.isRequired,
  creationDate: PropTypes.number.isRequired
}

export default Answer