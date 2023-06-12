import React from 'react';
import ShowFavoriteMovies from "../ShowFavoriteMovies/ShowFavoriteMovies";
import style from "./ShowCurrentUserFavoriteMovies.module.scss";
import CustomLink from "../../../../router/CustomLink/CustomLink";

const ShowCurrentUserFavoriteMovies = (props) => {

    let {auth,data} = props


    if (auth && auth._currentUser && auth._currentUser.length > 1) {
        return <p>To see your favorite movies just log in</p>
    }
    return (
        <div>
            <h3>FAVORITE</h3>
            <ShowFavoriteMovies data = { data } />
            <div className={style.btn}>
                <CustomLink style={{width: "135px", margin: " 10px 0", textAlign: "center", padding: "5px"}}
                            to={"favoriteMovies"}>see more</CustomLink>
            </div>
        </div>)
};

export default ShowCurrentUserFavoriteMovies;