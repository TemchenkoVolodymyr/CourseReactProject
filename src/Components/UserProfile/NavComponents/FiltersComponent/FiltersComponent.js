import React, { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import styles from '../../UserProfile.module.scss';

const FiltersComponent = () => {

  const listItems = [
    {
      'id': 1,
      'sortBy': 'Release Date',
    },
    {
      'id': 1,
      'sortBy': 'Rating',
    },
    {
      'id': 1,
      'sortBy': 'Acting',
    },
  ];
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSort] = useState(false);
  const toggleFilterOpen = () => setIsFilterOpen(!isFilterOpen);
  const sortByOrder = () => setIsSort(!isSortOpen);
  return (
    <div className={styles.filters}>
     <div className={styles.filtered}>
       <span onClick={toggleFilterOpen}>Filter by
         {isFilterOpen ? <AiFillCaretUp/> : <AiFillCaretDown/>}
        </span>
       {isFilterOpen &&
         <ul className={styles.dropDown}>
           {listItems.map((item) => (
             <li key={item.id} onClick={() => {
               toggleFilterOpen();
             }}>
               {item.sortBy}
             </li>
           ))}
         </ul>
       }
     </div>

     <div>
        <span onClick={sortByOrder}>Order
          {isSortOpen ? <AiOutlineSortDescending/> : <AiOutlineSortAscending/>}
        </span>
     </div>

    </div>


  );
};

export default FiltersComponent;