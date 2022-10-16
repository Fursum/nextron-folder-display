import { FC } from "react";

type Props = { color?: string; className?: string };
const Folder: FC<Props> = ({ color = "var(--color-text)", className }) => {
  return (
    <svg
      className={className}
      viewBox="0.0 0.0 960.0 720.0"
      fill="none"
      stroke="none"
      stroke-linecap="square"
      stroke-miterlimit="10"
    >
      <clipPath id="p.0">
        <path d="m0 0l960.0 0l0 720.0l-960.0 0l0 -720.0z" clipRule="nonzero" />
      </clipPath>
      <g clip-path="url(#p.0)">
        <path
          fill={color}
          fillOpacity="0.0"
          d="m0 0l960.0 0l0 720.0l-960.0 0z"
          fillRule="evenodd"
        />
        <path
          fill={color}
          d="m128.4252 181.58109l0 0c0 -23.300034 18.888412 -42.188446 42.188446 -42.188446l618.7727 0c11.189087 0 21.91986 4.4448395 29.831726 12.356705c7.911865 7.9118805 12.3567505 18.64267 12.3567505 29.831741l0 390.23727c0 23.300049 -18.888428 42.188477 -42.188477 42.188477l-618.7727 0c-23.300034 0 -42.188446 -18.888428 -42.188446 -42.188477z"
          fillRule="evenodd"
        />
        <path
          fill={color}
          d="m128.4252 142.56602l0 0c0 -20.199211 16.37468 -36.5739 36.5739 -36.5739l128.42702 0l0 0c9.699982 0 19.002686 3.8533096 25.861633 10.712242c6.8589478 6.85894 10.71225 16.16166 10.71225 25.861656l0 44.615982c0 20.199203 -16.374695 36.5739 -36.573883 36.5739l-128.42702 0c-20.199219 0 -36.5739 -16.374695 -36.5739 -36.5739z"
          fillRule="evenodd"
        />
        <path
          fill={color}
          d="m195.0 105.99213l122.349396 0l33.650604 33.65059l0 85.87697l-156.0 0z"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};

export default Folder;
