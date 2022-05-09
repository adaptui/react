import * as React from "react";

export const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
      />
    </svg>
  );
};

export const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <ChevronLeft style={{ transform: "rotate(180deg)" }} {...props} />
);
