import React from "react";

const ThermometerSvg = ({ size, color, ...props }) => {
  const width = size || 24;
  const height = width * (24 / 21);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.3106 15.7231C11.7888 15.7231 12.1765 15.3845 12.1765 14.9667C12.1765 14.5489 11.7888 14.2102 11.3106 14.2102C10.8324 14.2102 10.4447 14.5489 10.4447 14.9667C10.4447 15.3845 10.8324 15.7231 11.3106 15.7231Z"
        stroke="#1B4139"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M14.7647 12.7302V5.16579C14.7185 4.3938 14.335 3.66673 13.6931 3.13455C13.0513 2.60238 12.2002 2.30569 11.3153 2.30569C10.4304 2.30569 9.57927 2.60238 8.93744 3.13455C8.29562 3.66673 7.91206 4.3938 7.86588 5.16579V12.7302C7.30729 13.374 7.00339 14.1589 7 14.9667C7.05184 15.9361 7.52912 16.8507 8.33272 17.5207C9.13631 18.1907 10.2045 18.5646 11.3153 18.5646C12.4261 18.5646 13.4943 18.1907 14.2979 17.5207C15.1015 16.8507 15.5788 15.9361 15.6306 14.9667C15.6272 14.1589 15.3233 13.374 14.7647 12.7302Z"
        stroke="#1B4139"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M11.3106 5.1658V14.2102"
        stroke="#1B4139"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M14.7647 5.92224H17.3529"
        stroke="#1B4139"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M14.7647 8.93979H17.3529"
        stroke="#1B4139"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M14.7647 11.9491H17.3529"
        stroke="#1B4139"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default ThermometerSvg;
