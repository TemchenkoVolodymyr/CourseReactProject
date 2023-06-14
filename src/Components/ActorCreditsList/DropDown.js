import React, { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import style from './DropDown.module.scss';

const DropDown = ({ setSelectedDepartment, actingCredits, productionCredits,directingCredits, writingCredits, creatorCredits, crewCredits }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const listItems = [
    {
      'id': 1,
      'role': 'Acting',
      'count': actingCredits.length

    },
    {
      'id': 2,
      'role': 'Production',
      'count': productionCredits.length
    },
    {
      'id': 3,
      'role': 'Directing',
      'count': directingCredits.length
    },
    {
      'id': 4,
      'role': 'Writing',
      'count': writingCredits.length
    },
    {
      'id': 5,
      'role': 'Creator',
      'count': creatorCredits.length
    },
    {
      'id': 6,
      'role': 'Crew',
      'count': crewCredits.length
    }
    ];


  return (
    <div className={style.dropDown}>
      <span onClick={toggleOpen}>Department {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
      {isOpen && (
        <div className={style.dropDownMenu}>
          {listItems.map((item) => (
            <p key={item.id} onClick={() => {
              setSelectedDepartment(item.role);
              toggleOpen();
            }}>
              {item.role} ({item.count})
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;