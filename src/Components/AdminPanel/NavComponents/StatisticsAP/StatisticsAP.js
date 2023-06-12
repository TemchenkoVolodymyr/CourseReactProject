import React, {useEffect, useState} from 'react';
import style from "./StatisticsAP.module.scss"
import SectionFromStatistics from "./SectionFromStatistics";
import {useSelector} from "react-redux";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import Loader from "../../../../Loader/Loader";

const StatisticsAP = () => {

  let statisticsData = useSelector((store) => store.statistics);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const db = getFirestore();

    // Получите все документы из коллекции 'users'
    const userSnapshot = await getDocs(collection(db, "users"));

    // Преобразуйте каждый документ в данные пользователя и верните их
    const users = userSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

    return users;
  }

  useEffect(() => {
    fetchUsers()
      .then(fetchedUsers => setUsers(fetchedUsers))
      .catch(error => console.error(error));
  }, []);

  let statistic = statisticsData.map(item => <SectionFromStatistics title={item.title} description={item.description}
                                                                    image={item.image && item.image}/>)
  // let currentUser = users.map(user => <SectionFromStatistics>{users.length}</SectionFromStatistics>)
  return (
    <div className={style.statistics}>
      <h1> Some statistics</h1>
      <div className={style.container}>
        {statistic}
        <SectionFromStatistics title={users.length}></SectionFromStatistics>
      </div>
    </div>
  );
};

export default StatisticsAP;