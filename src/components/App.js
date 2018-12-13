import React, { Component } from 'react';
import MapList from './MapList';

export default class App extends Component {

  constructor(props){

        super(props);
//the data of city Surat being used
        this.state = {
            'locations': [
                {
                    'name': "SVNIT College",
                    'type': "College",
                    'latitude': 21.1674,
                    'longitude': 72.7851
                },
                {
                    'name': "INOX-VR",
                    'type': "Movie Theatre",
                    'latitude': 21.1455,
                    'longitude': 72.7571
                },
                {
                    'name': "RahulRaj Mall",
                    'type': "Mega Mall",
                    'latitude': 21.1553,
                    'longitude': 72.7667
                },
                {
                    'name': "Hotel Oyster",
                    'type': "Hotel",
                    'latitude': 21.1605,
                    'longitude': 72.7719
                },
                {
                    'name': "Surat Central",
                    'type': "Mega Mall",
                    'latitude': 21.1946,
                    'longitude': 72.8431
                },
                {
                    'name': "SurTea",
                    'type': "Cafeteria",
                    'latitude': 21.1710,
                    'longitude': 72.7890
                },
                {
                    'name': "Imperial Square Mall",
                    'type': "Mega Mall",
                    'latitude': 21.1865,
                    'longitude': 72.7932
                },
                {
                    'name': "VNSGU",
                    'type': "College",
                    'latitude': 21.1535,
                    'longitude': 72.7832
                },
                {
                    'name': "Ichchhanath Temple",
                    'type': "Hindu Temple",
                    'latitude': 21.1681,
                    'longitude': 72.7863
                },
                {
                    'name': "Red Ink Tattoos, Piercings",
                    'type': "Tattoo Shop",
                    'latitude': 21.1839,
                    'longitude':  72.8304
                },
                {
                    'name': "Science Centre",
                    'type': "Tech Park",
                    'latitude': 21.1702,
                    'longitude': 72.7956
                },
                {
                    'name': "Croma, Ripple Mall",
                    'type': "Mall",
                    'latitude': 21.1601,
                    'longitude': 72.7729
                },
                {
                    'name': "New City Hospital",
                    'type': "Hospital",
                    'latitude': 21.1698,
                    'longitude': 72.7893
                },
                {
                    'name': "Lake View Garden",
                    'type': "Park",
                    'latitude': 21.1644,
                    'longitude': 72.7811
                }
            ],

            'map': '',
            'informationWindow': '',
            'previouMarker': ''
        };

        this.init = this.init.bind(this);
        //binding the functions with this
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }
//runs when the component mounts i.e loads map
  componentDidMount = () => {

        window.init = this.init;
        loadMapOffline('https://maps.googleapis.com/maps/api/js?key=AIzaSyBbKw-Q8tEdtMZ6lrfpwKzDRFuzUEdD2aU&callback=init')

    }

//init function loads map and other functionalities
  init = () => {
        const that = this;
//map view
        const mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
//map variable i.e the most important initialization
        const map = new window.google.maps.Map(mapview, {
            center: {lat: 21.1674, lng: 72.7851},
            zoom: 14,
            mapTypeControl: false
        });
//information window for the particular item
        const InfoWindow = new window.google.maps.InfoWindow({});
//initializing state variables
        this.setState({ 'map': map, 'informationWindow': InfoWindow });
//map events
//close window
        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
                    that.closeInfoWindow();
                });
//resize window
        window.google.maps.event.addDomListener(window, "resize", function () {
            const center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            that.state.map.setCenter(center);
        });
//click listener
        window.google.maps.event.addListener(map, 'click', function () {
            that.closeInfoWindow();
        });
//mapping all over the locations
        const Locations = [];

        this.state.locations.forEach((location) => {
            const fullname = location.name + ' - ' + location.type;
            const marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                map: map
            });

            marker.addListener('click', function () {
                that.openInfoWindow(marker);
            });

            location.fullname = fullname;
            location.marker = marker;
            location.display = true;
            Locations.push(location);
        });

        this.setState({ 'locations': Locations });

    }

//markers information is obtained when clicked via this fucntion
  getMarkerInformation = (marker) => {

        var that = this;
        var clientId = "RQDEKO1PWMOLOUQKXB5QNW54WU3EN5IN3E3Z530FKGGKCUVR";
        var clientSecretKey = "N11HOVWEAGZXXOUL0G4BGTVF4NKH5VPZX4WS41S5FOODNVHS";
        var URL = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecretKey + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";

        fetch(URL)
//when the fetch request comes through
            .then(
                function (response) {

                    if (response.status !== 200) {

                        that.state.informationWindow.setContent("Sorry data can't be loaded");

                    }else{
                      response.json().then(function (data) {
//this is the text written in the marker when clicked
                        const location_data = data.response.venues[0];
//check
                        console.log(data.response.venues[0]);
                        const isVerified = '<span><em><strong>Is it a verified Location: </strong></em></span>' + (location_data.verified ? 'Yes' : 'No') + '<hr>';
                        const numOfCheckIns = '<span><em><strong>Number of check-ins: </strong></em></span>' + location_data.stats.checkinsCount + '<hr>';
                        const city = '<span><em><strong>City, Country: </strong></em></span>' + location_data.location.city + ", " + location_data.location.country + '<hr>';
                        const more = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More about this place on Foursquare.com</a>';

                        that.state.informationWindow.setContent(numOfCheckIns + city + isVerified + more);

                    });
                  }
                }
            )
//error handling
            .catch(function(error) {
                that.state.informationWindow.setContent(`Oops! Data wouldn't load because of error: {{error}}!`);
            });
    }

//open informaiton window handler
  openInfoWindow = (currentMarker) => {

        this.closeInfoWindow();

        this.state.informationWindow.open(this.state.map, currentMarker);

        this.setState({'previousMarker': currentMarker });

        this.state.informationWindow.setContent('loading...');
        this.state.map.setCenter(currentMarker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInformation(currentMarker);
    }

//close information window handler
  closeInfoWindow = () => {

        if (this.state.previousMarker){
            this.state.previousMarker.setAnimation(null);
        } else{
            this.setState({ 'previouMarker': '' });
        }

        this.state.informationWindow.close();
    }

//render function for the App component
  render() {
        return (
            <div className="App">
                <MapList
                key="7"
                locations={this.state.locations}
                openInfoWindow={this.openInfoWindow}
                closeInfoWindow={this.closeInfoWindow}
                />
                <div id="map"> </div>
            </div>
        );
    }
}


//makes sure to load the map offline if at all needed
function loadMapOffline(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");

    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps did not respond to your query");
    };

    ref.parentNode.insertBefore(script, ref);
}
