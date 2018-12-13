import React, {Component} from 'react';

export default class MapItem extends Component{
  render(){
    return(
      <button
      className="mapButton" 
      tabIndex="0"
      onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)}
      onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>
      {this.props.data.longname}
      </button>
    );
  }
}
