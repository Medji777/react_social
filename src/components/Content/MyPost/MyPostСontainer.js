import React from 'react';
import MyPost from "./MyPost";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../DataBLL/profileReducer";
//import StoreContext from '../../../StoreContext'
import {connect} from "react-redux";


// class MyPostConteiner extends React.Component {
//     // constructor(props){
//     //     super(props);
//     //     this.addPost = this.addPost.bind(this);
//     //     this.updateNewPostText = this.updateNewPostText.bind(this);
//     // }
//     //
//     // addPost(){
//     //     this.props.store.dispatch(addPostActionCreator());
//     // }
//     //
//     // updateNewPostText(text){
//     //     this.props.store.dispatch(updateNewPostTextActionCreator(text));
//     // }
//
//     render(){
//         //const {post,newTextPost} = this.props.store.getState().dataProfile;
//         return (
//             <StoreContext.Consumer>
//                 {
//                     (store) => {
//                         const addPost = () => {store.dispatch(addPostActionCreator())};
//                         const updateNewPostText = (text) => {store.dispatch(updateNewPostTextActionCreator(text))};
//                         const {post,newTextPost} = store.getState().dataProfile;
//                         return (
//                             <MyPost addPost={addPost}
//                                     updateNewPostText={updateNewPostText}
//                                     post={post}
//                                     newTextPost={newTextPost}/>
//                         )
//                     }
//
//                 }
//             </StoreContext.Consumer>
//         )
//     }
// }
const mapStateToProps = (state) => {
    const {post,newTextPost} = state.dataProfile;
    return {
        post,
        newTextPost
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addPost() {
            dispatch(addPostActionCreator())
        },
        updateNewPostText(text) {
            dispatch(updateNewPostTextActionCreator(text))
        }
    }
};

const MyPostConteiner = connect(mapStateToProps,mapDispatchToProps)(MyPost);

export default MyPostConteiner