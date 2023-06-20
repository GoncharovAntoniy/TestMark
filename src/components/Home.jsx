import React from "react";
import MenuTop from "./MenuTop";
import s from "./Home.module.scss";
import { Route, Routes } from "react-router-dom";
import Kanban from "./Kanban";


const Home = () => {
  return (
    <div className={s.home}>
      
      <MenuTop />
      <Routes>
        <Route path="/kanban" element={<Kanban />} />
      </Routes>
    </div>
  );
};

export default Home;
