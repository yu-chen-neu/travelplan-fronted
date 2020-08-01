import React, {Component} from 'react';
import logo from "../assets/images/logo.svg"

import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;


class NavBar extends Component {
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">

              Home
            </span>
                    }
                >
                    <Menu.ItemGroup >
                        <Menu.Item key="setting:1">1</Menu.Item>
                        <Menu.Item key="setting:2">2</Menu.Item>

                        <Menu.Item key="setting:3">3</Menu.Item>
                        <Menu.Item key="setting:4">4</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="mail">

                Map
                </Menu.Item>
                <Menu.Item key="app" >

                   Category
                </Menu.Item>

                <Menu.Item key="alipay">
                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                        detail
                    </a>
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavBar;