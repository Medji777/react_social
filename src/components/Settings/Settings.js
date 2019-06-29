import React from 'react';
import styled from './Settings.module.css';
import redirectAnonUsersHoc from "../HOC/AnonUsersHOC";

class Settings extends React.Component {
    render() {
        return (
            <div className={styled.settings}>
                <h2>Settings</h2>
            </div>
        )
    }
}

export default redirectAnonUsersHoc(Settings);

