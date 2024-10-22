import React from "react";

const AlertSvg = ({ size = 30, color = "#FFB200", ...props }) => {
  const validSize = typeof size === 'number' && size > 0 ? size : 30; 
  const height = validSize * (29 / 30); // Adjust height based on the aspect ratio

  return (
    <svg
      width={validSize}
      height={height.toString()} // Cast height to string
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="mask0_275_1875" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="1" y="0" width="28" height="28">
        <path
          d="M15 26.5C16.6418 26.502 18.2679 26.1796 19.7847 25.5513C21.3015 24.923 22.6793 24.0011 23.8388 22.8387C25.0012 21.6793 25.923 20.3015 26.5513 18.7847C27.1796 17.2679 27.502 15.6418 27.5 14C27.502 12.3582 27.1796 10.7321 26.5513 9.2153C25.923 7.69846 25.0012 6.32073 23.8388 5.16124C22.6793 3.99884 21.3015 3.07701 19.7847 2.44869C18.2679 1.82038 16.6418 1.49797 15 1.49999C13.3582 1.49797 11.7322 1.82038 10.2153 2.44869C8.69848 3.07701 7.32074 3.99884 6.16126 5.16124C4.99886 6.32073 4.07702 7.69846 3.44871 9.2153C2.82039 10.7321 2.49798 12.3582 2.50001 14C2.49798 15.6418 2.82039 17.2679 3.44871 18.7847C4.07702 20.3015 4.99886 21.6793 6.16126 22.8387C7.32074 24.0011 8.69848 24.923 10.2153 25.5513C11.7322 26.1796 13.3582 26.502 15 26.5Z"
          fill="white" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
        />
        <path fillRule="evenodd" clipRule="evenodd"
          d="M15 22.125C15.4144 22.125 15.8118 21.9604 16.1049 21.6674C16.3979 21.3743 16.5625 20.9769 16.5625 20.5625C16.5625 20.1481 16.3979 19.7507 16.1049 19.4576C15.8118 19.1646 15.4144 19 15 19C14.5856 19 14.1882 19.1646 13.8951 19.4576C13.6021 19.7507 13.4375 20.1481 13.4375 20.5625C13.4375 20.9769 13.6021 21.3743 13.8951 21.6674C14.1882 21.9604 14.5856 22.125 15 22.125Z"
          fill="black" 
        />
        <path d="M15 6.5V16.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </mask>
      <g mask="url(#mask0_275_1875)">
        <path d="M0 -1H30V29H0V-1Z" fill={color} />
      </g>
    </svg>
  );
};

export default AlertSvg;
