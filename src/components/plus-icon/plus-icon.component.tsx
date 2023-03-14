export function PlusIcon({ color = "#C1C1C4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M5 12H19"
          stroke={color}
          stroke-width="1.44"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M12 5L12 19"
          stroke={color}
          stroke-width="1.44"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  );
}
