import React, {Component} from 'react';
import App from './MapPage/MapApp'

class Map extends Component {
    constructor(props) {
        super(props);
        console.log("map.js");
        this.state = {places: ''};
    }
    changePlaces() {
        console.log("places...");
    }
    static getDerivedStateFromProps(props, state) {

    }

    render() {
        return (
            <div>
                {console.log(this.props.myPlaces)}
                {console.log(this.props.placeid)}
                {console.log(this.props.photo)}
                <App 
                    myPlaces={this.props.myPlaces}
                    photos={this.props.photo}
                    placeid={this.props.placeid}
                    location = {this.props.location}
                    cit = {this.props.city}  />
            </div>
        );
    }
}

export default Map;