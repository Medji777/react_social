import React from 'react';
import ContentInfo from "./ContentInfo/ContentInfo";
import MyPostConteiner from "./MyPost/MyPostСontainer";
import styled from './Content.module.css';

const Content = (props) => {

    return (
        <div className={styled.content}>
            <ContentInfo profileInfo={props.profileInfo} userId={props.userId} setIsEdit={props.setIsEdit}
                         isEdit={props.isEdit} currentUserId={props.match.params.userId} isOpenPopUp={props.isOpenPopUp}
                         openPopUp={props.openPopUp} closePopUp={props.closePopUp}/>
            <MyPostConteiner/>
        </div>
    )
};

export default Content