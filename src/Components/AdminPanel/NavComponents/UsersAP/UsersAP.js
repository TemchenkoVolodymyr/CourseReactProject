import React, {useEffect, useState} from 'react';
import UniversalSearch from "../../../Search/UniversalSearch";
import {useSelector} from "react-redux";
import style from "./userAP.module.scss"
import {collection, getDocs, getFirestore} from "firebase/firestore";
import Loader from "../../../../Loader/Loader";

const UsersAP = () => {

// search
  let [searchData, setSearchData] = useState([]);

  const [users, setUsers] = useState([]);

  const [searchForUser,setSearchForUser] = useState("")


  const searchMovie = (foundItem) => foundItem && users
    .filter(item => item.email.toLowerCase().includes(foundItem.toLowerCase()))


// emails section

  let foundEm = searchData &&searchData.map(item => <li>{item.email}</li>)
  let foundDate = searchData && searchData.map(item => <li>{item.date}</li>)
  let foundAction = searchData && searchData.map(item => <li>{item.action}</li>)


  const fetchUsers = async () => {
    const db = getFirestore();

    // Получите все документы из коллекции 'users'
    const userSnapshot = await getDocs(collection(db, "users"));

    // Преобразуйте каждый документ в данные пользователя и верните их
    const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return users;
  }

  useEffect(() => {
    fetchUsers()
      .then(fetchedUsers => setUsers(fetchedUsers))
      .catch(error => console.error(error));
  }, []);

  let emailDataBase = users.map(user => <li>{user.email}</li>)
  let dateDataBase = users.map(user => <li>{user.date && user.date.toString()}</li>)

  let ifSearchActive = () => {
    if (searchData) {
      return (
        <>
          <div className={style.container}>
            <ul>
              <li>Email</li>
              {foundEm}
            </ul>
            <ul>
              <li>Data Register</li>
              {foundDate}
            </ul>
            <ul>
              <li>Actions</li>
              {foundAction}
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
                {emailDataBase}
              </ul>
              <ul>
                <li>Data Register</li>
                {dateDataBase}
              </ul>
              <ul>
                <li>Actions</li>
                2
              </ul>
            </div>
        </>
      );
    }
  }

  if(users.length < 1)
    return <Loader></Loader>

  return (
    <>
    <div>
      <UniversalSearch callback={searchMovie} setFound = {setSearchData} value={searchForUser}  setValue={setSearchForUser} />
    </div>
  {ifSearchActive()}
    </>
  )
};

export default UsersAP;