import React, {useEffect, useState} from 'react';
import style from "./StatisticsAP.module.scss"
import {useSelector} from "react-redux";
import {fetchUsers} from "../../../../hooks/fetchUsers";
import Statistic from "./Statistic";

const AdminPanelStatistics = () => {

    let statisticsData = useSelector((store) => store.statistics);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then(fetchedUsers => setUsers(fetchedUsers))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className={style.statistics}>
            <h1> Some statistics</h1>
            <div className={style.container}>
                <Statistic
                    data={statisticsData}
                    length={users.length}>
                </Statistic>

            </div>
        </div>
    );
};

export default AdminPanelStatistics;