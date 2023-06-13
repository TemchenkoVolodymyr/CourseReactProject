import React from 'react';
import Statistic from './Statistic';

const ShowStatistics = (props) => {
    const { data,length } = props;

    const statistic = data.map((item) => <Statistic
        title={item.title}
        description={item.description}
        image={item.image && item.image}
        key={item.id}
                                         />);

    return (
        <>
            {statistic}
            <Statistic  title={length}></Statistic>
        </>
    );
};

export default ShowStatistics;