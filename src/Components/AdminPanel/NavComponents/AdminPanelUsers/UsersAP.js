import React, {useEffect, useState} from 'react';
import UniversalSearch from "../../../Home/Search/UniversalSearch";
import style from "./userAP.module.scss"
import Loader from "../../../../Loader/Loader";
import {fetchUsers} from "../../../../hooks/fetchUsers";
import IsActiveSearch from "./isActiveSearch";

const UsersAP = () => {

    let [searchData, setSearchData] = useState([]);

    const [users, setUsers] = useState([]);

    const [searchForUser, setSearchForUser] = useState("")


    const searchMovie = (foundItem) => foundItem && users
        .filter(item => item.email.toLowerCase()
            .includes(foundItem.toLowerCase()))

    useEffect(() => {
        fetchUsers()
            .then(fetchedUsers => setUsers(fetchedUsers))
            .catch(error => console.error(error));
    }, []);

    if (users.length < 1)
        return <Loader></Loader>

    return (
        <>
            <div>
                <UniversalSearch callback={searchMovie} setFound={setSearchData}
                                 value={searchForUser} setValue={setSearchForUser}/>
            </div>
            <IsActiveSearch
                data ={searchData}
                users={users}
            ></IsActiveSearch>
        </>
    )
};

export default UsersAP;