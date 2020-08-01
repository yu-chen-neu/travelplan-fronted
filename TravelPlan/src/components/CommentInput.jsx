import React, {Component} from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import api from './api/index'
const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item >
            <TextArea rows={4} label onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);
class CommentInput extends Component {
  componentDidMount() {
    this.iniData()
    console.log(this.props)
  }


    constructor() {
       super();
       this.state = {
           comments: [],
           submitting: false,
           value: '',
           isFirstTime: true,
           placeid: ''
       };
   }
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

      const param={
          place_id: this.props.placeid,
          content: this.state.value
      }
  // api.comment(param)
    setTimeout(() => {
        this.setState({
            submitting: false,
            value: '',
            comments: [
                {
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{this.state.value}</p>,
                    datetime: moment().fromNow(),
                },
                ...this.state.comments,
            ],
        });
    }, 1000)

    };


    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    iniData() {
       console.log(this.props.comments[0].author)
        let buffer = [];
        for (let i = 0; i < this.props.comments.length; i++) {
            buffer.push({
                author: this.props.comments[i].author,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{this.props.comments[i].content}</p>,
                datetime: this.props.comments[i].datetime,
            });
        }
        this.setState({
            comments : buffer,
            placeid:this.props.placeid
        });
    }

    render() {
        const { comments, submitting, value } = this.state;
        console.log(this.state)

        if(this.state.isFirstTime){
            this.iniData()
            this.setState({
                isFirstTime:!this.state.isFirstTime
            })
        }

        return (
            <div className="comment">
                <h1>Comment {this.state.comments.length}</h1>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        );
    }
}

export default CommentInput;