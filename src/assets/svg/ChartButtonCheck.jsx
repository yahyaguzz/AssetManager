import React from "react";

const ChartButtonCheck = ({ size, color, ...props }) => {
  const width = size || 24;
  const height = width * (18 / 16);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.0636 0L5.89195 9.17162L2.91738 6.19704L0 9.1144L2.97457 12.089L5.911 15.0254L8.8284 12.108L18 2.93646L15.0636 0Z"
        fill={color || "#5404F4"}
      />
    </svg>
  );
};

export default ChartButtonCheck;
