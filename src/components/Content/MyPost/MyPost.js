import React from 'react';
import Post from "./Post/Post";
import defaultImg from "../../../assets/imgs/default_user.jpg";
import styled from './MyPost.module.css';

const MyPost = ({addPost,updateNewPostText,post,newTextPost}) => {
    const sendPost = (e) => {
        e.preventDefault();
        addPost();
    };

    const changeTextPost = (e) => {
        let text = e.currentTarget.value;
        updateNewPostText(text);
    };

    return (
        <>
            <div className={styled.post}>
                <form onSubmit={sendPost} className={styled.form_post}>
                    <label htmlFor="post">My post</label>
                    <textarea onChange={changeTextPost} value={newTextPost} id="post" cols="100" rows="5" placeholder='text' />
                    <div className={`${styled.btn} ${styled.btn__post}`}>
                        <button>Send</button>
                    </div>
                </form>
            </div>
            <div className={styled.post_new}>
                {
                    post.map((i)=> <Post key={i.id} img={i.src === null ? i.src : defaultImg} post={i.text}/>) //изменить при полноценном initialState
                }
            </div>
        </>
    )
};

            //На случай использования state и компонентов жизненного цикла(оптимизации)
// class MyPost extends React.Component {
//     constructor(props){
//         super(props);
//         this.sendPost = this.sendPost.bind(this);
//         this.changeTextPost = this.changeTextPost.bind(this);
//     }
//
//     sendPost(e){
//         e.preventDefault();
//         this.props.addPost();
//     }
//
//     changeTextPost(e){
//         let text = e.currentTarget.value;
//         this.props.updateNewPostText(text);
//     }
//
//     render(){
//         const {post,newTextPost} = this.props;
//         return (
//             <>
//                 <div className="post">
//                     <form onSubmit={this.sendPost} className='form_post'>
//                         <label htmlFor="post">My post</label>
//                         <textarea onChange={this.changeTextPost} value={newTextPost} id="post" cols="100" rows="5" placeholder='text' />
//                         <div className='btn btn__post'>
//                             <button>Send</button>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="post_new">
//                     {
//                         post.map((i)=> <Post key={i.id} img={i.src} post={i.text}/>)
//                     }
//                 </div>
//             </>
//         )
//     }
// }

export default MyPost