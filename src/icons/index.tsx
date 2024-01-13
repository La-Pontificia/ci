interface SVGProps extends React.SVGAttributes<HTMLOrSVGElement> {}

export const XmarkIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none">
      <path
        d="M17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const ArrowDownIcon = (props: SVGProps) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <polyline
        data-name="Right"
        fill="none"
        points="7 16.4 12 21.5 17 16.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="12"
        x2="12"
        y1="2.5"
        y2="19.2"
      ></line>
    </svg>
  )
}

export const MenuIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none">
      <path
        id="Vector"
        d="M3 15H21M3 9H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

export const MicrosoftIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 16 16" {...props} fill="none">
      <path fill="#F35325" d="M1 1h6.5v6.5H1V1z"></path>
      <path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z"></path>
      <path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z"></path>
      <path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z"></path>
    </svg>
  )
}

export const ArroLeftIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const FaceboolIcon = (props: SVGProps) => {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"></path>
    </svg>
  )
}

export const XIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  )
}

export const ThreadsIcon = (props: SVGProps) => {
  return (
    <svg fill="currentColor" viewBox="0 0 192 192" {...props}>
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>
    </svg>
  )
}

export const MailIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.88534 5.2371C3.20538 5.86848 2.75 6.89295 2.75 8.5V15.5C2.75 17.107 3.20538 18.1315 3.88534 18.7629C4.57535 19.4036 5.61497 19.75 7 19.75H17C18.385 19.75 19.4246 19.4036 20.1147 18.7629C20.7946 18.1315 21.25 17.107 21.25 15.5V8.5C21.25 6.89295 20.7946 5.86848 20.1147 5.2371C19.4246 4.59637 18.385 4.25 17 4.25H7C5.61497 4.25 4.57535 4.59637 3.88534 5.2371ZM2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const LinkIcon = (props: SVGProps) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path
        d="M12.7917 15.7991L14.2223 14.3676C16.5926 11.9959 16.5926 8.15054 14.2223 5.7788C11.8521 3.40707 8.0091 3.40707 5.63885 5.7788L2.77769 8.64174C0.407436 11.0135 0.407436 14.8588 2.77769 17.2306C3.87688 18.3304 5.29279 18.9202 6.73165 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M21.2223 15.3583C23.5926 12.9865 23.5926 9.14118 21.2223 6.76945C20.1231 5.66957 18.7072 5.07976 17.2683 5M18.3612 18.2212C15.9909 20.5929 12.1479 20.5929 9.77769 18.2212C7.40744 15.8495 7.40744 12.0041 9.77769 9.63239L11.2083 8.20092"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  )
}

export const Menu2Icon = (props: SVGProps) => {
  return (
    <svg
      aria-label="More"
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect
        fill="currentColor"
        height="2.5"
        rx="1.25"
        width="21"
        x="3"
        y="7"
      ></rect>
      <rect
        fill="currentColor"
        height="2.5"
        rx="1.25"
        width="14"
        x="10"
        y="15"
      ></rect>
    </svg>
  )
}

export const HomeIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none">
      <path
        d="M2.36407 12.9579C1.98463 10.3208 1.79491 9.00229 2.33537 7.87495C2.87583 6.7476 4.02619 6.06234 6.32691 4.69181L7.71175 3.86687C9.80104 2.62229 10.8457 2 12 2C13.1543 2 14.199 2.62229 16.2882 3.86687L17.6731 4.69181C19.9738 6.06234 21.1242 6.7476 21.6646 7.87495C22.2051 9.00229 22.0154 10.3208 21.6359 12.9579L21.3572 14.8952C20.8697 18.2827 20.626 19.9764 19.451 20.9882C18.2759 22 16.5526 22 13.1061 22H10.8939C7.44737 22 5.72409 22 4.54903 20.9882C3.37396 19.9764 3.13025 18.2827 2.64284 14.8952L2.36407 12.9579Z"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
      <path
        d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  )
}

export const ChairIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9643 2.25H12.0359C12.9401 2.24999 13.6694 2.24998 14.2577 2.3033C14.8641 2.35826 15.3939 2.47455 15.8751 2.75241C16.4452 3.08154 16.9186 3.55493 17.2477 4.125C17.5256 4.60625 17.6418 5.13605 17.6968 5.7424C17.7501 6.3307 17.7501 7.05998 17.7501 7.96423V11.371C18.2441 11.4754 18.6911 11.6795 19.052 12.0919C19.4975 12.6011 19.6428 13.2365 19.703 13.9366C19.7044 13.9525 19.7058 13.9684 19.7071 13.9843C19.7424 14.3935 19.7758 14.7811 19.7541 15.105C19.7292 15.4762 19.6285 15.855 19.3273 16.1833C19.0162 16.5223 18.6255 16.6485 18.2514 16.702C18.099 16.7237 17.9306 16.7357 17.7501 16.7422V21C17.7501 21.4142 17.4143 21.75 17.0001 21.75C16.5859 21.75 16.2501 21.4142 16.2501 21V16.75H7.75011V21C7.75011 21.4142 7.41432 21.75 7.00011 21.75C6.58589 21.75 6.25011 21.4142 6.25011 21V16.7422C6.06959 16.7357 5.9012 16.7237 5.74883 16.702C5.37467 16.6485 4.98401 16.5223 4.67291 16.1833C4.37169 15.855 4.27099 15.4762 4.24614 15.105C4.22445 14.7811 4.25785 14.3934 4.29309 13.9842C4.29446 13.9684 4.29583 13.9525 4.2972 13.9366C4.35737 13.2365 4.50268 12.6011 4.94824 12.0919C5.30912 11.6795 5.75609 11.4754 6.25011 11.371L6.25011 7.96421C6.2501 7.05997 6.25009 6.33069 6.30341 5.7424C6.35836 5.13605 6.47466 4.60625 6.75251 4.125C7.08164 3.55493 7.55503 3.08154 8.12511 2.75241C8.60636 2.47455 9.13616 2.35826 9.7425 2.3033C10.3308 2.24998 11.0601 2.24999 11.9643 2.25ZM8.44372 11.25C8.40708 11.25 8.37069 11.25 8.33454 11.25H7.75011V8C7.75011 7.05158 7.75082 6.39041 7.79729 5.87779C7.84281 5.37549 7.92748 5.0899 8.05155 4.875C8.24903 4.53296 8.53306 4.24892 8.87511 4.05144C9.09001 3.92737 9.37559 3.84271 9.8779 3.79718C10.3905 3.75072 11.0517 3.75 12.0001 3.75C12.9485 3.75 13.6097 3.75072 14.1223 3.79718C14.6246 3.84271 14.9102 3.92737 15.1251 4.05144C15.4671 4.24892 15.7512 4.53296 15.9487 4.875C16.0727 5.0899 16.1574 5.37549 16.2029 5.87779C16.2494 6.39041 16.2501 7.05158 16.2501 8V11.25H15.6657C15.6295 11.25 15.5931 11.25 15.5565 11.25H8.44372ZM8.50011 12.75C7.65102 12.75 7.10025 12.7521 6.69378 12.8145C6.32028 12.8719 6.17689 12.9656 6.0771 13.0797C5.95089 13.2239 5.84334 13.4641 5.79168 14.065C5.75092 14.5393 5.72974 14.8098 5.74279 15.0048C5.74859 15.0915 5.76004 15.1324 5.76595 15.1487C5.76977 15.1592 5.77186 15.1623 5.77805 15.169L5.77924 15.1703C5.77921 15.1703 5.77925 15.1703 5.77924 15.1703L5.78231 15.1723C5.78409 15.1733 5.78721 15.1749 5.79206 15.1771C5.81294 15.1863 5.86142 15.2028 5.96095 15.2171C6.17899 15.2482 6.48501 15.25 7.00011 15.25H17.0001C17.5152 15.25 17.8212 15.2482 18.0393 15.2171C18.1388 15.2028 18.1873 15.1863 18.2082 15.1771C18.213 15.1749 18.2161 15.1733 18.2179 15.1723L18.2206 15.1707C18.2206 15.1706 18.2206 15.1706 18.2206 15.1707L18.2222 15.169C18.2284 15.1623 18.2304 15.1592 18.2343 15.1487C18.2402 15.1324 18.2516 15.0915 18.2574 15.0048C18.2705 14.8098 18.2493 14.5393 18.2085 14.065C18.1569 13.4641 18.0493 13.2239 17.9231 13.0797C17.8233 12.9656 17.6799 12.8719 17.3064 12.8145C16.9 12.7521 16.3492 12.75 15.5001 12.75H8.50011Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}
export const BuildingIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none">
      <path
        d="M22 22L2 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M21 22V6C21 4.11438 21 3.17157 20.4143 2.58579C19.8285 2 18.8857 2 17 2H15C13.1144 2 12.1716 2 11.5858 2.58579C11.1143 3.05733 11.0223 3.76022 11.0044 5"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
      <path
        d="M15 22V9C15 7.11438 15 6.17157 14.4142 5.58579C13.8284 5 12.8856 5 11 5H7C5.11438 5 4.17157 5 3.58579 5.58579C3 6.17157 3 7.11438 3 9V22"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
      <path
        d="M9 22V19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M6 8H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M6 11H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M6 14H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  )
}

export const PointOnMapIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M18 8L18.9487 8.31623C19.9387 8.64624 20.4337 8.81124 20.7169 9.20407C21 9.5969 21 10.1187 21 11.1623V16.829C21 18.1199 21 18.7653 20.6603 19.18C20.5449 19.3208 20.4048 19.4394 20.247 19.5301C19.7821 19.797 19.1455 19.6909 17.8721 19.4787C16.6157 19.2693 15.9875 19.1646 15.3648 19.2167C15.1463 19.235 14.9292 19.2676 14.715 19.3144C14.1046 19.4477 13.5299 19.735 12.3806 20.3097C10.8809 21.0596 10.131 21.4345 9.33284 21.5501C9.09242 21.5849 8.8498 21.6021 8.60688 21.6016C7.80035 21.6001 7.01186 21.3373 5.43488 20.8116L5.05132 20.6838C4.06129 20.3538 3.56627 20.1888 3.28314 19.7959C3 19.4031 3 18.8813 3 17.8377V12.908C3 11.2491 3 10.4197 3.48841 9.97358C3.57388 9.89552 3.66809 9.82762 3.76917 9.77122C4.34681 9.44894 5.13369 9.71123 6.70746 10.2358"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
      <path
        d="M6 7.70031C6 4.55211 8.68629 2 12 2C15.3137 2 18 4.55211 18 7.70031C18 10.8238 16.085 14.4687 13.0972 15.7721C12.4007 16.076 11.5993 16.076 10.9028 15.7721C7.91499 14.4687 6 10.8238 6 7.70031Z"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
      <circle
        cx="12"
        cy="8"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      ></circle>
    </svg>
  )
}

export const CheckIcon = (props: SVGProps) => {
  return (
    <svg {...props} fill="currentColor" role="img" viewBox="0 0 24 24">
      <polyline
        fill="none"
        points="21.648 5.352 9.002 17.998 2.358 11.358"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      ></polyline>
    </svg>
  )
}
export const ArrowIcon = (props: SVGProps) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path
        d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const ReloadIcon = (props: SVGProps) => {
  return (
    <svg fill="currentColor" viewBox="0 0 1920 1920" {...props}>
      <path
        d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

export const PlusIcon = (props: SVGProps) => {
  return (
    <svg fill="currentColor" viewBox="0 0 1920 1920" {...props}>
      <path
        d="M915.744 213v702.744H213v87.842h702.744v702.744h87.842v-702.744h702.744v-87.842h-702.744V213z"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

export const SearchWorldIcon = (props: SVGProps) => {
  return (
    <svg viewBox="-0.5 0 25 25" fill="none" {...props}>
      <path
        d="M22 11.8201C22 9.84228 21.4135 7.90885 20.3147 6.26436C19.2159 4.61987 17.6542 3.33813 15.8269 2.58126C13.9996 1.82438 11.9889 1.62637 10.0491 2.01223C8.10927 2.39808 6.32748 3.35052 4.92896 4.74904C3.53043 6.14757 2.578 7.92935 2.19214 9.86916C1.80629 11.809 2.00436 13.8197 2.76123 15.6469C3.51811 17.4742 4.79985 19.036 6.44434 20.1348C8.08883 21.2336 10.0222 21.8201 12 21.8201"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M2 11.8201H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 21.8201C10.07 21.8201 8.5 17.3401 8.5 11.8201C8.5 6.30007 10.07 1.82007 12 1.82007C13.93 1.82007 15.5 6.30007 15.5 11.8201"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M18.3691 21.6901C20.3021 21.6901 21.8691 20.1231 21.8691 18.1901C21.8691 16.2571 20.3021 14.6901 18.3691 14.6901C16.4361 14.6901 14.8691 16.2571 14.8691 18.1901C14.8691 20.1231 16.4361 21.6901 18.3691 21.6901Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M22.9998 22.8202L20.8398 20.6702"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

export const FacebookIcon = (props: SVGProps) => {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"></path>{' '}
    </svg>
  )
}

export const MoreHorizonralIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 8a2 2 0 100 4 2 2 0 000-4zm5 2a2 2 0 114 0 2 2 0 01-4 0zm7 0a2 2 0 114 0 2 2 0 01-4 0z"
      ></path>
    </svg>
  )
}

export const CalendarIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1C6.44772 1 6 1.44772 6 2V3H5C3.34315 3 2 4.34315 2 6V20C2 21.6569 3.34315 23 5 23H19C20.6569 23 22 21.6569 22 20V6C22 4.34315 20.6569 3 19 3H18V2C18 1.44772 17.5523 1 17 1C16.4477 1 16 1.44772 16 2V3H8V2C8 1.44772 7.55229 1 7 1ZM16 6V5H8V6C8 6.55228 7.55229 7 7 7C6.44772 7 6 6.55228 6 6V5H5C4.44772 5 4 5.44772 4 6V9H20V6C20 5.44772 19.5523 5 19 5H18V6C18 6.55228 17.5523 7 17 7C16.4477 7 16 6.55228 16 6ZM4 15V11H8V15H4ZM4 17V20C4 20.5523 4.44772 21 5 21H8V17H4ZM10 17V21H14V17H10ZM16 17V21H19C19.5523 21 20 20.5523 20 20V17H16ZM20 15H16V11H20V15ZM14 15H10V11H14V15Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const ClockIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const DisplayIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"></path>{' '}
    </svg>
  )
}

export const TableIcon = (props: SVGProps) => {
  return (
    <svg fill="currentColor" viewBox="0 0 1920 1920" {...props}>
      <path
        d="M225.882 0h1468.236C1818.692 0 1920 101.308 1920 225.882v1468.236c0 124.574-101.308 225.882-225.882 225.882H225.882C101.308 1920 0 1818.692 0 1694.118V225.882C0 101.308 101.308 0 225.882 0Zm854.462 1694.118h614v-614h-614v614ZM225.882 839.882h614v-614h-614v614Zm0 854.236h614v-614h-614v614Zm854.236-854.236h614v-614h-614v614Z"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}
