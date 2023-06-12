import React from 'react';
import style from "./moviesAP.module.scss";

const DrawnInfoToSearch = (props) => {
    let {movies,genres,action,ratings} = props
    return (
        <div className={style.wrapper}>
            <ul>
                <li>Title</li>
                <li>{movies}</li>
            </ul>
            <ul>
                <li>Genre</li>
                <li>{genres}</li>
            </ul>
            <ul>
                <li>Rating</li>
                <li>{ratings}</li>
            </ul>
            <ul>
                <li>Action</li>
                <li>{action}</li>
            </ul>
        </div>
    );
};

export default DrawnInfoToSearch;