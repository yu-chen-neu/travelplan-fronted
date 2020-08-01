import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {List, Space, Checkbox, Button, message} from 'antd';
import {NavLink} from "react-router-dom"
const placeSet = new Set();
const placeIdSet = new Set();

const IconText = ({ icon, text }) => (
    <div>
        {React.createElement(icon)}
        {text}
    </div>
);

export default class PlacesList extends Component {
    constructor(props) {
        super();
        this.state = {
            savedPlaces: [],
            listData:[],
            isFirstTime: true,
            city: ""
        };
    }

    iniData() {
        let buffer = [];
        for (let i = 0; i < this.props.places.length; i++) {
            buffer.push({
                index: i,
                title: this.props.places[i],
                content: `place${i}`,
                photo_refs:this.props.photos[i],
                placeid:this.props.placeid[i]
            });
        }
        this.setState({
            listData : buffer,
        });
    }

    handleClick = (e) => {
        const placesIndexArray = Array.from(placeSet);
        const planName = document.getElementById("planNameInput").value;
        placeSet.clear();
        this.props.save(planName, placesIndexArray);       // console.log(placeSet);
        message.success("Save as minium distance plan!")
    }

    handleCheck = (e) => {
        const index = e.target.value;
        if(e.target.checked){
            if (!placeSet.has(index)){
                placeSet.add(index);
            }
            console.log(e.target.value);
        }else{
            if(placeSet.has(index)){
                placeSet.delete(index);
            }
            console.log(`delet ${e.target.value}`);
        }

    }


    render() {
        if (this.state.city !== this.props.city){
            console.log(this.state.city);
            console.log(this.props.city);
            console.log('changed a city');
        }
        if (this.state.isFirstTime){
            this.iniData();
            this.setState({
                isFirstTime: false
            });
        }
        return (
            <div>
                <a>{console.log(this.state.listData)}</a>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={this.state.listData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[<Checkbox
                                onChange = {this.handleCheck}
                                value = {item.index}
                                >Select</Checkbox>,
                                <NavLink activeClassName="selected" exact to={{
                                    pathname: "/detail",

                                    state: { id:item.placeid }
                                }}>Detail</NavLink>
                                ]
                    
                            }
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={item.photo_refs}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<a>{item.title}</a>}
                            />
                        </List.Item>
                    )}
                />
                <input id = "planNameInput" type = "text" onChange = {(event) => {
                }} />
                <Button onClick = {this.handleClick} value = {'hello'}>
                    Recommend Plan
                </Button>
            </div>
        )
    }
}
