import React from "react";
import { Droplet } from "lucide-react";

const LazyText = () => {
  return (
    <svg
      width="600"
      height="200"
      viewBox="0 0 600 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="6rem"
        fontWeight="bold"
        fill="none"
        strokeWidth="2"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      >
        <tspan
          stroke="#fff"
          fill="#FF0000"
          className="scale-part"
        >
          <Droplet className="h-8 w-8 text-red-500 fill-red-500/30 droplet-animation" />
          BloodLink
        </tspan>
      </text>
      <style>
        {`
          tspan {
            animation: stroke-anim 3s ease-out forwards;
          }
          .scale-part {
            stroke: #fff;
            fill-opacity: 0;
          }
          @keyframes stroke-anim {
            0% {
              stroke-dashoffset: 1000;
            }
            70% {
              fill-opacity: 0;
            }
            100% {
              stroke-dashoffset: 0;
              fill-opacity: 1;
              stroke: #F7765B;
            }
          }
          .droplet-animation {
            animation: droplet-bounce-spin 2s ease-in-out infinite;
            transform-origin: center;
          }
          @keyframes droplet-bounce-spin {
            0% {
              transform: translateY(0) rotate(0deg) scale(1);
            }
            50% {
              transform: translateY(-10px) rotate(180deg) scale(1.1);
            }
            100% {
              transform: translateY(0) rotate(360deg) scale(1);
            }
          }
        `}
      </style>
    </svg>
  );
};

export default LazyText;
