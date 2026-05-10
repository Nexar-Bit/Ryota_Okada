"use client";

import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const CanvasLoader = () => {
  const { progress } = useProgress();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setShowLoader(false), 500);
    }
  }, [progress]);

  if (!showLoader) return null;

  return (
    <Html
      as="div"
      center
      className="canvas-html-loader w-full h-full flex justify-center items-center bg-black bg-opacity-80"
    >
      <div className="text-center flex flex-col items-center">
        <div className="loader mb-4"></div>
        <p className="text-lg font-bold text-white mb-2">Loading...</p>
        <p className="text-lg font-bold text-white">{progress.toFixed(0)}%</p>
      </div>
      <style>{`
        .canvas-html-loader .loader {
          width: 50px;
          aspect-ratio: 1;
          display: grid;
          border: 4px solid #0000;
          border-radius: 50%;
          border-right-color: #514b82;
          animation: canvas-l15 1s infinite linear;
        }
        .canvas-html-loader .loader::before,
        .canvas-html-loader .loader::after {
          content: "";
          grid-area: 1/1;
          margin: 2px;
          border: inherit;
          border-radius: 50%;
          animation: canvas-l15 2s infinite;
        }
        .canvas-html-loader .loader::after {
          margin: 8px;
          animation-duration: 3s;
        }
        @keyframes canvas-l15 {
          100% {
            transform: rotate(1turn);
          }
        }
      `}</style>
    </Html>
  );
};

export default CanvasLoader;
