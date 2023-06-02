import React, {useState} from 'react';
import UniversalSearch from "../../../Home/Search/UniversalSearch";
import {useSelector} from "react-redux";
import style from "./userAP.module.scss"

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
        <>
          <div className={style.container}>
            <ul>
              <li>Email</li>
              {email}
            </ul>
            <ul>
              <li>Data Register</li>
              {date}
            </ul>
            <ul>
              <li>Actions</li>
              {action}
            </ul>
          </div>
        </>
      );
    }
  }
  return (
    <>
    <div>
      <UniversalSearch callback={searchMovie} found={foundEmail} setFound={setFoundEmail}/>
    </div>
  {x()}
    </>
  )
};

export default UsersAP;