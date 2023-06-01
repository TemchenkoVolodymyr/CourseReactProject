import React from 'react';
import {useSelector} from "react-redux";
import { Route, Routes} from "react-router-dom";
import style from "./AdminPanel.module.scss"
import AdminLayout from "./AdminLayout";
import Statistics from "./NavComponents/Statistics";

const AdminPanel = () => {

  let isAuth = useSelector((store) => store.isAuth);

  return (
    <div className={style.container}>
      <div className={style.linkItems}>
        <ul className={style.items}>
          <Routes>
            <Route path='adminPanel' element = {<AdminLayout />}>
              <Route index element={<AdminPanel/>}></Route>
              <Route path='adminPanel/static' element={<Statistics />}></Route>
            </Route>
          </Routes>

        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;