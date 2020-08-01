import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Button } from "antd";

export default class App extends React.Component {
    constructor(props){
        super();
        
    }
    state = {
        loadings: []
    };

    enterLoading = index => {
        this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = true;

            return {
                loadings: newLoadings
            };
        });
        setTimeout(() => {
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[index] = false;

                return {
                    loadings: newLoadings
                };
            });
        }, 6000);
    };

    render() {
        const { loadings } = this.state;
        return (
            <>
                <Button
                    type="primary"
                    loading={loadings[0]}
                    onClick={() => this.enterLoading(0)}
                >
                    Show Plan!
        </Button>
            </>
        );
    }
}
