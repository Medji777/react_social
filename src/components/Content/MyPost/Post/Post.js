import React from 'react';
import styled from '../MyPost.module.css';

const Post = ({img,post}) => {
        return (
            <div className={styled.post_item}>
                <img src={img} alt=""/>
                <p>{post}</p>
            </div>
        )
};

export default Post