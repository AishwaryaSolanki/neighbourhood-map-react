import React, {Component} from 'react';
import MapItem from './MapItem';

export default class MapList extends Component{

//Defult constructor props defined
    constructor(props){

      super(props);
//defining values of the state parameters
//LocationValue is pointing to the current location we're dealing with
//queryString is the one that helps in checking the search functionality
//suggestions are welcomed always

      this.state = {
            'locationValues': '',
            'queryString': '',
            'show': true,
                  };

//binding the functions with the value of this

      this.filterAllLocations = this.filterAllLocations.bind(this);
      this.showImportantAreas = this.showImportantAreas.bind(this);
        }

//this function filters the location values
    filterAllLocations = (event) => {

        const {value} = event.target;
        var locationArray = [];
        this.props.closeInfoWindow();
        console.log(value);
        this.props.locations.forEach(function (locationItem) {
            if (locationItem.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                locationItem.marker.setVisible(true);
                locationArray.push(locationItem);
            } else {
                locationItem.marker.setVisible(false);
            }
        });
//filtered values are then helpful in changing the state
        this.setState({ 'locationValues': locationArray, 'queryString': value });

    }

//this button helps when we want or do not want a list of items to see
    showImportantAreas = () => {
        this.setState({ show: !this.state.show });
    }

//runs when the component mounts and sets the values of the location parameters
    componentWillMount = () => {
      this.setState({'locationValues' : this.props.locations })
    }

//render method for our MapList component
  render(){

    const List = this.state.locationValues.map(function(item, index){
      return(
        <MapItem
          key = { index }
          data = { item }
          openInfoWindow = { this.props.openInfoWindow.bind(this) }
        />
      );
    }, this);

    return(
      <div className="container">
      <div className="row">
      <div className="col-sm-2">
      <div className="searchBox">

          <input
            className="searchBar"
            id="searchBar"
            type="text"
            value={ this.state.queryString }
            onChange={ this.filterAllLocations }
            role="search"
            aria-labelledby="searchBox"
            placeholder="Let the search begin..."
            />

            <ul>
              {this.state.show && List}
            </ul>

            <button
            className="toggleButton btn btn-primary"
            onClick={this.showImportantAreas}>
              Show/Hide important areas around
            </button>

      </div>
      </div>
      </div>
      </div>
    );
  }
}
