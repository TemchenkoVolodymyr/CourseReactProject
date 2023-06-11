import React from 'react';
import ShowStatistics from "./ShowStatistics";

const Statistic = (props) => {
    let {data,length} = props

    let statistic = data.map(item => <ShowStatistics
        title={item.title}
        description={item.description}
        image={item.image && item.image}/>)

    return (
        <>
            {statistic}
            <ShowStatistics title={length}></ShowStatistics>
        </>
    );
};

export default Statistic;