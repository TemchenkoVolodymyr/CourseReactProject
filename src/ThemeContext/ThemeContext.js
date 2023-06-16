import React, { createContext, useState } from 'react';


const ThemeContext = createContext({ type:'light' });

const ThemeProvider = ({children}) => {
  const [type,setType] = useState('light');

  return(
    <>
      <ThemeContext.Provider value={{ type,setType }}></ThemeContext.Provider>
    </>
  );
};

export default ThemeProvider;