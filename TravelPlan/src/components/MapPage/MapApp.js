import React, { Component } from 'react'
import Map from './MainMap'
import Tag from './SlidingTag'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './DraggableList'
import Button from './PlanButton'
import PlacesList from './PlacesList';
// import 'antd/dist/antd.css';
import { Tabs, Result } from 'antd';
import '../../styles/Map.css';
import {encodeSearchParams} from "../utils/http"
import api from '../api';

const { TabPane } = Tabs;


let places = []
let lastIndex = 0
let planBuffer = []

export default class MapApp extends Component {

    constructor(props) {
        super();
        this.state = {
            plan: [],
            name: [],
            currDay: 0,
            places: props.myPlaces,
            photos:props.photos,
            placeid:props.placeid,
            location:props.location,
            city: props.city,
            newPlan: {
                name: '',
                array: [],
            },
            isNotPlan: true,
            isFirstTime: true,
            photo: [],
            isFirstTimeSet:true,
            place:[]
        };
    }
    initdata=()=>{
        const ph = this.state.photos;
        let buffer = [];
        for (let i = 0; i < ph.length; i++) {
            let obj = {
                maxwidth: 300,
                photoreference: ph[i],
                key: 'AIzaSyDyFFbnIE7jp4jhC8XW3tk7F7d5oKvIYD0'
            }
            let url = 'https://maps.googleapis.com/maps/api/place/photo'
            buffer.push(encodeSearchParams(url, obj));
        }
        console.log(buffer)
       return buffer
    }

    onUpdateDate(newDay) {
        this.setState({ currDay: newDay });
        console.log("current = ", this.state.currDay);
    }

    onUpdateList(arr) {
        let totalPlan = this.state.plan;
        let day = this.state.currDay;
        totalPlan[day] = arr;
        this.setState({
            plan: totalPlan,
        });
    }

    onSaveList = (name, arr)=>{
        console.log(`this is the name: ${name}`);
        console.log(`this is the places id arr: ${arr}`);
        let newPlan = this.state.newPlan;
        newPlan.array = arr;
        newPlan.name = name;
        this.setState({
            newPlan: newPlan
        });
        console.log(this.state.newPlan);
        this.pharesPlaces(name)
    }

    pharesPlaces = (name) => {
        const placesList = this.state.places;
        const idList = this.state.placeid;
        const locList = this.state.location;
        let indexArr = this.state.newPlan.array;
        let existPlan = this.state.plan;
        let buffer = [];
        let idBuffer = [];
        const start = locList[0];
        console.log(this.state.placeid);
        for(let i = 0; i < indexArr.length; i++){
            let index = indexArr[i];
            idBuffer.push(idList[index]);
            buffer.push(placesList[index]);
            console.log(buffer);
        }
        this.getRecommend(idBuffer, start, name);
        buffer = [...places];
        buffer.slice(lastIndex);
         places = [];
        console.log('idBuffer = ' + idBuffer);

        lastIndex = places.length;
        console.log(this.state.plan);
    }

    getRecommend = (id, start, name) => {
        api.recommend({
            'startPosition': {
                'lat': start.lat,
                'lng': start.lng
            },
            'place_ids': [...id]
        }).then(result => {
            this.getIndex(result.data.place_ids, name);
        })
    }

    discoveryClickHandler = () => { 
        this.setState({
            isNotPlan: !this.state.isNotPlan,
        });
        console.log(this.state.isNotPlan);
    }

    parseArray = () => {
        console.log(this.props.myPlaces)     
    }

    getIndex = (buffer, name) => {
        const idList = this.state.placeid;
        const placesList = this.state.places
        for (let index = 0; index < buffer.length; index++) {
            const id = buffer[index];
            let temp = idList.indexOf(id);
            places.push(placesList[temp]);
        }
        planBuffer = places.slice(lastIndex)
        console.log(places.slice(planBuffer));
        this.setState({
            plan: [ ...this.state.plan, planBuffer],
            name: [...this.state.name, name]
        });
        console.log(this.state.name);
        console.log(this.state.plan);
    }

    render() {
        console.log(`this is the list from state ${this.state.places}`)
        console.log(this.state.places);
        console.log(this.state.photos);
        console.log(this.state.placeid)


        if(this.state.isFirstTimeSet){
        console.log(this.initdata())
            this.setState({
                photos:this.initdata(),
                isFirstTimeSet:!this.state.isFirstTimeSet
            })
            console.log(this.state.photos)
        }

        let savedPlans = (<h1>No Saved Plan</h1>);
            if (this.state.plan.length){
                savedPlans = (
                <div>
                    <List 
                    plan={this.state.plan} 
                    day={this.state.currDay} 
                    update={this.onUpdateList.bind(this)} />
                        <Tag 
                    plan={this.state.plan} 
                    day={this.state.currDay} 
                    update={this.onUpdateDate.bind(this)} />
                </div>)
            }




        return (


            <div>
                <p className = "mapdiv">
                    <Map plan={this.state.plan} day={this.state.currDay} flag= {this.state.isNotPlan} city = {this.state.city} />
                </p>
                <p className = "taglist">
                    <Tabs defaultActiveKey="1" onChange = {this.discoveryClickHandler}>
                        <TabPane tab="Discovery" key="1" >
                            <PlacesList 
                                places={this.state.places}
                                photos={this.initdata()}

                                placeid={this.state.placeid}
                                city={this.state.city}
                                save = {this.onSaveList.bind(this)}
                                />
                            {console.log(this.state.photos)}
                        </TabPane>
                        <TabPane tab="Saved Plans" key="2">
                            <List 
                                plan={this.state.plan} 
                                name = {this.state.name}
                                day={this.state.currDay} 
                                update={this.onUpdateList.bind(this)} />
                            <Tag 
                                plan={this.state.plan} 
                                day={this.state.currDay} 
                                update={this.onUpdateDate.bind(this)} 
                                name = {this.state.name}/>
                        </TabPane>
                    </Tabs>
                </p>
            </div>

        )
    }
}
