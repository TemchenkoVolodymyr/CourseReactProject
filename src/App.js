import './App.css';
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./router/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}/>
        <Route path="discovery" element={<Header/>}></Route>
      </Routes>
    </>


  );
}

export default App;
