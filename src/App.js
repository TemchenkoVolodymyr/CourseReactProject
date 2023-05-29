import './App.css';
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./router/Layout";
import ReduxTestCounter from './Components/reduxTestCounter/ReduxTestCounter';
import {useDispatch,} from "react-redux";
import {useEffect} from "react";
import {jsonAC} from "./redux/json/jsonActions";

import data from "./redux/json/Data.json"
import Home from "./Components/Home/Home";
import NotfoundPage from "./pages/NotfoundPage";


function App() {


  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(jsonAC(data))
  }, [data])


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="discovery" element={<Header/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="redux" element={<ReduxTestCounter/>}/>
          <Route path="*" element={<NotfoundPage/>}/>
        </Route>
      </Routes>
    </>
  );
}


export default App;
