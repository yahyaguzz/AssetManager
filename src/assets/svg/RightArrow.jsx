import React from "react";

const RightArrowSvg = ({ size, color, ...props }) => {
  const width = size || 21;
  const height = width * (21 / 22);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 5C0 2.23858 2.23858 0 5 0H21V22H5C2.23858 22 0 19.7614 0 17V5Z"
        fill="#D9D9D9"
      />
      <g transform="translate(5.5, 5.5)">
        <path
          d="M1 1L5.5 5.5L1 10M8.5 1V10"
          stroke="#5404F4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default RightArrowSvg;
