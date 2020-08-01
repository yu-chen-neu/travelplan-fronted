import React, {Component} from 'react';
import { Input } from 'antd';
import {Link, Redirect, withRouter} from "react-router-dom";
import api from './api/index'

const { Search } = Input;


class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchRes: ''
        }
    }


    onClick = (value) => {
        api.searchPlaces({city: value, sort: 'RATING'}).then(result => {
            this.props.callBackFromParent(result['data']['places']);
        });
        this.props.history.push("/map");
    }

    render() {
        return (
            <div className="search">
                <div>
                    <Search
                        placeholder="search a city"
                        enterButton="Search"
                        size="large"
                        onSearch = {this.onClick.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(SearchForm);