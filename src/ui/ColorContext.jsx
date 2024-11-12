import React, { createContext, useContext } from 'react';
import useColors from './Colors';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const colorValues = useColors(); // useColors hook'unu kullanarak renk değerlerini al

  return (
    <ColorContext.Provider value={colorValues}>
      {children} {/* Çocuk bileşenleri burada render edilir */}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  return useContext(ColorContext);
};
