import React, {useEffect, useState} from 'react';
import UniversalSearch from "../../../Home/Search/UniversalSearch";
import {useSelector} from "react-redux";
import style from "./userAP.module.scss"
import {collection, getDocs, getFirestore} from "firebase/firestore";

const UsersAP = () => {

// search
  let [foundEmail, setFoundEmail] = useState([]);

  let usersAp = useSelector((store) => store.usersAp);

  const searchMovie = (foundItem) => foundItem && usersAp.filter(item => item.email.toLowerCase().includes(foundItem.toLowerCase()))


// emails section


  let email = usersAp.map(item => <li>{item.email}</li>);

  let date = usersAp.map(item => <li>{item.date}</li>)

  let action = usersAp.map(item => <li>{usersAp.length}</li>)


  let foundEm = foundEmail &&foundEmail.map(item => <li>{item.email}</li>)
  let foundDate = foundEmail && foundEmail.map(item => <li>{item.date}</li>)
  let foundAction = foundEmail && foundEmail.map(item => <li>{item.action}</li>)

  let x = () => {
    if (foundEmail) {
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
        // let user = users.map(user =>
        // <ul>
        //   {/*<li>{user.email}</li>*/}
        //   {foundEm}
        // </ul>

        <>

            {users.map(user => <>
            <div className={style.container}>
              <ul>
                <li>Email</li>
                {user.email}
              </ul>
              <ul>
                <li>Data Register</li>
                { user.date && user.date.toString()}
              </ul>
              <ul>
                <li>Actions</li>
                {action}
              </ul>
            </div>
              </>
            )}


        </>
      );
    }
  }



  const [users, setUsers] = useState([]);
  let [data,setData] = useState([]);

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

  console.log(users)
  return (
    <>
    <div>
      <UniversalSearch callback={searchMovie} found={foundEmail} setFound={setFoundEmail}/>
    </div>
      <div>
        {/*{user}*/}
      </div>
  {x()}
    </>
  )
};

export default UsersAP;