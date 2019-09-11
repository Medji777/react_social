import React from 'react';
import Post from "./Post/Post";
import defaultImg from "../../../assets/imgs/default_user.jpg";
import {Field, reduxForm} from "redux-form";
import Form from "../../common/Form/Form";
import Button from "../../common/Button/Button";
import styled from './MyPost.module.css';

const validOnInput = (value) => {
    if (!value) return 'Input is REQUIRED';
    return undefined;
};

const MyPost = React.memo(({post,handleSubmit,isAuth}) => {
    return (
        <>
            {isAuth ? <div className={styled.post}>
                <form onSubmit={handleSubmit} className={styled.form_post}>
                    <label htmlFor="post">My post</label>
                    <Field component={Form} typeForm={'textarea'} id="post" cols="100" rows="5" placeholder='text' name={'post'} validate={[validOnInput]}/>
                    <div className={styled.btn__post}>
                        <Button type={'submit'}>Send</Button>
                    </div>
                </form>
            </div> : <div className={styled.form_post}><h2>Post</h2></div>}
            <div className={styled.post_new}>
                {
                    post.map((i)=> <Post key={i.id} img={i.src === null ? i.src : defaultImg} post={i.text}/>) //изменить при полноценном initialState
                }
            </div>
        </>
    )
},(prevProps,nextProps) => {
    if(prevProps.post === nextProps.post) {
        return true
    }
});

export default reduxForm({form: 'post'})(MyPost)