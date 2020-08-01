import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Steps, Button, message } from "antd";

const { Step } = Steps;

let steps = [];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            steps: [{}],
            name: this.generateName()
        };
    }
    
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
        this.props.update(current);
    }
    
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
        this.props.update(current);
    }

    generateName = () => {
        const nameList = this.props.name;
        return [...nameList]
    }

    render() {
        const { current } = this.state;
        if (steps.length < this.props.plan.length){
            steps = []
            const nameList = this.props.name;
            console.log("name" + this.state.name);
            for(let i = 0; i < this.props.plan.length; i++){
                console.log(i);
                steps.push({
                    title: nameList[i]
                });
                console.log(steps);
            }
        }
        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} 
                        title={item.title} />
                    ))}
                </Steps>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                </div>
                <div className="steps-content">{steps[current].content}</div>
            </div>
        );
    }
}
