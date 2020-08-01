
import React, { Component } from 'react';
import Register from "./Register"
import NavBar from "./NavBar";
import Login from "./Login";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail"
import Map from "./Map";
import Search from "./Search";
import { PhoneTwoTone } from '@ant-design/icons';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            photo: [],
            place_id: [],
            location: [],
            city:'',
        };
        this.changeMap = React.createRef()
    }

    searchCallBack = (searchRes) => {
        console.log("received places")
        console.log(searchRes);
        //this.changeMap.current.changePlaces();
        let places = [];
        let photos = [];
        let place_id = [];
        let location = [];
        let cityBuffer = '';
        for (let index = 0; index < searchRes.length; index++) {
            const element = searchRes[index];
            location.push(element.location)
            places.push(element.name)
            photos.push(element.photo_refs[0])
            place_id.push(element.id)
            cityBuffer = element.city
        }
        console.log(places);
        this.setState({
            places: [...places],
            photo: [...photos],
            place_id: [...place_id],
            location: [...location],
            city:cityBuffer
        });
        console.log(this.state.places);
        console.log(this.state.photo);
        console.log(this.state.place_id);
        console.log(this.state.location);
    }

    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/search" /> : <Login handleLoginSucceed={this.props.handleLoginSucceed} />;
    }
    getHome = () => {
        return this.props.isLoggedIn ? <Home /> : <Redirect to="/login" />;
    }
    getDetail = () => {
        return this.props.isLoggedIn ? <Detail /> : <Redirect to="/login" />;
    }
    getMap = () => {
        if (this.props.isLoggedIn) {
            if (this.state.places.length > 0) {
                return <Map 
                    myPlaces={this.state.places}
                    photo={this.state.photo}
                    placeid={this.state.place_id}
                    location = {this.state.location}
                    city = {this.state.city}
                />;
            } else {
                return <div>loading</div>
            }
        } else {
            return <Redirect to="/login" />;
        }
    }
    getSearch = () => {
        return this.props.isLoggedIn ? <Search callBackFromParent={this.searchCallBack} /> : <Redirect to="/login" />;
    }

    render() {
        return (
            <div className="main">

                <Switch>
                    <Route path="/register" component={Register} />

                    <Route path="/detail" component={ this.props.isLoggedIn ? Detail:Login} />
                    <Route path="/map" render={this.getMap} />
                    <Route path="/login" render={this.getLogin} />

                    <Route path="/home" render={this.getHome} />
                    <Route path='/search' render={this.getSearch} />
                    <Route render={this.getLogin} />
                </Switch>


            </div>
        );
    }
}

export default Main;
