import React from 'react';
import style from "./userAP.module.scss";
import {showInfoAboutUsers, showRegisteredUsers} from "./showInfoAboutUsers";

const IsActiveSearch = (props) => {
    let {data,users} = props

        if (data) {
            return (
                <>
                    <div className={style.container}>
                        <ul>
                            <li>Email</li>
                            {showInfoAboutUsers(data,"email")}
                        </ul>
                        <ul>
                            <li>Data Register</li>
                            {showInfoAboutUsers(data,"date")}
                        </ul>
                        <ul>
                            <li>Actions</li>
                            {showInfoAboutUsers(data,"action")}
                        </ul>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className={style.container}>
                        <ul>
                            <li>Email</li>
                            {showRegisteredUsers(users,"email")}
                        </ul>
                        <ul>
                            <li>Data Register</li>
                            {showRegisteredUsers(users,"date")}
                        </ul>
                        <ul>
                            <li>Actions</li>
                          2
                        </ul>
                    </div>
                </>
            );
        }
};

export default IsActiveSearch;