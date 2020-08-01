import React, { Component } from 'react';
import {
    GoogleMap,
    LoadScript,
    DirectionsService,
    DirectionsRenderer,
} from "@react-google-maps/api";

import Geocode from 'react-geocode'
import '../../styles/Map.css'

Geocode.setApiKey("AIzaSyBWkVXZm--1L3xcJj3jydJCcibJbyU2gxo");
Geocode.setLanguage("en");

let center = {
    lat: 41.8781,
    lng: -87.6298,
}
const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            places: [],
            isClickedPlan: false,
            center: {
                lat: 0,
                lng: 0
            }
        };
    }

    generatePlace(day) {
        let obj = {}
        let plan = this.props.plan;
        let wpt = [];
        const [ori, ...rest] = plan[day];
        obj.origin = ori;
        obj.destination = rest.pop();
        for (let place of rest) {
            wpt.push({
                location: place,
                stopover: true,
            });
        }
        obj.waypoints = wpt;
        obj.travelMode = 'DRIVING';
        return obj;
    }

    directionsCallback = response => {
        console.log(response)
        if (response !== null) {
            if (response.status === 'OK') {
                this.setState(
                    () => ({
                        response
                    })
                )
            } else {
                console.log('response: ', response)
            }
        }
    }

    getCenter = () => {
        let city = this.props.city;
        Geocode.fromAddress(city).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                center = {
                    lat: lat,
                    lng: lng,
                }
                console.log('center = ' + center);
            },
            error => {
                console.error(error);
            }
        );
    }

    render() {
        // this.updateDay();
        let directions = null;
        let renderOption = null;
        this.getCenter()
        if (this.props.plan.length > 0 && !this.state.isClickedPlan) {
            directions = (
                <DirectionsService
                    options={
                        this.generatePlace(this.props.day)
                    }
                    callback={this.directionsCallback}
                />
            );
            renderOption = (
                <DirectionsRenderer
                    options={{ directions: this.state.response }}
                />
            )
        }
        this.getCenter();
        console.log(`from main map app ${this.props.flag}`)
        this.componentWillReceiveProps = (nextProps) => {
            this.setState({
                isClickedPlan: nextProps.flag,
            })
        };
        console.log(`from main map state ${this.state.isClickedPlan}`)

        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <LoadScript
                    googleMapsApiKey={"AIzaSyDyFFbnIE7jp4jhC8XW3tk7F7d5oKvIYD0"}
                >
                    <GoogleMap
                        mapContainerClassName='MainMap'
                        zoom={12}
                        center={center}
                        options={options}>
                        {directions}
                        {renderOption}
                    </GoogleMap>
                    {/* <div>{console.log(this.children)}</div> */}
                </LoadScript>
            </div>
        )
    };
}

export default Map;