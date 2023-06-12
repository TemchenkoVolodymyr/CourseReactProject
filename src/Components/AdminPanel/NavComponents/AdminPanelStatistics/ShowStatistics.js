import React from 'react';
import Statistic from "./Statistic";

const ShowStatistics = (props) => {
    let {data,length} = props

    let statistic = data.map(item => <Statistic
        title={item.title}
        description={item.description}
        image={item.image && item.image}/>)

    return (
        <>
            {statistic}
            <Statistic title={length}></Statistic>
        </>
    );
};

export default ShowStatistics;