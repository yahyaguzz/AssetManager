import { useMemo, useState } from "react";
import tinycolor from "tinycolor2";

const initialColors = {
  PRIMARY: "#ff0000"
};

const generateColorShades = (color) => {
  const shades = {
    300: tinycolor(color).lighten(30).toString(),
    400: tinycolor(color).lighten(20).toString(),
    500: tinycolor(color).lighten(10).toString(),
    600: color,
    700: tinycolor(color).darken(10).toString(),
    800: tinycolor(color).darken(20).toString(),
    900: tinycolor(color).darken(30).toString(),
  };

  return shades;
};

const useColors = () => {
  const [colors, setColors] = useState(initialColors);

  const PRIMARY = useMemo(() => generateColorShades(colors.PRIMARY), [colors.PRIMARY]);

  return { PRIMARY, setColors };
};

export const hexToRgbValues = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
};

export default useColors;
