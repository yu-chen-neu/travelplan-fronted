import {httpGet,httpPost,httpPost2,httpPut} from "../utils/http"
const api={
    signup(params){
     return  httpPost2('/signup',params)
    },
    signin(params){
      return httpPost2('/signin',params)
    },
   searchPlaces(params){
        return httpGet('/places',params).then(res=>{
            if (res.ok) {
               // console.log(res)
                //console.log(localStorage.getItem('bearer'))
                console.log("search success!")
                return res.json();
            }
            throw new Error(res.statusText);
        })
   },
   
   placeDetail(id){
        return httpGet(`/place/${id}`).then(res=>{
           if (res.ok) {
               return res.json();
           }
           throw new Error(res.statusText);
       });
   },
     comment(values){
        return httpPost(`/comment`,values).then(res=>{
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
    },
 getComments(placeId){
     return httpGet(`/comments/${placeId}`).then(res=>{
         if (res.ok) {
             // console.log(res)
             return res.json();
         }
         throw new Error(res.statusText);
     });
 },
recommend(params){
    return httpPost(`/recommend`,params).then(res=>{
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.statusText);
    })
},
logout(){
  return httpGet(`/signout`).then(res=>{
      if (res.ok) {
          return res.json();
      }
      throw new Error(res.statusText);
  })}
,
addPlan(params){
    return httpPut(`/plan`,params).then(res=>{
        if (res.ok) {
            return res.json();
        }
       alert('Already in the plan')
    })
},
getPlans(){
    return httpGet(`/plans/`).then(res=>{
        if (res.ok) {
            console.log(res)
            return res.json();
        }
        throw new Error(res.statusText);
    });
},
vote(params){
    return httpPost(`/vote`,params).then(res=>{
        if (res.ok) {
            return res.text();
        }

    })
}

}
export default api