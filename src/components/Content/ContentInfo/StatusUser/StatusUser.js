import React from 'react';
import styled from './StatusUser.module.css';

const StatusUser = (props) => {
    const {isEditMode,activeEditMode,deactiveEditMode,status,setEditStatus,userId,profileInfo} = props;
    const isAuthUserStatus = !!profileInfo && profileInfo.userId === userId;
    const isStatus = status && status.length;
    return (
        <div>
            {isAuthUserStatus ? !isEditMode ? <div className={styled.status}><p onClick={activeEditMode}>{isStatus ? status : 'Изменить статус'}</p></div> : <div>
                <input onChange={setEditStatus} onBlur={deactiveEditMode} autoFocus={true} type="text"
                       value={status}/>
            </div> : <div className={styled.status}><p>{isStatus ? status : 'Нет статуса'}</p></div>}
        </div>
    );

};

export default StatusUser;