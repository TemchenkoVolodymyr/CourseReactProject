import React, {useState} from 'react';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const listItems = ['Acting', 'Production', 'Directing', 'Writing', 'Creator', 'Crew'];

  return (
    <div>
      <span onClick={toggleOpen}>Department</span>

      {isOpen && (
        <ul>
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;