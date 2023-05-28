import './App.css';
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./router/Layout";
import ReduxTestCounter from './Components/reduxTestCounter/ReduxTestCounter';
import {mediaJSON} from "./redux/json";
import {useEffect} from "react";

function App() {

  let parse = JSON.stringify(mediaJSON)
  useEffect()
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="discovery" element={<Header/>}/>
          <Route path="redux" element={<ReduxTestCounter/>}/>
        </Route>
      </Routes>
    </>
  );
}
export default App;
