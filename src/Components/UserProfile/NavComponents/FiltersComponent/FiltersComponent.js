import React from 'react';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import styles from '../../UserProfile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterBy, toggleFilter, toggleOrder } from '../../../../redux/slices/filtersSlice';
import { filterItems } from '../../../../constants/data';


const FiltersComponent = () => {

  const filterBy = useSelector((state) => state.filters.filterBy)
  const dispatch = useDispatch();
  const { isFilterOpen, isOrderOpen } = useSelector((state) => state.filters)

  const handleSortBy = (sortOption) => {
    dispatch(setFilterBy(sortOption));
    dispatch(toggleFilter());
  };

  const handleFilterToggle = () => {
    dispatch(toggleFilter());
  };

  const handleOrderToggle = () => {
    dispatch(toggleOrder());
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filtered}>
       <span onClick={handleFilterToggle}>Filter by {filterBy}
         {isFilterOpen ? <AiFillCaretUp/> : <AiFillCaretDown/>}
        </span>
        {isFilterOpen &&
          <ul className={styles.dropDown}>
            {filterItems.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  handleSortBy(item.sortBy);
                }}>
                {item.sortBy}
              </li>
            ))}
          </ul>
        }
      </div>

      <div>
        <span onClick={handleOrderToggle}>Order
          {isOrderOpen ? <AiOutlineSortDescending/> : <AiOutlineSortAscending/>}
        </span>
      </div>

    </div>


  );
};

export default FiltersComponent;