import React, {Component} from 'react';
import { Tabs, Button, Spin } from 'antd';

const { TabPane } = Tabs;



class Home extends Component {

    render() {
        const operations = <Button>Extra Action</Button>;
        return (
            <Tabs tabBarExtraContent={operations}>
                <TabPane tab="images" key="1">
                    Content of tab 1
                </TabPane>
                <TabPane tab="map" key="2">
                    Content of tab 2
                </TabPane>
                <TabPane tab="details" key="3">
                    Content of tab 3
                </TabPane>
            </Tabs>
        );
    }
}

export default Home;