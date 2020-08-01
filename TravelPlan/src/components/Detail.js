import React, {Component} from 'react';
import CardDetail from "./CardDetail";
import CommentInput from "./CommentInput"
import api from './api/index'
import {Button} from "antd"
import moment from "moment"
class Detail extends Component {
    componentDidMount() {
        const id=this.props.location.state.id;
       // console.log(id)
        api.placeDetail(id).then(data=>{
            console.log(data.data)
            this.setState(
                {
                    name:data.data.name,
                    photo_refs:data.data.photo_reference[0],
                    description:data.data.description,
                    upVotes:data.data.upVotes,
                    placeid:id,
                    isplan:false
                }
            )
        })
        api.getComments(id)
            .then(data=>{
                    let buffer=[]
                    data.map((elemet,index)=>{
                        buffer.push({
                            author: elemet.username,
                            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                            content: elemet.content,
                            datetime: elemet.createTime,
                        });
                    })
                    return buffer
                }
            ).then(
            array=>
                this.setState(
                    {
                        comments:array,
                        commentLength:array.length
                    }
                )
        )
        console.log(this.props)


    }

    constructor(props) {
        super()
      //  const placeid='ChIJp32RvaZZwokRfH0Zgzl9mXk'
      //   const id=props.location.state.id;
      //   console.log(id)
      //   api.placeDetail(id).then(data=>{
      //       // console.log(data.data)
      //       this.setState(
      //           {
      //               name:data.data.name,
      //               photo_refs:data.data.photo_reference[0],
      //               description:data.data.description,
      //               upVotes:data.data.upVotes,
      //               placeid:id,
      //               isplan:false
      //           }
      //       )
      //   })
      //   api.getComments(id)
      //       .then(data=>{
      //               let buffer=[]
      //               data.map((elemet,index)=>{
      //                   buffer.push({
      //                       author: elemet.username,
      //                       avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      //                       content: elemet.content,
      //                       datetime: elemet.createTime,
      //                   });
      //               })
      //               return buffer
      //           }
      //       ).then(
      //       array=>
      //           this.setState(
      //               {
      //                   comments:array,
      //                   commentLength:array.length
      //               }
      //           )
      //   )
      // console.log(props)
        this.state={
            name: "",
            photo_refs:"",
            description: "",
            upVotes: 0,
            placeid:"",
            comments:[],
            flag:true,
            commentLength:0,
            isFirstTime:true,
            default:[
                {
                    author: 'hansolo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: "wonderful place",
                    datetime: '',
                }
            ]
        }
        // const placeid="ChIJp32RvaZZwokRfH0Zgzl9mXk"
        // api.placeDetail(placeid).then(data=>{
        // console.log(data.data)
        //     this.setState(
        //         {
        //             name:data.data.name,
        //             photo_refs:data.data.photo_reference[0],
        //             description:data.data.description,
        //             upVotes:data.data.upVotes
        //         }
        //     )
        // })
    }
initData(id){
        api.placeDetail(id).then(data=>{
        // console.log(data.data)
        this.setState(
            {
                name:data.data.name,
                photo_refs:data.data.photo_reference[0],
                description:data.data.description,
                upVotes:data.data.upVotes,
                placeid:id,
                isplan:false
            }
        )
    })
    api.getComments(id)
        .then(data=>{
                let buffer=[]
                data.map((elemet,index)=>{
                    buffer.push({
                        author: elemet.username,
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: elemet.content,
                        datetime: elemet.createTime,
                    });
                })
                return buffer
            }
        ).then(
        array=>
            this.setState(
                {
                    comments:array,
                    commentLength:array.length
                }
            )
    )
}
    handleClickLike=()=>{
        const params={
            place_id:this.state.placeid,
            vote:1
        }
        api.vote(params)
        this.setState(
            {
                flag:!this.state.flag,
                upVotes:this.state.upVotes+1
            }
        )
    }
    handleClickDislike=()=>{
        const params={
            place_id:this.state.placeid,
            vote:-1
        }
        api.vote(params)
        this.setState(
            {
                flag:!this.state.flag,
                upVotes:this.state.upVotes-1
            }
        )
    }

    render() {
     // const id=this.props.location.state.id;
     //    console.log(this.props)
     //    if(this.state.isFirstTime){
     //      this.initData(id);
     //      this.setState({
     //         isFirstTime:!this.state.isFirstTime
     //     })
     // }
     // console.log(this.props)

console.log(this.state)

        // const {banners}=this.state.comments
        return (
            <div>

                <CardDetail
                    name={this.state.name}
                    photo={this.state.photo_refs}
                    description={this.state.description}
                    upVotes={this.state.upVotes}
                    placeid={this.state.placeid}
                    isplan={this.state.isplan}
                    flag={this.state.flag}
                    like={this.handleClickLike}
                    dislike={this.handleClickDislike}
                />
                {
                    this.state.comments.length>0?
                        <CommentInput comments={this.state.comments}
                                      placeid={this.props.placeid}
                        />:
                       <CommentInput comments={this.state.default}
                                     placeid={this.props.placeid}
                        />
                }
            </div>
        );
    }
}




export default Detail;