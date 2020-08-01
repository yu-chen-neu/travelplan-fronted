import React, {Component} from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined,SettingOutlined,HeartOutlined,LikeOutlined} from '@ant-design/icons';
import {encodeSearchParams} from "./utils/http"
import {LikeTwoTone,DislikeTwoTone}from '@ant-design/icons';
import api from './api/index'
class CardDetail extends Component {
 componentWillMount() {



 }
 constructor(props) {
      super();
      this.state = {
          flag: props.flag,
          votes: 0
      }
   }
 //    this.setState({
 //        votes:this.props.upVotes
 //    })
 // }


  // handleClickLike=()=>{
  //     const params={
  //         place_id:this.props.placeid,
  //         vote:1
  //     }
  //     api.vote(params)
  //      this.setState(
  //          {
  //              flag:!this.state.flag,
  //              votes:this.props.upVotes+1
  //          }
  //      )
  //  }
   // handleClickDislike=()=>{
   //     const params={
   //         place_id:this.props.placeid,
   //         vote:-1
   //     }
   //     api.vote(params)
   //     this.setState(
   //         {
   //             flag:!this.state.flag,
   //             votes:this.props.upVotes-1
   //         }
   //     )
   // }

   render() {
        const { Meta } = Card;
        // console.log(this.props.name)
        // console.log(this.props.photo)
        // console.log(this.props.placeid)
       const url='https://maps.googleapis.com/maps/api/place/photo'
       const ph=this.props.photo

        const obj={
            maxwidth:1000,
            photoreference:ph,
            key:'AIzaSyDyFFbnIE7jp4jhC8XW3tk7F7d5oKvIYD0'
        }
        console.log(this.props)
        return (
            <div className="sight">
                <Card
                    style={{ width: 1000 }}
                    cover={
                        <img
                            alt="example"
                            src={encodeSearchParams(url,obj)}
                        />
                    }
                    actions={[
                       // <div onClick={this.handleClickLike}>
                       //     {
                       //      this.props.isplan? <DislikeTwoTone key="like"/>:<LikeTwoTone key="like"/>
                       //     }
                       //
                        <div>
                            {
                               this.props.flag?
                                   <div onClick={this.props.like}>
                                       <LikeTwoTone key="like"/>
                                       {this.props.upVotes}
                                     </div>:
                                   <div onClick={this.props.dislike}>
                                       <DislikeTwoTone key="Dislike"/>
                                        {this.props.upVotes}
                                   </div>
                            }
                        </div>
                    ]}
                >
                    <Meta
                        title={this.props.name}
                        description="这里公园系统是美国迄今为止最为完善、占地面积最大的公园，绵延16公里长，囊括了9个公园，被当地人称为“翡翠项链”（Emerald Necklace）。
                           "/>
                </Card>
            </div>
        );
    }
}

export default CardDetail;