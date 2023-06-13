import React, { useEffect, useState } from 'react';
import style from './AdminPanelStatistics.module.scss';
import { useSelector } from 'react-redux';
import { fetchUsers } from '../../../../hooks/fetchUsers';
import ShowStatistics from './ShowStatistics';

const AdminPanelStatistics = () => {

    const statisticsData = useSelector((store) => store.statistics);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((fetchedUsers) => setUsers(fetchedUsers))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className={style.statistics}>
            <h1> Some statistics</h1>
            <div className={style.container}>
                <ShowStatistics
                    data={statisticsData}
                    length={users.length}
                >
                </ShowStatistics>

            </div>
        </div>
    );
};

export default AdminPanelStatistics;