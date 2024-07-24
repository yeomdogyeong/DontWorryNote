import React from "react";

export const Muscle = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="28" height="28" fill="url(#pattern0_421_923)" />
      <defs>
        <pattern
          id="pattern0_421_923"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_421_923" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_421_923"
          width="100"
          height="100"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
