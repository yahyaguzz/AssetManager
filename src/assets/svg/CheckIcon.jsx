import React from "react";

const CheckIcon = ({ size, color, ...props }) => {
  const width = size || 24;
  const height = width;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.86338 18C9.58738 18 9.32338 17.886 9.13438 17.685L4.27138 12.506C3.89238 12.104 3.91338 11.471 4.31538 11.093C4.71838 10.715 5.35138 10.735 5.72838 11.137L9.85338 15.528L18.2614 6.32599C18.6354 5.91699 19.2674 5.88999 19.6754 6.26199C20.0824 6.63399 20.1104 7.26699 19.7384 7.67399L10.6014 17.674C10.4144 17.88 10.1484 17.998 9.87038 18H9.86338Z"
        fill={color || "white"}
      />
    </svg>
  );
};

export default CheckIcon;
