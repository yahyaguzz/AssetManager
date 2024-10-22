import React from "react";

const BlueHumiditySvg = ({ size = 18, color = "white", ...props }) => {
  const height = size * (18 / 18); // Adjust height based on aspect ratio
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 10.4239C0 9.64192 0.22672 8.74438 0.680162 7.73131C1.36032 6.21171 1.7193 5.73183 2.43725 4.78986C3.91093 2.95923 5.19568 1.57292 6.2726 0.639832L6.98111 0C7.21727 0.231051 7.48178 0.444328 7.76518 0.639832C8.1525 1.01307 8.74764 1.62624 9.54116 2.49713C10.3347 3.36801 11.0243 4.14114 11.5911 4.85206C12.2618 5.74961 12.8381 6.71824 13.3009 7.7402C13.7638 8.76215 14 9.6597 14 10.4328C14 11.3215 13.8205 12.1657 13.4521 12.9744C13.0837 13.7831 12.5924 14.4851 11.969 15.0716C11.3455 15.6581 10.5992 16.1291 9.7301 16.4757C8.861 16.8223 7.94467 17 6.98111 17C6.03644 17 5.139 16.8312 4.27935 16.4935C3.4197 16.1558 2.67341 15.7026 2.04993 15.116C1.42645 14.5384 0.925776 13.8364 0.557355 13.0277C0.188934 12.219 0 11.3481 0 10.4239ZM2.13495 7.82018C2.13495 8.55776 2.29555 9.14428 2.62618 9.5886C2.95682 10.024 3.45749 10.2462 4.12821 10.2462C4.80837 10.2462 5.30904 10.024 5.64912 9.5886C5.97976 9.15316 6.1498 8.56665 6.15924 7.82018C6.1498 7.07371 5.97976 6.48719 5.64912 6.04286C5.31849 5.60742 4.80837 5.38526 4.12821 5.38526C3.45749 5.38526 2.95682 5.60742 2.62618 6.04286C2.29555 6.48719 2.13495 7.07371 2.13495 7.82018ZM3.61808 7.50915C3.61808 7.43805 3.62753 7.3403 3.63698 7.21589C3.64642 7.09148 3.65587 6.99373 3.68421 6.93152C3.71255 6.86932 3.73144 6.78934 3.76923 6.71824C3.80702 6.64715 3.85425 6.58494 3.91093 6.55828C3.97706 6.52274 4.04319 6.50496 4.12821 6.50496C4.26046 6.50496 4.36437 6.54051 4.43995 6.6116C4.55331 6.71824 4.5722 6.79822 4.60054 6.94929C4.62888 7.10925 4.64777 7.23366 4.65722 7.34919C4.66667 7.46471 4.66667 7.61579 4.66667 7.81129C4.66667 8.01568 4.66667 8.16675 4.65722 8.27339C4.64777 8.38003 4.62888 8.51333 4.60054 8.67329C4.5722 8.82436 4.51552 8.93988 4.43995 9.01098C4.36437 9.08207 4.26046 9.11762 4.12821 9.11762C4.04319 9.11762 3.97706 9.09984 3.91093 9.0643C3.84504 9.02845 3.79483 8.97177 3.76923 8.90434C3.73144 8.83324 3.7031 8.75327 3.68421 8.69106C3.66532 8.61997 3.64642 8.52221 3.63698 8.40669C3.62753 8.28228 3.61808 8.18453 3.61808 8.12232V7.50915ZM4.17544 14.7073H5.4224L10.1363 5.16309H8.861L4.17544 14.7073ZM8.23752 12.0502C8.24696 12.7967 8.42645 13.3832 8.75709 13.8275C9.08772 14.2629 9.59784 14.4851 10.2686 14.4851C10.9487 14.4851 11.4494 14.2629 11.78 13.8275C12.1107 13.3921 12.2713 12.7967 12.2807 12.0502C12.2713 11.3037 12.1107 10.7172 11.78 10.2818C11.4494 9.84631 10.9487 9.62415 10.2686 9.62415C9.59784 9.62415 9.08772 9.84631 8.75709 10.2818C8.417 10.7172 8.24696 11.3037 8.23752 12.0502ZM9.72065 12.0502C9.72065 11.8458 9.72065 11.6947 9.7301 11.5881C9.73954 11.4814 9.75844 11.3481 9.78678 11.1882C9.82929 10.9482 9.8718 10.9216 9.94737 10.8505C10.0229 10.7794 10.1269 10.7439 10.2591 10.7439C10.3441 10.7439 10.4197 10.7616 10.4858 10.7972C10.552 10.8327 10.5992 10.886 10.637 10.966C10.6748 11.046 10.7031 11.1171 10.7314 11.1793C10.7598 11.2415 10.7692 11.3393 10.7787 11.4637L10.7881 11.748V12.3612L10.7787 12.6456L10.7314 12.93L10.637 13.1432L10.4858 13.3121L10.2591 13.3654C10.1269 13.3654 10.0229 13.3298 9.94737 13.2588C9.83401 13.1521 9.81512 13.0721 9.78678 12.9211C9.75844 12.7611 9.73954 12.6278 9.7301 12.5212C9.71593 12.3612 9.72065 12.2546 9.72065 12.0502Z"
        fill={"#4D7CFE"}
      />
    </svg>
  );
};

export default BlueHumiditySvg;