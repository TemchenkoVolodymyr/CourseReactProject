import React from 'react';
import style from "./Statistics.module.scss"
import SectionFromStatistics from "./SectionFromStatistics";
import {useSelector} from "react-redux";

const StatisticsAP = () => {

  let statisticsData = useSelector((store) => store.statistics);


  let statistic = statisticsData.map(item => <SectionFromStatistics title={item.title} description={item.description} image={ item.image &&item.image}/> )
  return (
    <div className={style.statistics}>
      <h1> Some statistics</h1>
      <div className={style.container}>
        {statistic}
      </div>
    </div>
  );
};

export default StatisticsAP;