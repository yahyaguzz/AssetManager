import { useMemo, useState } from "react";
import tinycolor from "tinycolor2";

const initialColors = {
  PRIMARY: "#ff0000"
};

const generateColorShades = (color) => {
  const baseColor = tinycolor(color);
  const hsl = baseColor.toHsl();

  // Rengin ışıklık değeri
  const lightness = hsl.l;

  // Beyaz veya siyah olmaması için minimum ve maksimum limitler belirleyelim
  const minLightness = 0.1; // %10
  const maxLightness = 0.9; // %90

  const shades = {
    300: tinycolor({ h: hsl.h, s: hsl.s, l: Math.min(maxLightness, lightness + 0.3) }).toHexString(), // Daha açık
    400: tinycolor({ h: hsl.h, s: hsl.s, l: Math.min(maxLightness, lightness + 0.2) }).toHexString(), // Açık
    500: tinycolor({ h: hsl.h, s: hsl.s, l: Math.min(maxLightness, lightness + 0.1) }).toHexString(), // Orta
    600: baseColor.toHexString(), // Temel renk
    700: tinycolor({ h: hsl.h, s: hsl.s, l: Math.max(minLightness, lightness - 0.1) }).toHexString(), // Koyu
    800: tinycolor({ h: hsl.h, s: hsl.s, l: Math.max(minLightness, lightness - 0.2) }).toHexString(), // Daha koyu
    900: tinycolor({ h: hsl.h, s: hsl.s, l: Math.max(minLightness, lightness - 0.3) }).toHexString(), // En koyu
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
