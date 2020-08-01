import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Button, message } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';




const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const columns = [
    {
        title: '',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle />,
    },
    {
        title: 'Plan',
        dataIndex: 'name',
        className: 'drag-visible',
    },
];


const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const DragableBodyRow = ({ index, className, style, ...restProps }) => (
    <SortableItem index={restProps['data-row-key']} {...restProps} />
);
let isFirstTime = true;
export default class SortableTable extends React.Component {
    state = {
        dataSource: this.generatePlace(),
        currDay: this.props.day
    };

    generatePlace() {
        const places = this.props.plan;
        const day = this.props.day
        const newData = []
        for (let i = 0; i < places[day].length; i++){
            newData.push({
                name: places[day][i],
                index: i,
            })
        }
        return newData;
    }
    
    
    onSortEnd = ({ oldIndex, newIndex }) => {
        const { dataSource } = this.state;
        if (oldIndex !== newIndex) {
            const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
            console.log('Sorted items: ', newData);
            this.setState({ dataSource: newData });
        }
    };

    handleUpdateList = () => {
        let buffer = this.state.dataSource;
        console.log(buffer);
        let arr = [];
        for (let i = 0; i < buffer.length; i++){
            arr.push(buffer[i].name);
        }
        this.props.update(arr);
        message.success("Saved")
    }

    render() {
        let inputPlanLen = this.props.plan.length;
        let inputDay = this.props.day;
        if (inputDay !== this.state.currDay){
            this.setState({
                dataSource: this.generatePlace(),
                currDay: inputDay,
            });
        }

        const { dataSource, currDay } = this.state;        

        const DraggableContainer = props => (
            <SortableContainer
                useDragHandle
                helperClass="row-dragging"
                onSortEnd={this.onSortEnd}
                {...props}
            />
        );
        
        return (
            <div>
                <Table
                pagination={false}
                dataSource={dataSource}
                columns={columns}
                rowKey="index"
                components={{
                    body: {
                        wrapper: DraggableContainer,
                        row: DragableBodyRow,
                    },
                }}
                />

                <Button type="primary" shape="round"  size="middle" onClick = {() => this.handleUpdateList()}>
                    Update List
                </Button>
            </div>
            
            
        );
    }
}